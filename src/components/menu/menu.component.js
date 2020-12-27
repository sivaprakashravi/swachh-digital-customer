

import React, { useEffect, useState, useRef } from "react";
import './menu.style.scss';
import { FaEllipsisV } from 'react-icons/fa';

const VMenu = props => {
    const menuRef = useRef();
    const [isOpen, setOpen] = useState(false);
    const onOpen = () => {
        setOpen(!isOpen);
    };
    const onSelect = name => {
        console.log(props);
        if (typeof props.onSelect != "undefined") {
            let obj = { actiontype: name, data: props.data };
            props.onSelect(obj);
        }
        setOpen(!isOpen);
    };
    useEffect(() => {
        function onClickOutsideMenuHandler(event) {
            if (!isOpen && menuRef && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("click", onClickOutsideMenuHandler);
        return () => {
            document.removeEventListener("click", onClickOutsideMenuHandler);
        };
    }, [menuRef]);
    return (
        <div className={isOpen ? "v-menu show" : "v-menu"} ref={menuRef}>
            <FaEllipsisV onClick={() => onOpen()} />
            <ul className="menu-dropdown">
                {props.children}
            </ul>
        </div>
    );
};
export { VMenu };