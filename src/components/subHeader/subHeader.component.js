import React from 'react';
import './subHeader.style.scss'
import { RiArrowGoBackLine } from 'react-icons/ri';

const subHeader = ({header,callBack}) =>{
    return(
        <div className="sub-header">
        <RiArrowGoBackLine onClick={()=>callBack()} className="icon" size="22px" />
        <label>{header}</label>
    </div>
    )
};

export default subHeader;