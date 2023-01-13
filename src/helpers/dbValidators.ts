import User from '../entities/users'
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
