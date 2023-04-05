import { DataTypes } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcrypt";

//Definiendo mi tabla usuarios
const Usuario = db.define(
  "usuarios",
  {
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
      type: DataTypes.STRING,
    },
    usuarioConfirmado: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    hooks: {
      beforeCreate: async function (usuario) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
    },
  }
);

export default Usuario;
