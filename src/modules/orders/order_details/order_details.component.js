import React from 'react';
import '../order_screen.style.scss';
import fetchservices from '../../../services/fetchsvc.service'
import { RiArrowGoBackLine } from 'react-icons/ri';
import { FcExport, FcCheckmark, FcCancel, FcShop, FcFeedIn, FcShipped, FcCallback, FcHome, FcButtingIn, FcMoneyTransfer } from 'react-icons/fc';
import { GiShoppingCart, } from 'react-icons/gi';
import { FaPhoneAlt, FaRupeeSign } from 'react-icons/fa';
import { GrDocumentPdf } from 'react-icons/gr';
import {MdRemoveShoppingCart} from 'react-icons/md';
import {FiTruck} from 'react-icons/fi';
import * as moment from 'moment';
import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactDOM from 'react-dom';
import Toast from '../../../components/toast/toast.component';
export const OrderDetails = (props) => {
    const [reason, setReason] = useState('');
    const [showreject,setShowReject] = useState(false);
    const [products, setProducts] = useState([]);
    const data = props.location.state;
    const { callBack } = props.location;
    const itemList = async () => {
        const items = await fetchservices.get(`api/getOrdersbyId/${data.Id}`);
        setProducts(items);
    }
    React.useEffect(() => {
        itemList();
    }, [data]);
    if (!data) {
        return null;
    };
    const download = async () => {
        const doc = new jsPDF();
        doc.text(`Invoice - ${data.OrderId}`, 15, 10);
        doc.autoTable({ html: '#invoice' });
        doc.save(`${data.OrderId}.pdf`);
    }
    const updateOrder = async (Id, status, reason) => {
        const msg = `Order ${status}!`;
        await callBack(Id, status, reason);
        ReactDOM.render(<Toast message={msg} />, document.getElementById('dom'));
        props.history.push('orderlist');
    }
    return (
        <div className="order">
           {/* { 
             showreject ?
           <div className="reject-modal">
            <ul>
                <li>
                    <label>Reason for reject</label>
                    <input type="text" value={reason} onChange={(text)=>setReason(text)}/>
                </li>
                <li>
                    <button className="primary" onClick={() => callBack(data.Id, "Reject", reason)}>Reject</button>
                </li>
            </ul>
            </div>
            : 
            null
            } */}
            <div className="sub-header">
                <RiArrowGoBackLine onClick={props.history.goBack} className="icon" size="22px" />
                <label>Order Details <span>{data.OrderId}</span></label>
            </div>
            <div className="details">
                <div className="order-date">
                    Order placed on: {moment(new Date(data.InvoiceDate)).format('L')}
                    <label className={data.OrderStatus}>{data.OrderStatus}</label>
                </div>
                <ul className="status">
                    {/* <li><div><FcCheckmark size="35px" /></div></li>
                    <li><div><FcShop size="35px" /></div></li>
                    <li><div><FcFeedIn size="35px" /></div></li> */}
                    <li>
                        {data.OrderStatus === 'New' && <FcExport color="orange" size="80px" />}
                        {data.OrderStatus === 'Accepted' && <FcShop color="orange" size="80px" />}
                        {data.OrderStatus === 'Rejected' && <FcCancel color="orange" size="80px" />}
                        {data.OrderStatus === 'Shipped' && <FcShipped color="orange" size="80px" />}
                        {data.OrderStatus === 'Delivered' && <FcHome color="orange" size="80px" />}
                    </li>
                </ul>
                <div className="customer" >
                    <div><FcButtingIn size="50px" /></div>
                    <div>{data.CustomerEmail} <label>{data.CustomerPhone}</label></div>
                    <FaPhoneAlt className="call" color="green" size="20px" />
                    <FcMoneyTransfer className="call" size="20px" />
                </div>
                <div className="table">
                    <table id="invoice">
                        <thead>
                            <tr className="table-head">
                                <th>Product</th>
                                <th>Nos</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, i) =>
                                <tr key={`orders-${i}`}>
                                    <td>{product.ProductDesc}</td>
                                    <td>{product.Qty}</td>
                                    <td>{product.UnitPrice}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="sum-download">
                {(data.OrderStatus === 'Shipped' || data.OrderStatus === 'Delivered') && <div className="download" onClick={download}><GrDocumentPdf size="20px" /> Download</div>}
                <div className="by">{products.length} Item for <FaRupeeSign /> {data.TotalAmount}</div>
            </div>
            {
                data.OrderStatus === 'New' &&
                <div className="actions">
                    <li><button onClick={() => updateOrder(data.Id, "Accepted", '')}><FcCheckmark size="35px" /><label>Accept</label></button></li>
                    <li><button onClick={() => updateOrder(data.Id, "Rejected", '')}><FcCancel size="35px" /><label>Reject</label></button></li>
                </div>
            }
            {
                data.OrderStatus === 'Accepted' &&
                <div className="actions">
                    <li><button onClick={() => updateOrder(data.Id, "Shipped", '')}><FcShipped size="35px" /><label>Ship</label></button></li>
                    <li><button onClick={() => updateOrder(data.Id, "Rejected", '')}><FcCancel size="35px" /><label>Cancel</label></button></li>
                </div>
            }
            {
                data.OrderStatus === 'Shipped' &&
                <div className="actions">
                    <li><button onClick={() => updateOrder(data.Id, "Delivered", '')}><FcCheckmark size="35px" /><label>Delivered</label></button></li>
                    <li><button onClick={() => updateOrder(data.Id, "Rejected", '')}><FcCancel size="35px" /><label>Reject</label></button></li>
                </div>
            }

        </div>
    )
}