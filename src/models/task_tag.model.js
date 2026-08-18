import { DataTypes } from "sequelize"
import { database } from "../config/database.js"
import { Task } from "./task.model.js"
import { Tag } from "./tag.model.js"

export const TaskTag = database.define("TaskTag", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

//relación N:M entre modelos Tag y Task que pasa por la tabla intermedia TaskTag
//un tag (etiqueta) o varios le pueden pertenecer a varios tasks o tareas
Tag.belongsToMany(Task,
    {
        through: TaskTag,
        foreignKey: "tag_id",
        as: "tasks"
    }
)

//y a un task (tarea) o varios le pueden pertenecer varios tags
Task.belongsToMany(Tag,
    {
        through: TaskTag,
        foreignKey: "task_id",
        as: "tags"
    }
)