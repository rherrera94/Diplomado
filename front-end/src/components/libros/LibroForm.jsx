import React, { Fragment, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function LibroForm() {
  const [error, setError] = useState("no");
  const [datos, setDatos] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    categoria: " ",
  });
  const cambiosEnInput = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const enviarDatos = async () => {
    try {
      const body = {
        persona_id: datos.id,
        nombre: datos.nombre,
        categoria: datos.categoria,
        descripcion: datos.descripcion,
      };
      const respuesta = await axios.post("http://localhost:4000/libro", body);
      if (respuesta.status === 200) {
        swal({
          title: "Libro registrado!",
          text: respuesta.data,
        }); 
      } else {
        swal({
          title: "No se pudo realizar el registro!",
        }); 
      }
    } catch (e) {
      swal({
        title:"Error: ",
        text: e.response.data.error
      })
      setError(e.response.data.error)
    }
  };
  if(error === "no"){
    return (
    
      <Fragment>
      <form className="" onSubmit={enviarDatos}>
        <div className="" >
          <label className="form-label"></label>
          <input
            type="number"
            placeholder="Ingrese un id que exista en base de datos"
            className="form-control"
            onChange={cambiosEnInput}
            name="id"
            required={true}
          />
          <input
            type="text"
            placeholder="Nombre del libro"
            className="form-control "
            onChange={cambiosEnInput}
            name="nombre"
            required={true}
          />
          <input
            type="text"
            placeholder="Ingrese una categoria existente"
            className="form-control"
            onChange={cambiosEnInput}
            name="categoria"
            required={true}
          />       
          <input
            type="text"
            placeholder="Descripción breve"
            className="form-control"
            onChange={cambiosEnInput}
            name="descripcion"
            required={true}
          />
          <button type="submit" className="btn btn-primary">
            Agregar Libro
          </button>
        </div>
      </form>
      </Fragment>
    );
  

  } else{
    return(
      <Fragment>
        {error}
      </Fragment>
    )
  }


  
}
