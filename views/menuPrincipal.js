const inquirer = require("inquirer").default;
const { menuCrearEvento } = require("./menuCrearEvento");
const { menuComprarTicket } = require("./menuComprarTicket");
const { eventosProximos } = require("../controllers/eventoController");
const { menuValidarTicket } = require("./menuValidarTicket");
const { menuReporteVentas } = require("./menuReporteVentas");

async function menuPrincipal() {
  const opciones = [
    "Crear nuevo evento",
    "Listar eventos próximos",
    "Comprar ticket",
    "Validar ticket (check-in)",
    "Reporte de ventas",
    "Salir",
  ];

  const { opcion } = await inquirer.prompt({
    type: "rawlist",
    name: "opcion",
    message: "Selecciona una opción:",
    choices: opciones,
  });

  switch (opcion) {
    case "Crear nuevo evento":
      await menuCrearEvento();
      break;
    case "Listar eventos próximos":
      await eventosProximos();
      break;
    case "Comprar ticket":
      await menuComprarTicket();
      break;
    case "Validar ticket (check-in)":
      await menuValidarTicket();
      break;
    case "Reporte de ventas":
      await menuReporteVentas();
      break;
    case "Salir":
      console.log("👋 Saliendo del sistema...");
      process.exit(0);
  }

  // Volver al menú
  await menuPrincipal();
}

exports.menuPrincipal = menuPrincipal;