const Evento = require("../models/Evento");

async function crearEvento(eventoData) {
  try {
    const evento = new Evento(eventoData);
    await evento.save();
    console.log("✅ Evento creado con éxito");
  } catch (error) {
    console.error("❌ Error al crear evento:", error.message);
  }
}

async function eventosProximos() {
  try {
    const hoy = new Date();
    const eventos = await Evento.find({estado: "activo" });
    console.log("📅 Eventos activos:");
    eventos.forEach((ev) => {
      console.log(`- ${ev.nombre} (${ev.fecha.toDateString()})`);
    });
  } catch (error) {
    console.error("❌ Error al listar eventos:", error.message);
  }
}

module.exports = {
  crearEvento,
  eventosProximos,
};