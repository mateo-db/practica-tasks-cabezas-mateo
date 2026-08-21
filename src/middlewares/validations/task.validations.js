import { Sequelize } from "sequelize";
import { body } from "express-validator";
import { param } from "express-validator";
import { Task } from "../../models/task.model";

const createTaskValidations = [
    body("title").notEmpty().isLength({ max: 100 }).withMessage("El titulo de la tarea no puede estar vacío ni contener más de 100 caracteres"),
    body("description").notEmpty().isLength({ max: 100 }).withMessage("La descripción de la tarea no puede estar vacío ni contener más de 100 caracteres"),
    body("isComplete").isBoolean().withMessage("El valor de isComplete debe ser un booleano (true or false)")
]

const updateTaskValidations = [
    param("id").isInt({ gt: 0 }).custom(async (id) => {
        const doesTaskToUpdateExist = await Task.findOne({
            id: id
        })
        if (!doesTaskToUpdateExist) {
            throw new Error("La tarea a actualizar no existe en la base de datos")
        }
        return true
    }),
    body().custom((body) => {
        if (!body.title && !body.description && !body.isComplete) {
            throw new Error("Al menos un campo debe de ser editado")
        }
        return true
    }),
    body("title").optional().notEmpty().isLength({ max: 100 }).withMessage("El titulo de la tarea no puede estar vacío ni contener más de 100 caracteres"),
    body("description").notEmpty().isLength({ max: 100 }).withMessage("La descripción de la tarea no puede estar vacío ni contener más de 100 caracteres"),
    body("isComplete").isBoolean().withMessage("El valor de isComplete debe ser un booleano (true or false)")
]

const deleteTaskValidations = [
    param("id").isInt({ gt: 0 }).custom(async (id) => {
        const taskToDeleteExists = await Task.findOne({
            id: id
        })
        if (!taskToDeleteExists) {
            throw new Error("La tarea a eliminar no existe en la base de datos")
        }
        return true
    })
]

const getTaskByIdValidations = [
    param("id").isInt({ gt: 0 }).custom(async (id) => {
        const taskToUpdateExists = await Task.findOne({
            id: id
        })
        if (!taskToUpdateExists) {
            throw new Error("La tarea a actualizar no existe en la base de datos")
        }
        return true
    })
]