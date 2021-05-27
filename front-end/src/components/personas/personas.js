import React, { useState } from "react"
import axios from "axios";
import './personas.css';
import { Link } from "react-router-dom";
import swal from 'sweetalert';

export default function Personas(props) {
  //Defino los estados
  //State del error 
  const [error, setError] = useState("no");
  //State de la persona
  const [persona, setPersona] = useState([]);

  const [busqueda, setBusqueda] = useState(0);

  const [libro, setLibro] = useState([]);

  //Cargo la lista de personas
  const listadoPersonas = async () => {
    try {
      const respuesta = await axios.get("http://localhost:4000/persona");
      setPersona(respuesta.data);
    } catch (e) {
      setError(e.response.data.error);
      if (e.response.data.error !== "no hay usuarios registrados") {
        swal("Ups! 1", e.response.data.error, "Warning!");
      }
    }
  }

  React.useEffect(() => {
    listadoPersonas();
  }, []);

  function borrar(id) {
    const borrarPersona = async () => {
      try {
        await axios.delete("http://localhost:4000/persona/" + id);
        listadoPersonas();
      } catch (e) {
        setError(e.response.data.error)
        swal("Ups!", e.response.data.error, "Warning!");

      }
    }
    borrarPersona();
  }

  function registrar() {
    props.history.push("/personas/registro");
  }



  function libros(unaPersona) {
    const listadoLibros = async () => {
      try {
        const consulta = await axios.get("http://localhost:4000/persona/" + unaPersona + "/libro");
        setLibro(consulta.data);
        setBusqueda(1);
      } catch (e) {
        setError(e.response.data.error);
        swal("Ups!", e.response.data.error, "Warning!");
      }
    }
    listadoLibros();
  }



  if (error === "no" && busqueda === 1) {
    return (
      <div>
        {libro.map((unLibro, index) => {
          return (
            <div className="contMap" key={index}>
              <div>
                <h3 className="title">Libro: {index + 1}</h3>
                <div className="text"><p className="subtitle">Nombre:</p> {unLibro.nombre}</div>
                <div className="text"><p className="subtitle">Descripcion:</p> {unLibro.descripcion}</div>
                <div className="text"><p className="subtitle">Id:</p> {unLibro.id}</div>
              </div>
              <button className="btn btn-dark boton" onClick={() => setBusqueda(0)}>Volver</button>
            </div>
          )
        })}
     
      </div>
    )
  } else {
    if (error === "no" && busqueda === 0) {
      return (


        <div>
          <div className="contMap">
            <button className="btn btn-dark boton" onClick={() => registrar()}>Registrar</button>
          </div>
          {/* Creo el map para mostrar las personas */}
          {persona.map((unaPersona, index) => {
            return (



              // Contenedor del map
              <div className="contMap" key={index}>

                {/* Contenedor de los datos */}
                <div >
                  <h3 className="title">Persona: {index + 1}</h3>
                  <div className="text"><p className="subtitle">Nombre:</p> {unaPersona.nombre}</div>
                  <div className="text"><p className="subtitle">Apellido:</p> {unaPersona.apellido}</div>
                  <div className="text"><p className="subtitle">Alias:</p> {unaPersona.alias}</div>
                  <div className="text"><p className="subtitle">Email:</p> {unaPersona.email}</div>
                  <div className="text"><p className="subtitle">Id:</p> {unaPersona.id}</div>
                </div>

                {/* Contenedor de los botones */}
                <div className="botonera">
                  <button className="btn btn-dark boton" onClick={() => borrar(unaPersona.id)} type="button">Eliminar</button>
                  <Link className="btn btn-dark boton" to={"/personas/editar/"+unaPersona.id.toString()}>Editar</Link>
                  <button className="btn btn-dark boton" onClick={() => libros(unaPersona.id)} type="button">Libros</button>
                </div>

              </div>
            )
          })}
        </div>




      );
      // Si el state de "error" es distinto de "no", entonces retorna el error que tenga dentro.
    } else {
      if (error === "no hay usuarios registrados") {
        return (
          <div className="contMap">
          <button className="btn btn-dark boton" onClick={() => registrar()}>Registrar</button>
          <p className="error"> {error} </p>
        </div>
        )
        
      } else {
        return (
          <div className="contMap">
            {error}
            <button className="btn btn-dark boton" onClick={() => setError("no")}>volver</button>
          </div>
        )
      }
    }
  }

}
