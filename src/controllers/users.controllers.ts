import { Request, Response } from "express";
import bcrypt from 'bcryptjs'

import Users from '../entities/users'
import AppDataSource from '../database/config'

export const getUsers = async(req: Request, res: Response) => {

  const UsersRepository = AppDataSource.getRepository(Users)

  try{

    const [ allUsers, amountUsers ] = await Promise.all([
      UsersRepository.findBy( {state: true,} ),
      UsersRepository.countBy({state: true})
    ])

    res.json({
      amount: amountUsers,
      users: allUsers
    })

  }catch(err){

    res.status(400).json({
      error: err
    })

  }
}

export const getUser = async(req: Request, res: Response) => {

  const UsersRepository = AppDataSource.getRepository(Users)
  const userId = parseInt(req.params.id)

  try{

    const user = await UsersRepository.findOneBy({  id: userId, state: true })
    res.json(
      user ? user : { message: `the user with id ${userId} does not exist`}
    )

  }catch(err){

    res.status(400).json({
      error: err
    })

  }
}

export const postUser = (req: Request, res: Response) => {

  const { name, email, password, role } = req.body

  const user = new Users()
  user.name = name
  user.email = email
  user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  user.role = role

  AppDataSource.manager.save(user)

  res.json({
    message: "User created successfully",
    user
  })
}

export const putUser = async(req: Request, res: Response) => {

  const idUser = parseInt( req.params.idUser )
  const { id, password, google, state, ...rest } = req.body

  //cambiar la contraseña
  if(password){
    rest.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }

  try {

    const UsersRepository = AppDataSource.getRepository(Users)
    await UsersRepository.update(idUser, rest)
    const currUser = await UsersRepository.findOneBy({id: idUser})

    res.json({
      message: "User updated successfully",
      user: currUser
    })

  } catch (error) {
    res.status(400).json({
      message: `An error occurred while updating: ${error}`,
    })
  }

}

export const patchUser = (req: Request, res: Response) => {
  res.json({
    msg: "patch users -  controllers"
  })
}

export const deleteUser = (req: Request, res: Response) => {
  res.json({
    msg: "delete users -  controllers"
  })
}
