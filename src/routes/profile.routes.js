//importamos libreria, router y controladores
import express from 'express'
import Router from 'express'
import { createProfile } from '../controllers/profile.controller.js'
import { getAllProfiles } from '../controllers/profile.controller.js'

const profileRouter = express.Router()

profileRouter.post('/api/profiles', createProfile)
profileRouter.get('api/profiles', getAllProfiles)

export default profileRouter