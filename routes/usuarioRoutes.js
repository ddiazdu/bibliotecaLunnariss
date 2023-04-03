import express from 'express'
import { formularioRegistro, registrarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

//Definiendo mis endpoints
router.get("/registro", formularioRegistro)
router.post("/registro", registrarUsuario);

export default router;