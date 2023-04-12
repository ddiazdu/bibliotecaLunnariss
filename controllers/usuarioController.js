import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarToken } from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/email.js";

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Registrate",
    csrfToken: req.csrfToken(),
  });
};

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Inicia Sesión",
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
      csrfToken: req.csrfToken(),
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
      csrfToken: req.csrfToken(),
      usuario: {
        nombre: nombre,
        email: email,
      },
    });
  }

  //Alamacenar un Usuario
  //nombre: nombre => usar Object literal Enhancement
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarToken(),
  });

  //Enviar mensaje de confirmación
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  //Mostrar mensaje de confirmación
  res.render("templates/mensaje", {
    pagina: "Cuenta creada correctamente",
    mensaje:
      "Hemos enviado a tu correo las instrucciones para que confirmes tu cuenta",
  });
};

//Función que comprueba una cuenta
const confirmarCuenta = async (req, res) => {
  const { token } = req.params;

  //Verificar si el token es valido
  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar tu cuenta",
      mensaje:
        "Hubo un error al confirmar tu cuenta, al parecer el token no es valido",
      error: true,
    });
  }

  //Confirmar la cuenta
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Cuenta confirmada",
    mensaje: "La cuenta se confirmó correctamente",
    error: false,
  });
};

export {
  formularioRegistro,
  registrarUsuario,
  confirmarCuenta,
  formularioLogin,
};
