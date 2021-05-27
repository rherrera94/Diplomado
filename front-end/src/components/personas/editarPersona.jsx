import React, { useState } from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import swal from 'sweetalert';
import "./personas.css"



export default function EditarPersona (props){
    const params = useParams();
    const [formEdit,setFormEdit] = useState({
      nombre: "", 
      apellido: "",
      alias: "",
      email: ""
    });
    const [error, setError] = React.useState("");

    const buscarPersona = async(id)=>{
        try{
        const respuesta = await axios.get("http://localhost:4000/persona/"+id);
        setFormEdit(respuesta.data);
        }catch(e){
            setError(e.response.message.error);
        }
    }
    React.useEffect(()=>{
        if(!params.id) return;
        buscarPersona(params.id);
    },[params])

    const  onChangeNombre = (e)=>{
        const nuevoState = JSON.parse(JSON.stringify(formEdit));
        nuevoState.nombre = e.target.value;
        setFormEdit(nuevoState);
    }
    const  onChangeApellido = (e)=>{
        const nuevoState = JSON.parse(JSON.stringify(formEdit));
        nuevoState.apellido = e.target.value;
        setFormEdit(nuevoState);
    }
    const  onChangeAlias = (e)=>{
        const nuevoState = JSON.parse(JSON.stringify(formEdit));
        nuevoState.alias = e.target.value;
        setFormEdit(nuevoState);
    }
    const  onChangeEmail = (e)=>{
        const nuevoState = JSON.parse(JSON.stringify(formEdit));
        nuevoState.email = e.target.value;
        setFormEdit(nuevoState);
    }
    const guardar = async()=>{
      try{
        let respuesta = await axios.put("http://localhost:4000/persona/"+params.id,formEdit);
        setFormEdit(respuesta.data);
        props.history.push("/personas");
      }catch(e){
        setError(e.response.data.error);  
       swal("Ups!",e.response.data.error,"Warning!");
      }
    }
return(
    <div className="Cont-Form">
        <label htmlFor="Nombra" className="Form">Nombre: </label>
        <input type="text" className="Form" name="Nombre" placeholder="Nombre" value={formEdit.nombre} onChange={onChangeNombre}/>
        <label htmlFor="Apellido" className="Form">Apellido: </label>
        <input type="text" className="Form" name="Apellido" placeholder="Apellido" value={formEdit.apellido} onChange={onChangeApellido}/>
        <label htmlFor="Alias" className="Form">Alias: </label>
        <input type="text" className="Form" name="Alias" placeholder="Alias" value={formEdit.alias} onChange={onChangeAlias}/>
        <label htmlFor="Email" className="Form">Email: </label>
        <input type="email" className="Form" name="Email" placeholder="Email" value={formEdit.email} onChange={onChangeEmail}/>
        <button className="btn btn-dark boton" onClick={guardar}>Guardar</button>
    </div>
)
}