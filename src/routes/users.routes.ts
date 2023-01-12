import { Router } from "express";
import { check } from 'express-validator'
import { validateFields } from '../middlewares/validateFields'
import { existingEmail } from '../helpers/dbValidators'
import { getUsers, postUser, putUser, patchUser, deleteUser } from '../controllers/users.controllers'

const router = Router()

router.get('/', getUsers)

router.post('/',[
  check('name', 'The name cannot be empty').notEmpty(),
  check('email', 'Must be a valid email').isEmail(),
  check('email').custom( (email) => existingEmail(email) ),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  validateFields
], postUser)

router.put('/', putUser)

router.patch('/', patchUser)

router.delete('/', deleteUser)

export default router