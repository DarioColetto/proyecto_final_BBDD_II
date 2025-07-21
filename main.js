const inquirer = require("inquirer").default;
const conectarDB = require("./db/connection");
const { crearEvento, eventosProximos } = require("./controllers/eventoController");
const { comprarTicket, validarTicket, reporteVentas } = require("./controllers/ticketController");
const Evento = require("./models/Evento");
require("dotenv").config();

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

// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────

async function menuValidarTicket() {
  const { codigoQR } = await inquirer.prompt([
    { name: "codigoQR", message: "Código QR del ticket:" },
  ]);

  await validarTicket(codigoQR);
}

// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────

async function iniciar() {
  await conectarDB();
  console.log("🎟️ Bienvenido al sistema de gestión de eventos\n");
  await menuPrincipal();
}

iniciar();
