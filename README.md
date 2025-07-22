# Sistema de Gestión de Eventos, Tickets y Asistentes

Este proyecto es una aplicación de consola desarrollada en **Node.js** (Javascript) que permite crear y administrar eventos, vender tickets y gestionar asistentes. Utiliza **MongoDB** como base de datos, con **Mongoose** como ORM, y emplea **Inquirer** para la interacción por consola.

## Funcionalidades Principales

- **Creación de eventos:** Permite registrar eventos con nombre, descripción, fecha, ubicación, capacidad máxima y tipos de ticket.
- **Gestión de tickets:** Define múltiples tipos de ticket por evento, con precios y cantidades disponibles. Permite la venta y registro de tickets.
- **Gestión de asistentes:** Registra los datos de los compradores y asocia cada ticket vendido a un asistente.
- **Validación de tickets:** Permite marcar tickets como usados y registrar la fecha de uso.
- **Visualización y administración:** Consulta eventos, tickets vendidos, asistentes y estado de cada ticket desde la consola.

## Tecnologías Utilizadas

- **Node.js:** Motor principal de la aplicación.
- **MongoDB:** Base de datos NoSQL para almacenar eventos y tickets.
- **Mongoose:** ORM para modelar y consultar datos en MongoDB.
- **Inquirer:** Librería para crear menús y formularios interactivos en la consola.

## Estructura del Proyecto

```
root/ 
│ 
├── models/ 
│ ├── Evento.js # Modelo de eventos 
│ └── Ticket.js # Modelo de tickets 
│ 
├── controllers/ 
│ ├── eventoController.js # Lógica de eventos 
│ └── ticketController.js # Lógica de tickets 
│ 
├── db/ 
│ └── connection.js # Conexión a MongoDB 
│ 
├── views/ #Vistas de Menus en consola
│ 
├── main.js # Punto de entrada por consola 
│ 
├── seeds.js # Datos de prueba iniciales 
│ 
├── package.json 
└── .env # Variables de entorno
```

## Configuración Inicial

1. **Variables de entorno:**  
   Renombrar `.env.template` a `.env` y configurar la URI de MongoDB:
   MONGO_URI=mongodb://localhost:27017/eventosDB

2. **Instalación de dependencias:**  
Desde la carpeta raíz, ejecutar:
```bash
npm install
```

3. Carga de datos de prueba (opcional):

Para poblar la base de datos con ejemplos:
```
npm run seed
```

4. Ejecutar la aplicación:
Iniciar el sistema desde la consola:
```
npm start
```


## Ejemplos de Uso

### Ejemplo 1: Evento académico
>**Nombre del evento:** Seminario de Inteligencia Artificial
>
>**Descripción:** Charlas y talleres sobre IA, Machine Learning y ética tecnológica.
>
>**Fecha:** 2025-09-25
>
>**Ubicación:** Universidad Tecnológica Nacional - Aula Magna
>
>**Capacidad máxima:** 200
>
>**Tipos de ticket:**
>
>- General — Precio: $0 — Cantidad: 150
>- Certificado + Taller — Precio: $20 — Cantidad: 50


### Ejemplo 2: Evento artístico
>**Nombre del evento:** Noche de Jazz en el Teatro Colón
>
>**Descripción:** Concierto en vivo de artistas de jazz locales e >internacionales.
>
>**Fecha:** 2025-10-15
>
>**Ubicación:** Teatro Colón, Buenos Aires
>
>**Capacidad máxima:** 600
>
>**Tipos de ticket:**
>
>- Platea — Precio: $70 — Cantidad: 400
>
>- Palco VIP — Precio: $150 — Cantidad: 200



# Base de datos

La confiuracion y conexion a la BBDD se encuentra en **db/connection.js**

Se recomienda usar MongoDB Compass u otra herramienta para inspeccionar los datos almacenados.

## Estructura de datos
Colección: eventos
```
{
  _id: ObjectId,
  nombre: "Conferencia Tech 2024",
  descripcion: "Conferencia de tecnología",
  fecha: ISODate,
  ubicacion: "Centro de Convenciones",
  capacidadMaxima: 500,
  tiposTicket: [
    {
      nombre: "General",
      precio: 50.00,
      cantidad: 400,
      vendidos: 234
    },
    {
      nombre: "VIP",
      precio: 100.00,
      cantidad: 100,
      vendidos: 67
    }
  ],
  estado: "activo"
}
```
Colección: tickets
```
{
  _id: ObjectId,
  eventoId: ObjectId,
  comprador: {
    nombre: "Carlos Ruiz",
    email: "carlos@email.com"
  },
  tipoTicket: "General",
  precio: 50.00,
  fechaCompra: ISODate,
  codigoQR: "ABC123XYZ",
  usado: false,
  fechaUso: null
}
```

# AUTORES

Dario Coletto

