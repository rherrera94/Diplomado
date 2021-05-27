import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function PrestarLibro(props) {
  const params = useParams();
  const [error, setError] = useState("no");
  const [prestar, setPrestar] = useState({
    persona_id: 0,
  });
  const buscarLibro = async (idLibro) => {
    try {
      const respuesta = await axios.get(
        "http://localhost:4000/libro/" + idLibro
      );
      setPrestar(respuesta.data);
    } catch (error) {}
  };
  useEffect(() => {
    if (!params.id) return;
    buscarLibro(params.persona_id);
  }, [params]);

  const handleChangeIdPersona = (e) => {
    const nuevoState = JSON.parse(JSON.stringify(prestar));
    nuevoState.persona_id = e.target.value;
    setPrestar(nuevoState);
  };
  const prestarLibro = async () => {
    try {
      await axios.put(
        "http://localhost:4000/libro/prestar/" + params.id,
        prestar
      );
      swal({
        title: "Libro prestado con éxito",
      }); 
      props.history.push("/libros");      
    } catch (e) {
      swal({
        title:"Error: ",
        text: e.response.data.error
      })
      setError(e.response.data.error)
    }
  };
  if(error ==="no"){
    return (
      <Fragment>
         
         <label> Ingrese id persona a prestar libro </label>
        <input
          type="number"
          name="persona_id"
          value={prestar.persona_id}
          onChange={handleChangeIdPersona}
        />
        <button onClick={prestarLibro}>Prestar</button> 
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
