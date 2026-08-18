//importamos herramientas de libreria express y variable a utilizar
import express from 'express'
import { Tag } from '../models/tag.model.js'

//funcion controladora que crea un tag 
export const createTag = async (req, res) => {
    try {
        //desestructuramos los atributos del modelo que necesitamos validar desde el body del request
        const { tagTitle, tagComment } = req.body
        //validamos que el titulo del tag no esté vacío y que sea un string de 100 caracteres como maximo
        if ((!tagTitle) || (typeof tagTitle !== "string") || (tagTitle.length>100)) {
            return res.status(400).json({
                message: "Error: el titulo de la etiqueta debe ser un string no vacío de máximo 100 caracteres"
            })
        }

        //verificamos que el tag creado no repita el nombre de otro ya creado anteriormente
        const alreadyExistingTagTitle = await Tag.findOne( { where: { tagTitle: req.body.tagTitle }} )
        //si se repite, lanzamos mensaje de error descriptivo
        if (alreadyExistingProfileName) {
            return res.status(400).json({
                message: "Error: el nombre de perfil debe ser único"
            })
        }

        const createdTag = await Tag.create( { tagTitle, tagComment } )
        
            return res.status(201).json({
                message: "Se creó nuevo perfil con éxito",
                createdTag
            })

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor, no pudimos procesar la petición"
        })
    }
}

export const getAllTags = async (req, res) => {
    try {
        const allTags = await Tag.findAll({
            attributes: {
                exclude: [ tagComment ]
            },
            include: [
                {
                    model: Tag,
                    as: "tag"
                }
            ]
        })
        return res.status(200).json({
            message: "Se encontraron todas las etiquetas con éxito",
            allTags
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}