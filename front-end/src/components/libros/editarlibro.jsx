import React from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import swal from 'sweetalert';

export default function Editarlibro(props) {

    const params = useParams();

    const [form, setForm] = React.useState({
        id: '',
        nombre:'',
        descripcion:'',
        categoria_id:'',
        persona_id:''
    });

    const [error, setError] = React.useState("")

const buscarLibroPorId = async (id) => {
    try {
        const respuesta = await axios.get("http://localhost:4000/libro/" + id)
        setForm(respuesta.data);       
        
    } catch (e) {
        setError(e.response.data.error);
    }

}

    React.useEffect(() => {
        if (!params.id) return;
        buscarLibroPorId(params.id)
    }, [params] );


    const handleChangeNombre = (e) => {
        
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeDescripcion = (e) => {
        
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.descripcion = e.target.value;
        setForm(nuevoState);
    }

    const guardar = async () => {
        try {
            await axios.put('http://localhost:4000/libro/'+ params.id, form);
            props.history.push('/libros');
        } catch (e) {
            setError(e.response.data.error);
            swal("Error: ",e.response.data.error,"warning");
        }
    }

    return (
        <div>
            <input className="form-control" type="text" name="Nombre" placeholder="Nombre" value={form.nombre} onChange={handleChangeNombre} ></input><br></br>
            <input className="form-control" type="text" name="Descripcion" placeholder="Descripcion" value={form.descripcion} onChange={handleChangeDescripcion}></input>
            <button className="btn btn-primary" onClick={guardar}>Guardar</button>
        </div>
    )
}
