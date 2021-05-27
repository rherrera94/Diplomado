import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          My books
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/libros">Books</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/generos">Generos</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/personas">Personas</Link> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
