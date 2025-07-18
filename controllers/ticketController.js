const Evento = require("../models/Evento");
const Ticket = require("../models/Ticket");
const crypto = require("crypto");

async function comprarTicket(eventoId, tipoTicket, comprador) {
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) throw new Error("Evento no encontrado");

    const tipo = evento.tiposTicket.find(t => t.nombre === tipoTicket);
    if (!tipo) throw new Error("Tipo de ticket no válido");

    if (tipo.vendidos >= tipo.cantidad) throw new Error("Tickets agotados");

    // Actualizar evento
    tipo.vendidos += 1;
    await evento.save();

    const codigoQR = crypto.randomBytes(5).toString("hex").toUpperCase();

    const ticket = new Ticket({
      eventoId,
      comprador,
      tipoTicket,
      precio: tipo.precio,
      codigoQR,
    });

    await ticket.save();
    console.log("✅ Ticket comprado con éxito. Código QR:", codigoQR);
  } catch (error) {
    console.error("❌ Error al comprar ticket:", error.message);
  }
}

async function validarTicket(codigoQR) {
  try {
    const ticket = await Ticket.findOne({ codigoQR });
    if (!ticket) throw new Error("Ticket no encontrado");

    if (ticket.usado) {
      console.log("⚠️ El ticket ya fue usado.");
    } else {
      ticket.usado = true;
      ticket.fechaUso = new Date();
      await ticket.save();
      console.log("✅ Ticket válido. Acceso concedido.");
    }
  } catch (error) {
    console.error("❌ Error al validar ticket:", error.message);
  }
}

async function reporteVentas(eventoId) {
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) throw new Error("Evento no encontrado");

    console.log(`📊 Reporte de ventas: ${evento.nombre}`);
    let total = 0;

    evento.tiposTicket.forEach((tipo) => {
      const ingresos = tipo.vendidos * tipo.precio;
      console.log(`- ${tipo.nombre}: ${tipo.vendidos} vendidos ($${ingresos})`);
      total += ingresos;
    });

    const usados = await Ticket.countDocuments({ eventoId, usado: true });
    console.log(`🎟️ Tickets usados (check-in): ${usados}`);
    console.log(`💰 Total recaudado: $${total}`);
  } catch (error) {
    console.error("❌ Error en reporte de ventas:", error.message);
  }
}

module.exports = {
  comprarTicket,
  validarTicket,
  reporteVentas,
};