const express = require("express");
const router = express.Router();

const {
  mostrarEstudiantes,
  mostrarEstudiante,
  crearEstudiante,
  editarEstudiante,
  eliminarEstudiante
} = require("../controllers/estudiantes");

// Rutas
router.get("/estudiantes", mostrarEstudiantes);
router.get("/estudiantes/:id", mostrarEstudiante);
router.post("/estudiantes", crearEstudiante);
router.put("/estudiantes/:id", editarEstudiante);
router.delete("/estudiantes/:id", eliminarEstudiante);

module.exports = router;
