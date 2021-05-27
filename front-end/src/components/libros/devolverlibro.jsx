import React from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import swal from 'sweetalert';


export default function Devolverlibro(props) {

    const params = useParams();
    const guardar = async () => {
        try {
           const devuelve= await axios.put("http://localhost:4000/libro/devolver/" + params.id);
           swal({
            title:"Mensaje: ",
            text: devuelve.data,
            icon:"success",
            buttons:["volver",0]})
        .then(()=>{
            props.history.push('/libros');
        }) 
        } catch (error) {
            swal({
                title:"Error: ",
                text: error.response.data.error,
                icon:"warning",
                buttons:["volver",0]})
            .then(()=>{
                props.history.push('/libros');
            })
        }
    }
    return (
        <div>
            <div className="alert alert-warning" role="alert">
                ¿Esta seguro de continuar con la devolución? 
            </div>
            <button type="button" className="btn btn-outline-success" onClick={guardar}>Continuar</button>
        </div>
    )
    
}
