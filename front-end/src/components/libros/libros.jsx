import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./libros.css";

import LibroForm from './LibroForm';


export default function Libros() {
  const [libros, setLibros] = React.useState([]);
  const [error, setError] = React.useState("no");

  const listadoLibros = async () => {
    try{
        const respuesta = await axios.get("http://localhost:4000/libro");
        setLibros(respuesta.data);
    } catch (e) {
        setError(e.response.data.error);
    }

}

React.useEffect(() => {
    listadoLibros();
}, []);

//funcion de borrar

function borrar(id) {

    const borrarPersona = async () => {
        try {
          await axios.delete ("http://localhost:4000/libro/" + id);
          listadoLibros();
        } catch (e) {
          setError(e.response.data.error);
        }
      }
      borrarPersona();
    }

if (error == "no") {
  return (
    <div className="flex-container">
      
      <div>
        {libros.map((props, index) => {
       
          return (
            <div key={index}>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{props.nombre}</h5>
                    <p className="card-text">{props.descripcion}</p>
                    <p className="card-text">{props.alias}</p>         
                  </div>
                  <div className="card-footer">
                    <div className="btn-group" role="group" aria-label="Basic Example">
                    <button type="button" className="btn btn-primary" onClick={() => borrar(props.id) }>Borrar</button>
                    <Link to={"/libro/editar/"+ props.id.toString()} button type="button" className="btn btn-primary">Editar </Link>
                    <Link to={"/libro/prestar/" + props.id.toString()} type="button" className="btn btn-primary">Prestar</Link>
                    <Link to={"/libro/devolver/"+props.id.toString()} button type="button" className="btn btn-primary">Devolver</Link>      
                    </div>
                  </div>
                </div>
              </div>
            </div>            
          )
        })}
      </div>
      <div className="col-md-4">
        <LibroForm>{LibroForm}</LibroForm>
      </div>
    </div>
  );
} else {
  return (
    <div>
      {error}
      <button type= "button" className="btn btn-primary" onClick={() => setError("no") }> Volver</button>
    </div>

  )
}
}