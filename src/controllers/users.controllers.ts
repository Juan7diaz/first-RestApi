import { Request, Response } from "express";
import bcrypt from 'bcryptjs'

import Users from '../entities/users'
import AppDataSource from '../database/config'

export const getUsers = async(req: Request, res: Response) => {

AppDataSource.getRepository(Users)

  // hacemos la logica de la paginación
  const page:number  = req.query.page ? Number(req.query.page) : 1
  const limit:number = req.query.limit ? Number(req.query.limit) : 20
  const offset:number = ( page - 1 ) * limit

  try{
    // https://typeorm.io/many-to-one-one-to-many-relations
    // https://orkhan.gitbook.io/typeorm/docs/find-options
    const [ allUsers, amountUsers ] = await Promise.all([
      AppDataSource.getRepository(Users).find({ relations: { role: true}, where: { state: true }, take:limit, skip:offset,  }),
      AppDataSource.getRepository(Users).countBy({state: true}),
    ])

    const info = {
      current_page: page,
      Total_page: Math.ceil(amountUsers/limit),
      total_users: amountUsers,
      limit: limit,
      offset: offset,
    }

    res.json({
      info: info,
      users: allUsers,
    })

  }catch(err){

    res.status(400).json({
      error: err
    })

  }
}

export const getUser = async(req: Request, res: Response) => {

  const userId = parseInt(req.params.id)

  try{

    const user = await AppDataSource
      .getRepository(Users)
      .find({
        relations: { role: true },
        where: { state: true, id: userId }
      })

    res.json(
      user.length > 0 ? user : { message: `the user with id ${userId} does not exist`}
    )

  }catch(err){

    res.status(400).json({
      error: err
    })

  }
}

export const postUser = (req: Request, res: Response) => {

  try{

    const { name, email, password, role } = req.body

    const user = new Users()
    user.name = name
    user.email = email
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    user.role = role
    AppDataSource.manager.save(user)

    res.json({
      message: "User created successfully",
      user: user
    })

  }catch(err){
    res.status(400).json({
      message: err
    })
  }

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

export const deleteUser = async(req: Request, res: Response) => {

  const { idUser } = req.params

  try {

    const UsersRepository = AppDataSource.getRepository(Users)
    const userToDelete = await UsersRepository.update(idUser, {state: false})

    res.json({
      msg: `The user with id ${idUser} has been successfully deleted.`,
      userToDelete
    })

  }catch(error){
    res.status(400).json({
      message: `An error occurred during the deletion process: ${error}`,
    })
  }

}
