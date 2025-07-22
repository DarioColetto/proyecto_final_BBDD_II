const inquirer = require("inquirer").default;
const {crearEvento} = require("../controllers/eventoController");

async function menuCrearEvento() {
  const evento = await inquirer.prompt([
    { 
      name: "nombre", 
      message: "Nombre del evento (deja vacío para cancelar):", 
      validate: (input) => {
        if (input.trim() === "") return true; 
        return true;
      }
    }, 
    { name: "descripcion", message: "Descripción:" },
    { 
      name: "fecha", 
      message: "Fecha (YYYY-MM-DD):", 
      validate: (input) => {
        if (input.trim() === "") return true; 
        const date = new Date(input);
        return !isNaN(date.getTime()) ? true : "Fecha inválida. Usa el formato YYYY-MM-DD.";
      }
    },
    { name: "ubicacion", message: "Ubicación:" },
    { name: "capacidadMaxima", message: "Capacidad máxima:", type: "number" },
  ]);

  // Cancelar si el usuario deja el nombre vacío
  if (!evento.nombre || evento.nombre.trim() === "") {
    console.log("🚫 Creación de evento cancelada.");
    return;
  }else{

  }
  const tiposTicket = [];

  let agregar = true;
  while (agregar) {
    const ticket = await inquirer.prompt([
      { name: "nombre", message: "Nombre del tipo de ticket:" },
      { name: "precio", message: "Precio:", type: "number" },
      { name: "cantidad", message: "Cantidad disponible:", type: "number" },
    ]);
    tiposTicket.push(ticket);

    const { continuar } = await inquirer.prompt({
      type: "confirm",
      name: "continuar",
      message: "¿Agregar otro tipo de ticket?",
    });
    agregar = continuar;
  }

  evento.fecha = new Date(evento.fecha);
  evento.tiposTicket = tiposTicket;

  await crearEvento(evento);

}

exports.menuCrearEvento = menuCrearEvento;