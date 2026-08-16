import { DataTypes } from "sequelize"
import { database } from "../config/database.js"

export const Tag = database.define("Tag", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tagTitle: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    tagComment: {
        type: DataTypes.STRING(100),
        allowNull: true,
    }
})