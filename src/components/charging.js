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
        return (
            <div className="sweet-loading">
                <BeatLoader
                    css={override}
                    size={15}
                    color={"#948899"}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}