//importamos herramientas de libreria express y variable a utilizar
import express from 'express'
import { Profile } from '../models/profile.model.js'

//funcion controladora que crea un perfil para el usuario
export const createProfile = async (req, res) => {
    try {
        //desestructuramos los atributos del modelo que necesitamos validar desde el body del request
        const { profileName, profilePic, profileBio } = req.body
        //validamos que el nombre de perfil no esté vacío y que sea un  string
        if (!profileName || typeof profileName !== "string" || (profileName.length>100)) {
            return res.status(400).json({
                message: "Error: el nombre del perfil debe ser un string no vacío de máximo 100 caracteres"
            })
        }

        //verificamos que el perfil creado no repita el nombre de otro ya creado anteriormente
        const alreadyExistingProfileName = await Profile.findOne( { where: { profileName: req.body.profileName }} )
        //si se repite, lanzamos mensaje de error descriptivo
        if (alreadyExistingProfileName) {
            return res.status(400).json({
                message: "Error: el nombre de perfil debe ser único"
            })
        }

        const createdProfile = await Profile.create( { profileName, profilePic, profileBio } )

        return res.status(201).json({
            message: "Se creó nuevo perfil con éxito",
            createdProfile
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor, no pudimos procesar la petición"
        })
    }
}

//funcion controladora que trae todos los perfiles, excluyendo sus biografias y fotos de perfil
export const getAllProfiles = async (req, res) => {
    try {
        const allProfiles = await Profile.findAll({
            attributes: {
                exclude: [ profileBio, profilePic ]
            },
            include: [
                {
                    model: Profile,
                    as: "profile"
                }
            ]
        })
        return res.status(200).json({
            message: "Se encontraron todos los perfiles con éxito",
            allProfiles
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}