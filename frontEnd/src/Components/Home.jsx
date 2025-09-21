import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS, URL_CURSOS, URL_ESTUDIANTES, URL_INSCRIPCIONES } from "../endpoints/endpoints";
import { Table } from "react-bootstrap";

const Home = () => {
  // 1. Creamos un estado separado para cada tabla
  const [cursos, setCursos] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);

  // 2. Funciones para obtener los datos de cada API
  const getCursos = async () => {
    try {
      const response = await axios.get(ENDPOINTS + URL_CURSOS);
      if (response.status === 200) {
        setCursos(response.data);
      }
    } catch (error) {
      console.log("Error al obtener los cursos", error);
    }
  };

  const getEstudiantes = async () => {
    try {
      const response = await axios.get(ENDPOINTS + URL_ESTUDIANTES);
      if (response.status === 200) {
        setEstudiantes(response.data);
      }
    } catch (error) {
      console.log("Error al obtener los estudiantes", error);
    }
  };

  const getInscripciones = async () => {
    try {
      const response = await axios.get(ENDPOINTS + URL_INSCRIPCIONES);
      if (response.status === 200) {
        setInscripciones(response.data);
      }
    } catch (error) {
      console.log("Error al obtener las inscripciones", error);
    }
  };

  // 3. Usamos useEffect para llamar a las funciones al cargar el componente
  useEffect(() => {
    getCursos();
    getEstudiantes();
    getInscripciones();
  }, []);

  // 4. Renderizamos las tres tablas
  return (
    <div>
      {/* Tabla de Cursos */}
      <h2>Cursos</h2>
      
      <Table striped bordered hover variant="success">
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre del Curso</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso, idx) => (
            <tr key={curso.id_curso} className={idx % 2 === 0 ? "table-success" : "table-warning"}>
              <td>{curso.id_curso}</td>
              <td>{curso.Nombre}</td>
              <td>{curso.descripción}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      
     
      {/* Tabla de Estudiantes */}
      <h2>Estudiantes</h2>
      <Table striped bordered hover variant="info">
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante, idx) => (
            <tr key={estudiante.id_estudiante} className={idx % 2 === 0 ? "table-info" : "table-secondary"}>
              <td>{estudiante.id_estudiante}</td>
              <td>{estudiante.Nombre}</td>
              <td>{estudiante.mail}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Tabla de Inscripciones */}
      <h2>Inscripciones</h2>
      <Table striped bordered hover variant="danger">
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre del Curso</th>
            <th>Nombre del Estudiante</th>
            <th>Fecha de Inscripción</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((inscripción, idx) => (
            <tr key={inscripción.id_inscripción} className={idx % 2 === 0 ? "table-danger" : "table-light"}>
              <td>{inscripción.id_inscripción}</td>
              <td>{inscripción.nombre_curso}</td>
              <td>{inscripción.nombre_estudiante}</td>
              <td>{inscripción.fecha_inscripción}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
};

export default Home;