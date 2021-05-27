import React  from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default function Registro(props) {
  // Defino los estados de cada uno de los inputs del formulario
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [email, setEmail] = React.useState("");
  
  // creo una funcion para guardar los datos del usuario ingresa en el formulario
  const handleSave = async () => {
  // guardo en una constante las propiedades a enviar del formulario
    const body = {
      nombre: nombre, 
      apellido: apellido,
      alias: alias,
      email: email
    };

    try {
    // compruebo que se ingresen todos los datos
    if (body.nombre.trim()===""||body.apellido.trim()===""||body.alias.trim()===""||body.email.trim()===""){
      swal ("Faltan llenar campos", "Complete todos los datos", "warning")
      return;
       }
    
    // hago el post a traves de axios al servidor
     let respuesta = await axios.post("http://localhost:4000/persona", body);
     
    // si esta todo bien, hago que me redirija al listado de personas registradas
      if (respuesta.status === 200) {
       swal("Buen trabajo!", "Usted se registro correctamente", "success") 
         props.history.push("/personas")
      }
  
    } catch (e) {
      swal (e.response.data.error, "error", "warning");
      return;
    }
  };

  //Muestro el formulario de registro
  return (
    <div className="Cont-Form">
      <label For="Nombre" className="Form">Nombre: </label>
        <input className="Form"
          type="text"
          name="Nombre"
          placeholder="nombre"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
          }}
        />
      
      <label For="Apellido" className="Form">Apellido: </label>
        <input className="Form"
          type="text"
          name="Apellido"
          placeholder="apellido"
          value={apellido}
          onChange={(e) => {
            setApellido(e.target.value);
          }}
        />
      
      <label For="Alias" className="Form">Alias: </label>
        <input className="Form"
          type="text"
          name="Alias"
          placeholder="alias"
          value={alias}
          onChange={(e) => {
            setAlias(e.target.value);
          }}
        />
      
      <label For="Email" className="Form">Email: </label>
        <input className="Form"
          type="email"
          name="Email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
    
      
        <button className="btn btn-dark boton" onClick={handleSave}>Enviar</button>
      
    </div>
  );
}
