import React from 'react';
import './bottom-navigation.style.scss';
import { FcHome, FcList, FcServices, FcPaid, FcLike } from "react-icons/fc";
class BottomNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                label: 'Home',
                route: '/',
                icon: <FcHome size="22px" />,
                active: true
            }, {
                label: 'Catalogs',
                route: '/',
                icon: <FcList size="22px" />
            }, {
                label: 'Store Services',
                route: '/',
                icon: <FcServices size="22px" />
            }, {
                label: 'Orders',
                route: '/',
                icon: <FcPaid size="22px" />
            }, {
                label: 'Offers',
                route: '/',
                icon: <FcLike size="22px" />
            }]
        };
    }

    render() {
        return (
            <div className="bottom-navigation">                 
                 &copy; {new Date().getFullYear()} Swachh Digital. All Rights Reserved.
            </div>
        );
    }
}

export default BottomNav;