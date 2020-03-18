import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron} from 'react-bootstrap';
import './App.css';
import GetData from "./components/get_data";

function App() {
    const divStyle = {
        color: 'black',
        background: 'url(http://www.quintatv.cl/wp-content/uploads/2018/09/putaendo-v-regic3b3n-chile-1.jpg)',
        backgroundPosition: "center",
        backgroundSize: "95%",
        opacity: 0.3,
        width: "100%",
        height: "30%",
        position: "absolute",
        top: "0%",
        zIndex: "0"
    };
    return (
        <div className="App">
            <div style={divStyle}>
            </div>
            <Jumbotron style={{height: "30%", zIndex: "1", opacity: "1", color: "black"}}>
                <b>
                    <h1>Generador de Declaraciones Juradas</h1>
                    <p>Para crear una declaración, seleccionar rut en el filtro de abajo, o simplemente dar click en
                        generar reporte en alguna de las personas</p>
                </b>
            </Jumbotron>
            <GetData/>
        </div>
    );
}

export default App;
