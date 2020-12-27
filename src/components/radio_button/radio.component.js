import React, { Component } from 'react';
import './radio.style.scss';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
class Radio extends Component {
  
     static defaultProps = {
        size: '22px',
        color: '#3f51b5'
     };
    render() {
        return (
            <div className="radio-box" onClick={() => {
                this.props.onChange(true);
            }}>
                <span className="icon">
                    {this.props.checked ?
                        <MdRadioButtonChecked size={this.props.size} color={this.props.color} />
                        :
                        <MdRadioButtonUnchecked size={this.props.size} color={this.props.color} />
                    }
                </span>
                <label>{this.props.label}</label>
            </div>
        );
    }
}

export default Radio;
