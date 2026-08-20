//importamos libreria, router y controladores
import express from 'express'
import Router from 'express'
import { createProfile } from '../controllers/profile.controller.js'
import { getAllProfiles } from '../controllers/profile.controller.js'

const profileRouter = express.Router()

profileRouter.post('/profiles', createProfile)
profileRouter.get('/profiles', getAllProfiles)

export default profileRouter