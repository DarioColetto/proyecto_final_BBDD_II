const mongoose = require("mongoose");

const tipoTicketSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  cantidad: Number,
  vendidos: { type: Number, default: 0 },
});

const eventoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  fecha: Date,
  ubicacion: String,
  capacidadMaxima: Number,
  tiposTicket: [tipoTicketSchema],
  estado: { type: String, default: "activo" },
});

module.exports = mongoose.model("Evento", eventoSchema);
