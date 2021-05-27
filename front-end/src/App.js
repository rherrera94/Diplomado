import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';


//todos los componentes importados.
import Navbar from './components/navbar';
import Libros from './components/libros/libros';
import Generos from './components/genero/generos';
import Personas from './components/personas/personas';
import Gendersaved from './components/genero/generoSaved';
import LibroForm from './components/libros/LibroForm';
import EditarLibro from './components/libros/editarlibro';
import PrestarLibro from './components/libros/PrestarLibro';
import Devolverlibro from './components/libros/devolverlibro';
import Registro from './components/personas/registro';
import EditarPersona from './components/personas/editarPersona';
// function madre donde desde aca vamos a cada ruta de componente.
function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Route exact path="/libros" component = {Libros} />
      <Route exact path="/generos" component = {Generos} />
      <Route exact path="/personas" component = {Personas} />
      <Route exact path="/personas/editar/:id" component = {EditarPersona} />
      <Route exact path="/personas/registro" component = {Registro} />
      <Route exact path="/generos/saved/:id/:nombre" component={Gendersaved}/>
      <Route exact path="/libro/editar/:id" component = {EditarLibro} />
      <Route exact path="/libro/prestar/:id" component = {PrestarLibro} />
      <Route exact path="/libro/devolver/:id" component = {Devolverlibro} />
      <Route exact path="/libro/formulario" component = {LibroForm} />
    </Router>
  );
}

export default App;
