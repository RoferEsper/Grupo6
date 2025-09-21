const express = require("express")
const mysql = require("mysql2")
const  cursos = require("./routes/cursos") // importo las rutas de cursos
const  estudiantes = require("./routes/estudiantes") // importo las rutas de estudiantes
const  inscripciones = require("./routes/inscripciones")

// filepath: e:\Documentos\Facu Alfredo\TUP\Programacion 4\TP\proyecto\backEnd\index.js
const cors = require('cors');

     //Creamos una instancia de Express → es como nuestro "servidor en código".
const app = express()

     //utilizo libreria
app.use(express.json())

app.use(cors());
// ...existing code...

app.use("/", cursos) // todas las rutas definidas en usuarios.js estarán bajo la ruta raíz "/"
app.use("/", estudiantes)
app.use("/", inscripciones)

app.get("/", (req,res) => {
res.send("API de cursos") // envia la respuesta al curso
})

app.listen(8000, () => { // el servidor escucha en el puerto 8000
console.log("Servidor corriendo en el puerto 8000") // mensaje en consola
})