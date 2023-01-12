import { Request, Response } from "express";
import bcrypt from 'bcryptjs'

import Users from '../entities/users'
import AppDataSource from '../database/config'

export const getUsers = async(req: Request, res: Response) => {

  const UsersRepository = AppDataSource.getRepository(Users)

  try{

    // We only get active users
    const allUsers = await UsersRepository.findBy({state: true,})
    const amountUsers = await UsersRepository.countBy({state: true})

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

export const putUser = (req: Request, res: Response) => {
  res.json({
    msg: "Put users -  controllers"
  })
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
