//importamos libreria, router y controladores
import express from 'express'
import Router from 'express'
import { assignTagToTask } from '../controllers/task_tag.controller.js'
import { getAllTagTaskAssociations } from '../controllers/task_tag.controller.js'

const taskTagRouter = express.Router()

taskTagRouter.post('/task_tags', assignTagToTask)
taskTagRouter.get('/task_tags', getAllTagTaskAssociations)

export default taskTagRouter