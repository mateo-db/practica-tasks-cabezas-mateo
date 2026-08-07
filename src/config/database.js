//importamos herramienta de libreria para trabajar con sequelize
import Sequelize from 'sequelize'
import 'dotenv/config'

//configuramos conexion con bd
export const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
})

//testear la conexión con bd
export const rundb = async () => {
    try {
        await database.authenticate()
        await database.sync({force: false})
        console.log("Se conectó a la base de datos con éxito")
    } catch(error) {
        console.error("Error: no se pudo conectar con la base de datos", error)
    }
}