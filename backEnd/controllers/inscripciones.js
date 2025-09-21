const { connection } = require('../configDB/dataBase');

// Mostrar todas las inscripciones
const mostrarInscripciones = (req, res) => {
  const query = `
                  SELECT i.id_inscripción, i.fecha_inscripción,
                        e.id_estudiante, e.nombre AS nombre_estudiante, e.mail,
                        c.id_curso, c.nombre AS nombre_curso
                  FROM inscripciones i
                  JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
                  JOIN cursos c ON i.id_curso = c.id_curso

  ` ;
connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener las inscripciones' });
    }
    res.json(results);
  });
};

// Mostrar una inscripción por ID
const mostrarInscripcion = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT i.id_inscripción, i.fecha_inscripción,
           e.id_estudiante, e.nombre AS nombre_estudiante, e.mail,
           c.id_curso, c.nombre AS nombre_curso
    FROM inscripciones i
    JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
    JOIN cursos c ON i.id_curso = c.id_curso
    WHERE i.id_inscripción = ?
  `;

  connection.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener la inscripción' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }
    res.json(results[0]);
  });
};


// Crear nueva inscripción
const crearInscripcion = (req, res) => {
  const { id_curso, id_estudiante, fecha_inscripción } = req.body;

  if (!id_curso || !id_estudiante || !fecha_inscripción) {
    return res.status(400).json({ error: 'Faltan datos requeridos: id_curso, id_estudiante, fecha_inscripcion' });
  }

  const query = `
    INSERT INTO inscripciones (id_curso, id_estudiante, fecha_inscripción)
    VALUES (?, ?, ?)
  `;
  connection.query(query, [id_curso, id_estudiante, fecha_inscripción], (error, results) => {
    if (error) {
      return res.status(500).json({
        error: 'Error al crear la inscripción',
        detalle: error.message
      });
    }
    res.json({
      message: 'Inscripción creada correctamente',
      id_inscripción: results.insertId
    });
  });
};

// Editar inscripción
const editarInscripcion = (req, res) => {
  const { id } = req.params;
  const { id_curso, id_estudiante, fecha_inscripción } = req.body;

  const query = `
    UPDATE inscripciones
    SET id_curso = ?, id_estudiante = ?, fecha_inscripción = ?
    WHERE id_inscripción = ?
  `;
  connection.query(query, [id_curso, id_estudiante, fecha_inscripción, id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al editar la inscripción' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }
    res.json({ id, id_curso, id_estudiante, fecha_inscripción });
  });
};

// Eliminar inscripción
const eliminarInscripcion = (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM inscripciones WHERE id_inscripcion = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al eliminar la inscripción' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }
    res.status(204).send();
  });
};

module.exports = {
  mostrarInscripciones,
  mostrarInscripcion,
  crearInscripcion,
  editarInscripcion,
  eliminarInscripcion
};