const inquirer = require("inquirer").default;
const { reporteVentas } = require("../controllers/ticketController");
const Evento = require("../models/Evento");

async function menuReporteVentas() {

  //Buscar eventos activos y los ordena por fecha
  const eventos = await Evento.find({ estado: "activo" }).sort({ fecha: 1 });

  if (eventos.length === 0) {
    console.log("🚫 No hay eventos disponibles.");
    return;
  }

  const choices = eventos.map((evento, index) => ({
    name: `${evento.nombre} - ${evento.fecha.toLocaleDateString()}`,
    value: evento._id.toString(),
  }));

  choices.push(new inquirer.Separator(), { name: "❌ Cancelar", value: "cancelar" });

  const { eventoId } = await inquirer.prompt({
    type: "list",
    name: "eventoId",
    message: "Selecciona un evento para ver el reporte de ventas:",
    choices,
  });

  if (eventoId === "cancelar") {
    console.log("🔙 Volviendo al menú principal...");
    return;
  }

  await reporteVentas(eventoId);
}

exports.menuReporteVentas = menuReporteVentas;