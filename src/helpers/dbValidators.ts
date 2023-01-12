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
