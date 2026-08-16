import { DataTypes } from "sequelize"
import { database } from "../config/database.js"

export const Task = database.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

//acá declaramos una relación entre una tarea en especifico, que le (puede) pertenecer a un usuario en particular
//en este contexto cada tarea es unica, esta relación entonces representará lo siguiente:
//"esta tarea en particular, le pertenece a este usuario en particular (el que sea que le corresponda el id)"
Task.belongsTo(User,
    {
        foreignKey: "user_id",
        as: "author"
    }
)


//acá declaramos la relación del otro lado, es decir, la que representará el hecho de que, a un usuario en particular le puede pertencer varias tareas o tasks, de ahí el "hasMany"
User.hasMany(Task,
    {
        foreignKey: "user_id",
        as: "tareas"
    }
)