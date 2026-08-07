//importamos libreria, router y controladores
import express from 'express'
import Router from 'express'
import { addNewUser } from '../controllers/user.controller.js'
import { getAllUsers } from '../controllers/user.controller.js'
import { getUserById } from '../controllers/user.controller.js'
import { updateUserByID } from '../controllers/user.controller.js'
import { deleteUserById } from '../controllers/user.controller.js'

//creamos variable con router activado
const userRouter = express.Router()

//armamos rutas con sus metodos http respectivos
userRouter.post('/api/users', addNewUser)
userRouter.get('/api/users', getAllUsers)
userRouter.get('/api/users/:id', getUserById)
userRouter.put('/api/users/:id', updateUserByID)
userRouter.delete('api/users/:id', deleteUserById)

//exportamos router para importarlo despues en app.js
export default userRouter
