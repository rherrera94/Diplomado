import axios from "axios";
import React from "react";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import '../../App.css';
export default function Gendernew(){
    
  // Defino los estados de cada uno de los inputs del formulario
  const [categ, setGender] = React.useState("");
  
  const history = useHistory();
  // creo una funcion para guardar los datos del usuario ingresa en el formulario
  const handleSave = async () => {
  // guardo en una constante las propiedades a enviar del formulario
    const body = {
      categ:categ
    };
    try {
    // compruebo que se ingresen todos los datos
      if (body.categ.trim()===""){
        swal({
          title:"Error: ",
          text: "faltan llenar campos",
          icon:"warning",
          buttons:["continuar",0]})
      .then(()=>{
          return;
      })
      }
     const respuesta = await axios.post("http://localhost:4000/categoria", body);
    // si esta todo bien, hago que me redirija al listado de personas registradas
      if (respuesta.status === 200) {
        history.push("/generos/saved/"+respuesta.data.id+"/"+respuesta.data.nombre); 
        
      }
  
    } catch (e) {
      
      swal({
        title:"Error: ",
        text: e.response.data.error,
        icon:"warning",
        buttons:["volver",0]})
    .then(()=>{
        return;
    })      
    }
  };

    return (
        <div>
          <div className="card">
            <div className="card-body card-gender-new">
            <h5 className="card-title">Agregar género</h5>
            <input type="text" name="categ" placeholder="genero" className="form-control" onChange={(e) => {
                setGender(e.target.value);
              }}
            />
            <button className="btn btn-primary" onClick={handleSave}>Enviar</button>
          </div>
        </div>
        </div>
      );

        
  
}