# Proyecto final de Base de Datos
Sistema para crear eventos, vender tickets y gestionar asistentes usando
Node.js (Javascript) con Mongoose.
Como interfaz se usa la consola.

## Requerimmientos

- Node.js.
- Moongoose.
- Inquirer (para visualizacion por consola).

# Estructura del Proyecto

```
root/
│
├── models/
│   ├── Evento.js
│   └── Ticket.js
│
├── controllers/
│   ├── eventoController.js
│   └── ticketController.js
│
├── db/
│   └── connection.js
│
├── main.js 
│
|── seeds.js
|
├── package.json
└── .env

```

**Nota:** main.js  (punto de entrada por consola)



# Inicializar el proyecto

**root** es la carpeta raiz. 
```bash
cd root
npm install
```

Luego

```bash
npm run seed
npm start
```

El arhcivo **seeds.js** contiene datos de prueba para comenzar, puede no ejecutarse y comenzar con la Base de Datos limpia.

## Ejemplos de datos para probar manualmente

### Ejemplo 1: Evento académico
>**Nombre del evento:** Seminario de Inteligencia Artificial
>
>**Descripción:** Charlas y talleres sobre IA, Machine Learning y ética tecnológica.
>
>**Fecha:** 2024-09-25
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
>**Fecha:** 2024-10-15
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



