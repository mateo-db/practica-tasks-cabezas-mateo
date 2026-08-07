//importamos herramienta de libreria para trabajar con sequelize
import Sequelize from 'sequelize'

//configuramos conexion con bd
export const database = new Sequelize("tasks_users_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
})

//testear la conexión con bd
export const rundb = async () => {
    try {
        await db.authenticate()
        await db.sync({force: false})
        res.status(200).json({
            message: "Conexión con la base de datos exitosa"
        })
    } catch(error) {
        res.status(500).json({
            message: "Error al conectar con la base de datos"
        })
    }
}