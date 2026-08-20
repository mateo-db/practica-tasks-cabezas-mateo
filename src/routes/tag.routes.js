//importamos libreria, router y controladores
import express from 'express'
import Router from 'express'
import { createTag } from '../controllers/tag.controller.js'
import { getAllTags } from '../controllers/tag.controller.js'

const tagRouter = express.Router()

tagRouter.post('/tags', createTag)
tagRouter.get('/tags', getAllTags)

export default tagRouter