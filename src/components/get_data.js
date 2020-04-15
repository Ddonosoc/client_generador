import React, {Component} from "react";
import fetch from "isomorphic-unfetch";
import Button from "react-bootstrap/Button";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Charging from "./charging";
import { fadeIn, fadeOut } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

export default class GetData extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: true, error: null, data: null, id: null, isPending: false}
    }

    componentDidMount() {
        this.getData();
    }
    getData() {
        this.setState({isLoading: true});
        let url = 'http://localhost:3080';
        const jsonResponse = fetch(url, {
            method: 'GET',
            headers: {'Accept': 'application/json'},
        });
        jsonResponse
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(json => {
                let data = json;
                let tipos = data["types"];
                tipos.push("Accion");
                let datos = data["rows"];
                let i;
                let types_table = [];
                for (i = 0; i < tipos.length; i++) {
                    let sort = false;
                    if (tipos[i] === "N"){
                        sort = true;
                    }
                    let dict = {
                        dataField: tipos[i],
                        text: tipos[i],
                        sort: sort
                    };
                    types_table.push(dict);
                }

                for (i = 0; i < datos.length; i++){
                    let dat = datos[i];
                    let buttonStyle= {
                      backgroundColor: "#2CB868",
                        borderColor: "#0E9548",
                    };
                    datos[i]["Accion"] = <Button onClick={() => this.crear_documento(dat)} style={buttonStyle}>Crear reporte</Button>;
                }

                this.setState({table_types: types_table, table_data: datos});
                this.setState({
                    data: {"types": json["types"], "rows": json["rows"]},
                    isLoading: false,
                    pending: true,
                });
            })
            .catch(response => {
                response.json().then(text => {
                    let errorTxt = "Something went wrong ...";
                    errorTxt = errorTxt.concat("The request has a status of: ", response.status, " ", response.statusText);
                    this.setState({error: errorTxt, isLoading: false});
                })
                    .catch(text => {
                        let errorTxt = "Something went wrong ...";
                        this.setState({
                            error: errorTxt.concat("error ", response.status, ". There was an error during execution."),
                            isLoading: false,
                            pending: true
                        })
                    });
            });
    }

    crear_documento(data){
        this.setState({isLoading: true});
        let new_data = Object.assign({}, data);
        delete new_data["Accion"];
        let url = 'http://localhost:3080/create_pdf';
        const jsonResponse = fetch(url, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(new_data)
        });
        jsonResponse
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then(json => {
                this.setState({isLoading: false, pending: true});
                alert("Reporte generado, el nombre es: " + json["name"]);
            })
            .catch(response => {
                this.setState({isLoading: false, pending: true});
                response.json().then(text => {
                    let errorTxt = "Something went wrong ...";
                    errorTxt = errorTxt.concat("The request has a status of: ", response.status, " ", response.statusText);
                    alert(errorTxt);
                })
                    .catch(text => {
                        let errorTxt = "Something went wrong ...";
                        alert(errorTxt);
                    });
            });
    }


    render() {
        const style = {
            backgroundColor: "black",
            opacity: 0.35,
            height: "100%",
            width: "100%",
            position: "fixed",
            top: "0%",
            left: "0%",
        };
        const fadeInStyle = {
            fade: {
                animation: 'x 1s',
                animationName: Radium.keyframes(fadeIn, 'fadeIn')
            }
        };

        let cargando = "";
        if (this.state.isLoading){
            cargando =
                <StyleRoot>
                    <div className="test" style={fadeInStyle.fade}>
                        <div style={style}>
                            <Charging loading={this.state.isLoading}/>
                        </div>
                    </div>
                </StyleRoot>;
        }
        if (this.state.isLoading && this.state.data == null) {
            return (cargando);
        } else {
            const {SearchBar} = Search;

            return (
                <div>
                    {cargando}
                    <ToolkitProvider
                        keyField="N"
                        data={ this.state.table_data }
                        columns={ this.state.table_types }
                        search
                        striped={true}
                    >
                    {props =>(
                            <div>
                                <h3>Puedes buscar algún dato por su nombre o valor:</h3>
                                <SearchBar { ...props.searchProps } />
                                <hr />
                                <BootstrapTable
                                    hover
                                    condensed
                                    scrollX
                                    headerClasses={"header-class"}
                                    {...props.baseProps
                                    }
                                />
                            </div>
                    )}
                    </ToolkitProvider>
                </div>
            );

        }
    }
}