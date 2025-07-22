const inquirer = require("inquirer").default;
const {comprarTicket} = require("../controllers/ticketController");
const Evento = require("../models/Evento");

async function menuComprarTicket() {
  try {
    const eventos = await Evento.find({estado: "activo" });

    if (eventos.length === 0) {
      console.log("❌ No hay eventos disponibles para comprar tickets.");
      return;
    }

    const { eventoSeleccionado } = await inquirer.prompt({
      type: "list",
      name: "eventoSeleccionado",
      message: "Selecciona un evento:",
      choices: eventos.map(ev => ({
        name: `${ev.nombre} - ${ev.fecha.toLocaleDateString()}`,
        value: ev._id.toString(),
      })),
    });

    const evento = eventos.find(ev => ev._id.toString() === eventoSeleccionado);

    const { tipoTicket } = await inquirer.prompt({
      type: "list",
      name: "tipoTicket",
      message: "Selecciona el tipo de ticket:",
      choices: evento.tiposTicket.map(t => ({
        name: `${t.nombre} - $${t.precio} (${t.vendidos}/${t.cantidad} vendidos)`,
        value: t.nombre,
      })),
    });

    const { nombre, email } = await inquirer.prompt([
      { name: "nombre", message: "Nombre del comprador:" },
      { name: "email", message: "Email del comprador:" },
    ]);

    await comprarTicket(evento._id, tipoTicket, { nombre, email });

  } catch (error) {
    console.error("❌ Error en el proceso de compra:", error.message);
  }
}

exports.menuComprarTicket = menuComprarTicket;