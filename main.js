const conectarDB = require("./db/connection");
const {menuPrincipal} = require("./views/menuPrincipal");
require("dotenv").config();





async function iniciar() {
  await conectarDB();
  console.log("🎟️ Bienvenido al sistema de gestión de eventos\n");
  await menuPrincipal();
}

iniciar();
