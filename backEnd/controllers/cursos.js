const { connection } = require('../configDB/dataBase');

const mostrarCursos = (req, res) => {
  connection.query('SELECT * FROM cursos', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener los cursos' });
    }
    res.json(results);
  });
};


const mostrarCurso = (req, res) => {
  const { id } = req.params;

  // se puede utilizar const query = `SELECT * FROM Usuarios WHERE id = ${id}` 
  // y ya no será necesario utilizar el [id] abajo, pero queda vulnerable a las inyecciones sql

  connection.query('SELECT * FROM cursos WHERE id_curso = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener el curso' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'curso no encontrado' });
    }
    res.json(results[0]);
  });
};

const crearCurso = (req, res) => {
  const { Nombre, descripción } = req.body;

    if (!Nombre || !descripción) {
        return res.status(400).json({
        error: 'Faltan datos requeridos: Nombre y descripción'
        });
    }
    connection.query(
        'INSERT INTO cursos (Nombre, descripción) VALUES (?, ?)',
        [Nombre, descripción],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    error: 'Error al crear el curso',
                    detalle: error.message // muestra el error real
                });
            }
            res.json({
                message: "Curso creado correctamente"
            });
        }
    );
}

const editarCurso = (req, res) => {
  const { id } = req.params;
  const { Nombre, descripción } = req.body;

  connection.query('UPDATE cursos SET Nombre = ?, descripción = ? WHERE id_curso = ?',
    [Nombre, descripción, id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error al editar el curso' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Curso no encontrado' });
      }
      res.json({ id, Nombre, descripción });
    }
  );
};

const eliminarCurso = (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM cursos WHERE id_curso = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al eliminar el curso' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.status(204).send();
  });
}

module.exports = {
  mostrarCursos,
  mostrarCurso,
  crearCurso,
  editarCurso,
  eliminarCurso
};