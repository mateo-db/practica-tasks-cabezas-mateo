import { Sequelize } from "sequelize"
import { body } from "express-validator"
import { param } from "express-validator"
import { User } from '../../models/user.model'

const updateUserValidations = [
    //parte donde validamos el id que viene desde el params del request
    //recibimos mediante el metodo params() el id que viene en los parametros de la ruta y chequeamos si es entero mayor que cero, luego con una validación de custom le pasamos entre parametros el valor id y dentro de la función declaramos una constante que guarde el valor de la busqueda siguiente: utilizamos herramienta de express findOne sobre el modelo User (que necesitamos importar desde nuestro archivo model) buscando un usuario que, en el campo id de la base de datos, sea el mismo que el valor que nos llega desde el params de la ruta, verificando así si existe el id en la base de datos o no, en casos de get put o delete, hay que validar que exista el recurso antes de modificar o leerlo, si la validación falla throw new error, si la validación pasó avisamos a express validator con un return true
    param("id").isInt({ gt: 0 }).custom(async (id) => {
        const idExists = await User.findOne({
            id: id
        })
        if (!idAlreadyExists) {
            throw new Error("El usuario a editar no existe en la base de datos")
        }
        return true
    }),
    //validamos que al menos un campo se edite en la petición PUT
    body().custom((body) => {
        if (!body.email && !body.name && !body.password) {
            throw new Error("Al menos un campo debe editarse")
            
        }
        return true
    }),
    body("email").optional().notEmpty().isEmail().isLength({ max: 100 }).withMessage("El email debe ser válido, no vacío ni contener más de 100 caracteres"),
    body("name").optional().notEmpty().isLength({ max: 100 }).withMessage("El nombre no puede estar vacío ni contener más de 100 caracteres")
    //validacion custom para el nombre del usuario, buscamos si existe un user con ese name, y si existe, tiramos error para indicar que la petición falló la validación, en caso contrario indicar exito con un return true dentro de la funcion flecha pero fuera del condicional
    .custom(async (name) => {
        const nameAlreadyExists = await User.findOne({
            name: name
        })
        if (nameAlreadyExists) {
            throw new Error("Ya existe un usuario con ese nombre")
        }
        return true
    }),
    body("password").optional().notEmpty().isLength({ max: 100 }).withMessage("El nombre no puede estar vacío ni contener más de 100 caracteres"),
]

//validamos en caso de peticion DELETE si el usuario existe
const deleteUserValidations = [
    param("id").isInt({ gt: 0 }).custom(async (id) => {
        const doesUserToDeleteExist = await User.findOne({
            id: id
        })
        if (!doesUserExist) {
            throw new Error("El usuario a eliminar no existe en la base de datos")
        }
        return true
    })

]

const getUserByIdValidations = [
    param("id").isInt( { gt: 0 }).custom(async (id) => {
        const doesUserToGetExist = await User.findOne({
            id: id
        })
        if (!doesUserToGetExist) {
            throw new Error("El usuario a consultar no existe en la base de datos")
        }
        return true
    })
]

const createUserValidations = [
    body("email").notEmpty().isEmail().isLength({ max: 100 }).withMessage("El email debe ser válido, no vacío ni contener más de 100 caracteres"),
    body("name").notEmpty().isLength({ max: 100 }).withMessage("El nombre no puede estar vacío ni contener más de 100 caracteres"),
    body("password").optional().notEmpty().isLength({ max: 100 }).withMessage("El nombre no puede estar vacío ni contener más de 100 caracteres"),
]