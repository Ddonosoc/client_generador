import React from 'react';
import {Component} from "react";
import { css } from "@emotion/core";
// Another way to import. This is recommended to reduce bundle size
import {BeatLoader} from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class Charging extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loading: nextProps.loading });
    }

    render() {
        const style = {
            top:"50%",
            left:"47%",
            position: "absolute",
            opacity: 1,
        };
        // agregar style={style} a sweet-loading
        return (
            <div className="sweet-loading" style={style}>
                <BeatLoader
                    css={override}
                    size={30}
                    color={"#FFFFFF"}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}