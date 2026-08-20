//importamos libreria, router y controladores
import express from 'express'
import Router from 'express'
import { addNewTask } from '../controllers/task.controller.js'
import { getAllTasks } from '../controllers/task.controller.js'
import { getTaskById } from '../controllers/task.controller.js'
import { updateTaskByID } from '../controllers/task.controller.js'
import { deleteTaskById } from '../controllers/task.controller.js'

const taskRouter = express.Router()

taskRouter.post('/tasks', addNewTask)
taskRouter.get('/tasks', getAllTasks)
taskRouter.get('/tasks/:id', getTaskById)
taskRouter.put('/tasks/:id', updateTaskByID)
taskRouter.delete('/tasks/:id', deleteTaskById)

export default taskRouter