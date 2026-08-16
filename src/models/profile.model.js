import { DataTypes } from "sequelize"
import { database } from "../config/database.js"

export const Profile = database.define("Profile", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    profileName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})