//importamos herramientas de libreria express y variable a utilizar
import express from 'express'
import { Tag } from '../models/tag.model.js'
import { Task } from '../models/task.model.js'
import { TaskTag } from '../models/task_tag.model.js'

//funcion controladora que "crea" la asignación de un tag a un task
export const assignTagToTask = async (req, res) => {
    try {
        //desestructuramos los atributos del modelo que necesitamos validar desde el body del request
        const { task_id, tag_id } = req.body
        //validamos que el id de task sea integer
        if ((!task_id) || (Number.isNaN(task_id))) {
            return res.status(400).json({
                message: "Error: el id de la tarea debe ser númerico entero no vacío"
            })
        }

        //validamos para task y tag si es que sus ids están vacíos, si son numeros, si existen previamente en la base de datos
        if ((!tag_id) || (Number.isNaN(tag_id))) {
            return res.status(400).json({
                message: "Error: el id de la eitqueta debe ser númerico entero no vacío"
            })
        }

        const doesTagExist = await Tag.findByPk(tag_id)
        if (!doesTagExist) {
            return res.status(400).json({
                message: "Error: la etiqueta no existe"
            })
        }

        if ((!task_id) || (Number.isNaN(task_id))) {
            return res.status(400).json({
                message: "Error: el id de la tarea debe ser númerico entero no vacío"
            })
        }

        const doesTaskExist = await Task.findByPk(task_id)
        if (!doesTaskExist) {
            return res.status(400).json({
                message: "Error: la tarea no existe"
            })
        }

        const newAssociatedTagAndTask = await TaskTag.create( { task_id, tag_id } )
        
            return res.status(201).json({
                message: "Se relacionaron etiqueta y tarea con éxito",
                newAssociatedTagAndTask
            })

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor, no pudimos procesar la petición"
        })
    }
}
