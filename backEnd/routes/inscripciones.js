const express = require("express");
const router = express.Router();

const {
  mostrarInscripciones,
  mostrarInscripcion,
  crearInscripcion,
  editarInscripcion,
  eliminarInscripcion
} = require("../controllers/inscripciones");

// Rutas
router.get("/inscripciones", mostrarInscripciones);
router.get("/inscripciones/:id", mostrarInscripcion);
router.post("/inscripciones", crearInscripcion);
router.put("/inscripciones/:id", editarInscripcion);
router.delete("/inscripciones/:id", eliminarInscripcion);

module.exports = router;
