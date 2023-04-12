import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from "./config/database.js";

//Crear la app
const app = express();

//Habilitando pug
app.set("view engine", "pug");
app.set("views", "./views");

//Carpeta publica
app.use(express.static("public"));

//Habilitando lectura de datos (POST) de formularios
app.use(express.urlencoded({ extended: true }));

//Habilitar cookie parser
app.use(cookieParser());

//Habilitar CSRF
app.use( csrf({ cookie: true}));

//Ejecutando la conexion a la db

try {
  await db.authenticate();
  db.sync();
  console.log("Conexion correcta");
} catch (error) {
  console.log(`Error en el bloque de conexión a la base de datos ${error}`);
}

//Routing - Definimos los diferentes endpoints
app.use("/auth", usuarioRoutes);

//Definir el puerto
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Servidor iniciado correctamente");
});
