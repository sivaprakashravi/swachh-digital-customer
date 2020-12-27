import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './toast.style.scss';
import { IoMdClose } from "react-icons/io";

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }
    static defaultProps = {
        action: false,
        message: 'Toast Message',
        background: '#3f51b5',
        timeout: 5,
        color: '#fff'
    };

    close() {
        ReactDOM.unmountComponentAtNode(document.getElementById('dom'));
    };
    render() {
        const self = this;
        if (!this.props.action) {
            window.setTimeout(() => {
                self.close();
            }, self.props.timeout * 1000);
        }
        return (
            <div className={this.state.visible ? 'toast-box' : 'toast-box close'} style={{ background: this.props.background, color: this.props.color }}>
                <label>{this.props.message} {!this.props.action ? <IoMdClose className="close" size="20px" onClick={() => self.close()} /> : null}</label>
                {this.props.action ? <button className="primary" onClick={() => self.close()}>Ok</button> : null}
            </div>
        );
    }
}

export default Toast;
