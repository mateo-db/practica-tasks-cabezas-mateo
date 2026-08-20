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
userRouter.post('/users', addNewUser)
userRouter.get('/users', getAllUsers)
userRouter.get('/users/:id', getUserById)
userRouter.put('/users/:id', updateUserByID)
userRouter.delete('/users/:id', deleteUserById)

//exportamos router para importarlo despues en app.js
export default userRouter
