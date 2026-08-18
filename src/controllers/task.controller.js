//importamos herramientas de libreria express y variable a utilizar
import express from 'express'
import { Task } from '../models/task.model.js'
import { Profile } from '../models/profile.model.js'
import { User } from '../models/user.model.js'

//funcion controladora que añade nuevo task
export const addNewTask = async (req, res) => {
    //desestructuramos los campos deseados que entran desde el body del request
    try {
        const { title, description, isComplete } = req.body
        if (!title || (title.length<0 || title.length>100)) {
            return res.status(400).json({
                message: "Error: el título del task debe ser una cadena no vacía entre 0 y 100 caracteres como máximo"
            })
        }
        const alreadyExistingTitle = await Task.findOne( { where: { title: req.body.title }} )

        if (alreadyExistingTitle) {
            return res.status(400).json({
                message: "Error: título de task debe ser único"
            })
        }

        if (!description || (description.length<0 || description.length>100)) {
            return res.status(400).json({
                message: "Error: descripción de task debe ser una cadena no vacía de entre 0 y 100 caracteres como maximo"
            })
        }

        if (typeof isComplete !== "boolean") {
            return res.status(400).json({
                message: "Error: isComplete debe ser un valor booleano"
            })
        }
        
        const newTask = await Task.create( { title, description, isComplete } )

        return res.status(200).json({
            message: "Se añadió la task con éxito",
            newTask
        })

    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}

//funcion controladora que trae todas las tasks
export const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.findAll()
        return res.status(200).json({
            message: "Se encontraron todas las tasks con éxito",
            allTasks
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}

//funcion controladora que obtiene task por su id
export const getTaskById = async (req, res) => {
    try {
        const taskId = Number(req.params.id)
        const taskfoundById = await Task.findByPk(taskId)
        return res.status(200).json({
            message: "Se obtuvo task por id con éxito",
            taskfoundById
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}

//funcion controladora que actualiza task por id
export const updateTaskByID = async (req, res) => {
    try {
        const taskToUpdateId = Number(req.params.id)
        const { title, description, isComplete } = req.body
        if (!title || (title.length<0 || title.length>100)) {
            return res.status(400).json({
                message: "Error: el título del task debe ser una cadena no vacía entre 0 y 100 caracteres como máximo"
            })
        }
        const alreadyExistingTitle = await Task.findOne( { where: { title: req.body.title }} )

        if (alreadyExistingTitle) {
            return res.status(400).json({
                message: "Error: título de task debe ser único"
            })
        }

        if (!description || (description.length<0 || description.length>100)) {
            return res.status(400).json({
                message: "Error: descripción de task debe ser una cadena no vacía de entre 0 y 100 caracteres como maximo"
            })
        }

        if (typeof isComplete !== "boolean") {
            return res.status(400).json({
                message: "Error: isComplete debe ser un valor booleano"
            })
        }
        
        const newTaskUpdate = await Task.update( { title, description, isComplete }, 
            { where: { id: taskToUpdateId }}
        )

        return res.status(200).json({
            message: "Se actualizó la task con éxito"
        })

    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    } 
}

//funcion controladora que elimina task por id
export const deleteTaskById = async (req, res) => {
    try {
        const taskToDeleteId = Number(req.params.id)
        await Task.destroy(
            { where: { id: taskToDeleteId } }
        )
        return res.status(200).json({
            message: "Se eliminó la task con éxito"
        })

    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}

//funcion controladora que crea nueva tarea relacionada con un usuario
export const addNewTaskRelatedToUser = async (req, res) => {
try {
        const { title, description, isComplete, user_id } = req.body
        if (!title || (title.length<0 || title.length>100)) {
            return res.status(400).json({
                message: "Error: el título del task debe ser una cadena no vacía entre 0 y 100 caracteres como máximo"
            })
        }
        const alreadyExistingTitle = await Task.findOne( { where: { title: req.body.title }} )

        if (alreadyExistingTitle) {
            return res.status(400).json({
                message: "Error: título de task debe ser único"
            })
        }

        if (!description || (description.length<0 || description.length>100)) {
            return res.status(400).json({
                message: "Error: descripción de task debe ser una cadena no vacía de entre 0 y 100 caracteres como maximo"
            })
        }

        if (typeof isComplete !== "boolean") {
            return res.status(400).json({
                message: "Error: isComplete debe ser un valor booleano"
            })
        }

        if (!User) {
            return res.status(400).json({
                message: "Error: no se puede crear una nueva tarea sin un usuario"
            })
        }
        
        const newTaskRelatedToUser = await Task.create( 
            { 
                title, description, isComplete, user_id
            } 
        )

        return res.status(201).json({
            message: "Se añadió la task relacionada al usuario con éxito",
            newTaskRelatedToUser,
            usuarioId
        })

    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}

//funcion controladora que trae todas las tareas hechas por un user especifico
export const getAllTasksByUser = async (req, res) => {
    try {
        const allTasksByUser = await Task.findAll({
            attributes: {
                exclude: ["user_id"]
            },
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: {
                        exclude: ["password", "email"]
                    },
                    include: [
                        {
                            model: Profile,
                            as: "profile"
                        }
                    ]

                }

            ]
        })
        
        return res.status(200).json({
            message: "Se encontraron todas las tasks del usuario con éxito",
            allTasksByUser
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}

//funcion controladora que trae task por id mas creador
export const getTaskByIdAndUser = async (req, res) => {
    try {
        const taskId = Number(req.params.id)
        const taskfoundByIdAndUser = await Task.findByPk(taskId, {
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: [
                        "id", "username", "email"
                    ]
                }
            ]
        })
        return res.status(200).json({
            message: "Se obtuvo task por id con el autor con éxito",
            taskfoundByIdAndUser
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error del servidor, no se pudo completar su petición"
        })
    }
}