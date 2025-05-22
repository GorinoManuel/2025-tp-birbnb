import express from "express"
import { CambiarEstadoController } from "./controllers/cambiarEstadoController.js"
import { ReservaController } from "./controllers/reservaController.js"
import { UsuariosController } from "./controllers/usuariosController.js"
import { MongoDBClient } from "./config/database.js"
const puerto = 3000 //meter en .env
const app = express()
app.use(express.json())

MongoDBClient.connect()

app.put("/reservas/:id/estado", CambiarEstadoController.cambiarEstado)

app.get("/healthCheck", (req, res) => {
  res.status(200).json({ status: 'La página funciona Correctamente :D' });
})

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}!`)
})

app.patch("/reservas/:id", (req, res) => {
  ReservaController.cancelarReserva(req, res)
})

app.get("/usuarios/:id/reservas", (req, res) => {
  UsuariosController.obtenerReservas(req, res)
})