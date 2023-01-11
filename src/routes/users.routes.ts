import { Router } from "express";
import { getUsers, postUser, putUser, patchUser, deleteUser } from '../controllers/users.controllers'

const router = Router()

router.get('/', getUsers)
router.post('/', postUser)
router.put('/', putUser)
router.patch('/', patchUser)
router.delete('/', deleteUser)

export default router