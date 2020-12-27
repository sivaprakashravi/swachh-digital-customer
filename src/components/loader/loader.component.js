import React, { Component } from 'react';
import './loader.style.scss';
import { VscLoading } from "react-icons/vsc";

class Loader extends Component {
    static defaultProps = {
        size: '22px',
        color: '#3f51b5'
    };
    render() {
        return (
            <div className="loading">
                <div>
                    <VscLoading size="50px" className="spinner" />
                </div>
            </div>
        );
    }
}

export default Loader;
