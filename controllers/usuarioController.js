import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Registrate",
  });
};

const registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  //Validar campos
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre no debe ir vacio")
    .run(req);
  await check("email")
    .isEmail()
    .withMessage("Eso no parece un email valido")
    .run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("Su contraseña debe contener al menos 6 caracteres")
    .run(req);
  await check("repeat_password")
    .equals(password)
    .withMessage("Las contraseñas no coinciden")
    .run(req);

  let errores = validationResult(req);

  const existeUsuario = await Usuario.findOne({ where: { email: email } });

  //Validar si validationResult está vacio
  if (!errores.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      errores: errores.array(),
      usuario: {
        nombre: nombre,
        email: email,
      },
    });
  }

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      errores: [{ msg: "Este email ya se encuentra registrado" }],
      usuario: {
        nombre: nombre,
        email: email,
      },
    });
  }

  //Alamacenar un Usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
  });
};

export { formularioRegistro, registrarUsuario };
