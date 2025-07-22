const inquirer = require("inquirer").default;
const {validarTicket} = require("../controllers/ticketController");

async function menuValidarTicket() {
  const { codigoQR } = await inquirer.prompt([
    { name: "codigoQR", message: "Código QR del ticket:" },
  ]);

  await validarTicket(codigoQR);
}

exports.menuValidarTicket = menuValidarTicket;