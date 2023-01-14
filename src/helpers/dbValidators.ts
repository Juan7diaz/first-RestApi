import User from '../entities/users'
import Roles from '../entities/roles'

import AppDataSource from '../database/config'

export const existingEmail = async(email = '') => {

  const UserRepository = AppDataSource.getRepository(User)

  const existingEmail = await UserRepository.findOneBy({
    email: email,
    state: true,
  })

  if(existingEmail){
    throw new Error(`The email ${email} is already registered in the database`)
  }

}

export const existingUserById = async( id : number ) => {

  const UserRepository = AppDataSource.getRepository(User)

  const userExists = await UserRepository.findOneBy({
    id: id,
    state: true,
  })


  if(!userExists){
    throw new Error(`user with id ${id} is not registered in the database`)
  }

}

export const existingRole = async( idRole: number ) => {

  const UserRepository = AppDataSource.getRepository(Roles)

  const rolExists = await UserRepository.findOneBy({ id: idRole })

  if(!rolExists){
    throw new Error(`the entered role is not registered in the database`)
  }

}
