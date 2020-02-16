import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron} from 'react-bootstrap';
import './App.css';
import GetData from "./components/get_data";

function App() {
  return (
    <div className="App">
      <Jumbotron>
          <h1>Creador de reportes de base de datos</h1>
          <p>Para crear un reporte, seleccionar rut en el filtro de abajo, o simplemente dar click en generar reporte en alguna de las personas</p>
      </Jumbotron>
        <GetData/>
    </div>
  );
}

export default App;
