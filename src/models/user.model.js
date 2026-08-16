import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

export const User = database.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,

    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
})

//relacion 1:1 entre modelos profile y user
//un perfil le pertenece a un usuario
Profile.belongsTo(User,
    {
        foreignKey: "user_id",
        as: "user"
    }
)

//y un usuario tiene un perfil
User.hasOne(Profile,
    {
        foreignKey: "user_id",
        as: "profile"
    }
)

