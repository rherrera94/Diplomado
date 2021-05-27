import '../../App.css';
export default function Libros(propiedades){
    return (


      <div key={propiedades.index}>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body card-gender-new">
                  <h5 className="card-title">Título: {propiedades.unLibro.nombre}</h5> <br/>
                    <div>
                    <p className="card-text">Id Libro: {propiedades.unLibro.id}</p>   
                    <p className="card-text">Descripción del libro: {propiedades.unLibro.descripcion}</p>
                    </div>       
                  </div>
                </div>
              </div>
            </div>   
      );
}
