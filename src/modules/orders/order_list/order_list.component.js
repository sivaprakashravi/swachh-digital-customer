import React from 'react';
import '../order_screen.style.scss';
import { IoIosArrowForward } from 'react-icons/io';
import { BiEdit } from 'react-icons/bi';
import {FcExternal,FcShop,FcCancel,FcShipped,FcHome} from 'react-icons/fc'
import t from '../../../locale/translate'
export const OrderList = (props) => {
    return (
        <div className="order-list">
            <div className="list-view">
                <ul>
                    <li>
                        {props.data.OrderStatus === 'New' && <FcExternal color="orange" size="22px" />}
                        {props.data.OrderStatus === 'Accepted' && <FcShop color="orange" size="22px" />}
                        {props.data.OrderStatus === 'Rejected' && <FcCancel color="orange" size="22px" />}
                        {props.data.OrderStatus === 'Shipped' && <FcShipped color="orange" size="22px" />}
                        {props.data.OrderStatus === 'Delivered' && <FcHome color="orange" size="22px" />}
                        <label>Order ID: {props.data.OrderId}</label> <BiEdit className="edit" size="22px" onClick={() => props.nav.push({ pathname: 'orderEdit', state: props.data })} /></li>
                    <li>Amount: {props.data.TotalAmount}</li>
                    <li>Customer: {props.data.CustomerPhone} <span className={props.data.OrderStatus}>{props.data.OrderStatus}</span></li>
                </ul>
            </div>
            {
                props.data.OrderStatus === 'New' &&
                <div className="actions">
                    <button className="accept" onClick={() => props.update(props.data.Id, 'Accepted', '')}>Accept</button>
                    <button className="reject" onClick={() => props.update(props.data.Id, 'Rejected', '')}>Reject</button>
                </div>
            }

            <div className="view" onClick={() => props.nav.push({ pathname: 'orderDetails', state: props.data, callBack: props.update })}><IoIosArrowForward size="24px" /></div>
        </div>
    )
}