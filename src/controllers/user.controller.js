//importamos herramientas de libreria express y variable a utilizar
import express from 'express'
import { User } from '../models/user.model.js'

//funcion controladora que añade nuevo user
export const addNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || (name.length<0 || name.length>100)) {
            return res.status(400).json({
                message: "Error: nombre de user debe ser una cadena no vacía entre 0 y 100 caracteres como máximo"
            })
        }
        const alreadyExistingEmail = await User.findOne( { where: { email: req.body.email }} )

        if (alreadyExistingEmail) {
            return res.status(400).json({
                message: "Error: email de user debe ser único"
            })
        }

        if (!email || (email.length<0 || email.length>100)) {
            return res.status(400).json({
                message: "Error: email de user debe ser una cadena no vacía de entre 0 y 100 caracteres como maximo"
            })
        }

        if (!password || (password.length<0 || password.length>100)) {
            return res.status(400).json({
                message: "Error: contraseña de user debe ser una cadena no vacía de entre 0 y 100 caracteres como maximo"
            })
        }
        
        const newUser = await User.create( { name, email, password } )

        return res.status(200).json({
            message: "Se añadió la task con éxito",
            newUser
        })

    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}

//funcion controladora que trae todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = awaitUser.findAll()
        return res.status(200).json({
            message: "Se encontraron todos los usuarios con éxito",
            allUsers
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}

//funcion controladora que obtiene usuario por su id
export const getUserById = async (req, res) => {
    try {
        const userId = Number(req.params.id)
        const userfoundById = await User.findByPk(userId)
        return res.status(200).json({
            message: "Se obtuvo usuario por id con éxito",
            userfoundById
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}

//funcion controladora que actualiza usuario por id
export const updateUserByID = async (req, res) => {
    try {
        const userToUpdateId = Number(req.params.id)
        const { name, email, password } = req.body
        if (!name || (name.length<0 || name.length>100)) {
            return res.status(400).json({
                message: "Error: nombre de user debe ser una cadena no vacía entre 0 y 100 caracteres como máximo"
            })
        }
        const alreadyExistingEmail = await User.findOne( { where: { email: req.body.email }} )

        if (alreadyExistingEmail) {
            return res.status(400).json({
                message: "Error: email de user debe ser único"
            })
        }

        if (!email || (email.length<0 || email.length>100)) {
            return res.status(400).json({
                message: "Error: email de user debe ser una cadena no vacía de entre 0 y 100 caracteres como maximo"
            })
        }

        if (!password || (password.length<0 || password.length>100)) {
            return res.status(400).json({
                message: "Error: contraseña de user debe ser una cadena no vacía de entre 0 y 100 caracteres como maximo"
            })
        }
        
        const newUserUpdate = await User.update( { name, email, password },
            { where: { id: userToUpdateId } }
        )

        return res.status(200).json({
            message: "Se actualizó el usuario por id con éxito",
            newUserUpdate
        })

    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}

//funcion controladora que elimina usuario por id
export const deleteUserById = async (req, res) => {
    try {
        const userToDeleteId = Number(req.params.id)
        await User.destroy(
            { where: { id: userToDeleteId } }
        )
        return res.status(200).json({
            message: "Se eliminó el usuario por id con éxito"
        })

    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
} 