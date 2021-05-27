import axios from "axios";
import React from "react";
import Libros from './cardLGender';
import Gender from './cardGender';
import Gendernew from './formNewGender';


export default function Generos() {
  const [error, setError] = React.useState("no");
  const [generos, setGeneros] = React.useState([]);
  const [libros, setLibros] = React.useState([]);
  const [Books, setBooksSearch] = React.useState("no");
  
/**
 *  Cada vez que se llame a ésta funcion, la misma me devolvera el listado de categorias
 * existentes en la base de datos. De generarse algun error lo mostrará por pantalla.
 */

  function ListadeGeneros(){
    const listadoGender = async () => {
      try {
        //consulto al backend las categorias
        const respuesta = await axios.get("http://localhost:4000/categoria");
        setGeneros(respuesta.data);
        setError("no")
      } catch (e) {
        if(e.response.data.error==="No se han encontrado géneros de libros en la base de datos"){
          // esto lo que hace es que al no encontrar ninguna categoria actualizo el state de generos para que sepa que no hay generos
          setGeneros([]);
        }
        setError(e.response.data.error);//error proveniente del backend
      }
    };
    listadoGender();
  }

  React.useEffect(() => {
     ListadeGeneros();
  }, []);

/**
 * 
 * La funcion librosGeneros se utilizara cuando se haga click en el boton libros, del frontend, ubicados en cada
 * uno de los generos que hay. Lo que hará es mostrar un listado de los libros existentes que estan dentro del genero
 * al cual corresponde el boton. De no encontrar libros asociados al genero enviara al frontend los errores consignados
 * en el backend. 
 */

function librosGenero(unGenero) {
    const listadoBooks = async () => {
      try {
        const respuesta = await axios.get("http://localhost:4000/categoria/" + unGenero + "/libros");
        setLibros(respuesta.data);
        setBooksSearch(1);
      } catch (e) {
        if(e.response.data.error==="No se han encontrado géneros de libros en la base de datos"){
          setGeneros([]);
        }
        setError(e.response.data.error);
      }
    };
    listadoBooks();
  }

/**
 * 
 * Ésta función lo que hace es borrar el genero de numero de id que se recibe por parametros.
 * a su vez despues de borrar esa categoria muestra por pantalla el listado actualizado de generos,
 * llamando a la funcion ListadeGeneros() 
*/

  function borrador(id) {
    const borradoGender = async () => {
      try {
        await axios.delete("http://localhost:4000/categoria/" + id);
        ListadeGeneros();
      } catch (e) {
        setError(e.response.data.error);
      }
    };
    borradoGender();
  }
     
/***********************************************************************************************/
/* Aca comienza lo que se mostrará por pantalla. Según lo que me haya ido tirando el backend o */
/* los botones que el usuario haya elegido presionar se mostraran diferentes pantallas.        */    
/***********************************************************************************************/

if (error === "no" && Books === 1) {
//Aca lo que hace es que cuando yo quiero ver los libros de un genero especifico me los muestra
// para que entre a ésta seccion no tiene que haber surgido errores y ademas el backend tiene
// que haberme traido libros que se corresponden con el genero.
return (
  <div className="flex-container">
      <div className="col-md"></div>
      <div className="col-md">
        <div className="card-gender-new">
            <table className="table card-gender-new">
              <thead>
              </thead>
              <tbody>
                    {libros.map((unLibro, index) => <Libros unLibro={unLibro} index={index}/>)}       
              </tbody>
            </table>
            <button type="button"className="btn btn-primary boton" onClick={() => setBooksSearch(0)}>
             volver
            </button>
        </div>
      </div>
      <div className="col-md-4">
              <div className="col-md-6">
                    <div className="formulario-agregar-genero">
                        <Gendernew/>
                    </div>
              </div>
      </div>
  </div>
)
  } else {
    if (error === "no") {
      //aca entra si no hubo error y no estoy pidiendo libros de una categoria especifica
      //osea va a entrar en todos los casos que no entra en el anterior y que ademas no haya error.
      return (
        <div className="flex-container">
            <div className="col-md"></div>
            <div className="col-md-3">
              {generos.map((unGenero, index) => {
                      return (
                        //renglon-Generos datos-Generos-izq
                        <div key={index}>
                        <div className="col-md-10">
                          <div className="card">
                            <div className="card-body card-gender-new">
                              <Gender unGenero={unGenero} index={index}/>   
                            </div>
                            <div className="card-footer">
                              <div className="btn-group" role="group" aria-label="Basic Example">
                              <button type="button" className="btn btn-primary" onClick={() => borrador(unGenero.id) }>Borrar</button>
                              <button type="button" className="btn btn-primary" onClick={() =>  librosGenero(unGenero.id) }>Libros</button>      
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>         
                      );
              })}
              </div>
              <div className="col-md"></div>
              <div className="col-md-4">
                <div className="col-md-6">
                    <div className="formulario-agregar-genero">
                        <Gendernew/>
                    </div>
                </div>
              </div>
              
            </div>
        
        
      )       
    } else {
      //en el caso de que haya habido algun tipo de error enviado por el backend me lo va a mostrar
      return (
        <div className="flex-container">
          <div>  
              <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Error {error}</h5>        
                  </div>
                  <button type="button" className="btn btn-primary" onClick={() =>{setError(0); ListadeGeneros(); } }>
                      Volver
                    </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
                <div className="col-md-6">
                    <div className="formulario-agregar-genero">
                        <Gendernew/>
                    </div>
                </div>
              </div>
        </div>
      )
    }   
  }
}
