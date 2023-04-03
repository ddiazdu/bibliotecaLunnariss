import { DataTypes } from "sequelize";
import db from '../config/database.js'

//Definiendo mi tabla usuarios
const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allownull: false,
    },
    email: {
        type: DataTypes.STRING,
        allownull: false,
    },
    password: {
        type: DataTypes.STRING,
        allownull: false,
    },
    token: {
        type: DataTypes.STRING
    },
    usuarioConfirmado: {
        type: DataTypes.BOOLEAN
    }
})

export default Usuario