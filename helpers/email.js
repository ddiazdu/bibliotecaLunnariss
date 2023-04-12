import nodemailer from "nodemailer";

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, BACKEND_URL } = process.env;

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  })

  const { email, nombre, token } = datos;

  //Enviar el email
  await transport.sendMail({
    from: "contacto@labibliotecadelunnaris.com",
    to: email,
    subject: "Confirma tu cuenta en labibliotecadelunnaris.com",
    text: "Confirma tu cuenta en labibliotecadelunnaris.com",
    html: `
    
      <p> Hola ${nombre} confirma tu cuenta en labibliotecadelunnaris.com </p>
      
      <p> Tu cuenta ya está lista, solo debes confirmarla haciendo click en el siguiente enlace: <a href="${BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta</a> </p>

      <p> Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `,
  });
};

export { emailRegistro };
