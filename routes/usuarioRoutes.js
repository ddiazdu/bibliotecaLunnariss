import express from 'express'
import { formularioRegistro, registrarUsuario, confirmarCuenta, formularioLogin } from '../controllers/usuarioController.js';

const router = express.Router();

//Definiendo mis endpoints
router.get("/registro", formularioRegistro)
router.get("/login", formularioLogin)
router.get("/confirmar/:token", confirmarCuenta)
router.post("/registro", registrarUsuario);

export default router;