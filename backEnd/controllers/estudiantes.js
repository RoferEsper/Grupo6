const { connection } = require('../configDB/dataBase');

const mostrarEstudiantes = (req, res) => {
  connection.query('SELECT * FROM estudiantes', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener los estudiantes' });
    }
    res.json(results);
  });
};


const mostrarEstudiante = (req, res) => {
  const { id } = req.params;

  // se puede utilizar const query = `SELECT * FROM estudiantes WHERE id = ${id}` 
  // y ya no será necesario utilizar el [id] abajo, pero queda vulnerable a las inyecciones sql

  connection.query('SELECT * FROM estudiantes WHERE id_estudiante = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener el estudiante' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(results[0]);
  });
};

const crearEstudiante = (req, res) => {
  const { Nombre, mail } = req.body;

    if (!Nombre || !mail) {
        return res.status(400).json({
        error: 'Faltan datos requeridos: Nombre y mail'
        });
    }
    connection.query(
        'INSERT INTO estudiantes (Nombre, mail) VALUES (?, ?)',
        [Nombre, mail],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    error: 'Error al crear el estudiante',
                    detalle: error.message // muestra el error real
                });
            }
            res.json({
                message: "Estudiante creado correctamente"
            });
        }
    );
}

const editarEstudiante = (req, res) => {
  const { id } = req.params;
  const { Nombre, mail } = req.body;

  connection.query('UPDATE estudiantes SET Nombre = ?, mail = ? WHERE id_estudiante = ?',
    [Nombre, mail, id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error al editar el estudiante' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
      }
      res.json({ id, Nombre, mail });
    }
  );
};

const eliminarEstudiante = (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM estudiantes WHERE id_estudiante = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al eliminar el estudiante' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.status(204).send();
  });
}

module.exports = {
  mostrarEstudiantes,
  mostrarEstudiante,
  crearEstudiante,
  editarEstudiante,
  eliminarEstudiante
};