import { Router } from "express";
import { check } from 'express-validator'

import { validateFields } from '../middlewares/validateFields'
import { existingEmail, existingUserById, existingRole } from '../helpers/dbValidators'
import { getUsers, getUser,postUser, putUser, patchUser, deleteUser } from '../controllers/users.controllers'

const router = Router()

router.get('/', getUsers)

router.get('/:id',[
  check('id', 'must be a number').isNumeric(),
  validateFields
], getUser)

router.post('/',[
  check('name', 'The name cannot be empty').notEmpty(),
  check('email', 'Must be a valid email').isEmail(),
  check('email').custom( (email) => existingEmail(email) ),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('role', 'The role cannot be empty').notEmpty(),
  check("role", 'the role entered does not exist').custom( (role) => existingRole(role) ),
  validateFields
], postUser)

router.put('/:idUser',[
  check('idUser', 'must be a number').isNumeric(),
  check("idUser").custom( (id) => existingUserById(id) ),
  check('email', 'Must be a valid email').optional().isEmail(),
  check('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 }),
  check('role', 'The role cannot be empty').optional().notEmpty(),
  check("role", 'the role entered does not exist').optional().custom( (role) => existingRole(role) ),
  validateFields
], putUser)

router.patch('/', patchUser)

router.delete('/', deleteUser)

export default router