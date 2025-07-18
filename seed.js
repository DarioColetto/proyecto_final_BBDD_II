const conectarDB = require("./db/connection");
const Evento = require("./models/Evento");
const Ticket = require("./models/Ticket");

async function crearDatosEjemplo() {
  await conectarDB();

  // Limpiar base de datos (opcional)
  await Evento.deleteMany({});
  await Ticket.deleteMany({});

  const evento1 = new Evento({
    nombre: "Conferencia Tech 2024",
    descripcion: "Evento de tecnología y startups",
    fecha: new Date("2024-09-10"),
    ubicacion: "Centro de Convenciones",
    capacidadMaxima: 500,
    tiposTicket: [
      { nombre: "General", precio: 50.0, cantidad: 400, vendidos: 120 },
      { nombre: "VIP", precio: 100.0, cantidad: 100, vendidos: 40 },
    ],
  });

  const evento2 = new Evento({
    nombre: "Festival de Música 2024",
    descripcion: "Festival al aire libre con bandas en vivo",
    fecha: new Date("2024-10-22"),
    ubicacion: "Parque Central",
    capacidadMaxima: 1000,
    tiposTicket: [
      { nombre: "Campo", precio: 30.0, cantidad: 800, vendidos: 300 },
      { nombre: "Platea", precio: 60.0, cantidad: 200, vendidos: 50 },
    ],
  });

  await evento1.save();
  await evento2.save();

  console.log("✅ Eventos de ejemplo creados");
  console.log("🆔 ID Evento 1:", evento1._id.toString());
  console.log("🆔 ID Evento 2:", evento2._id.toString());

  process.exit(0);
}

crearDatosEjemplo();
