import React, { useContext, useState } from 'react';
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { BsQuestionCircle, BsPeopleCircle } from "react-icons/bs";
import { HiOutlineShoppingCart } from "react-icons/hi";
import './header.style.scss';
import SideNav from './../side-navigation/side-navigation.component';
import storage from '../../services/storage-manager.service';
import translate from '../../locale/translate';
import { store } from "./../../modules/utils/App-state-provider";
function Header() {
    const initialState = {
        showNav: false,
        activeNav: {}
    };
    const globalState = useContext(store); 
    const [data, setData] = useState(initialState);

    var toggleNav = () => {
        setData({ showNav: !data.showNav })
    }
    var updateNavSelection = (e) => {
        this.setState({ activeNav: e });
    }
    return (
        <div className="header">
            {
                data.showNav ?
                    <IoMdClose size="26px" onClick={() => { setData({ showNav: false }) }} style={{ margin: '6px 10px 0' }} /> :
                    <IoMdMenu size="26px" onClick={() => { setData({ showNav: true }) }} style={{ margin: '6px 10px 0' }} />
            }
            <span>{translate("APPNAME", { name: 'test' })} {data.showNav} </span>
            {data.showNav ? <SideNav selected={(e) => {
                updateNavSelection(e)
            }} active={data.activeNav} show={data.showNav} toggle={() => {
                toggleNav()
            }} /> : null}
            <input type="search"></input>
            <div className="user-profile">
                <div className="cart"><span>Items in Cart</span><HiOutlineShoppingCart size="24px" /></div>
                <BsPeopleCircle size="24px" />
                <BsQuestionCircle size="24px" />
            </div>
        </div>
    );
}
export default Header;