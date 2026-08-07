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
        await database.authenticate()
        await database.sync({force: false})
        console.log("Se conectó a la base de datos con éxito")
    } catch(error) {
        console.error("Error: no se pudo conectar con la base de datos", error)
    }
}