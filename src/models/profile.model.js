import { DataTypes } from "sequelize"
import { database } from "../config/database.js"

export const Profile = database.define("Profile", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    profileName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    profilePic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profileBio: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
})