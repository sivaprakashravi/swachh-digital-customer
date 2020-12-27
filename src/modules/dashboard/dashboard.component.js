import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import './dashboard.style.scss';
import { IoMdClose } from "react-icons/io";
import { FcPlus, FcLike, FcKey, FcPaid, FcButtingIn, FcBullish, FcServices, FcIdea, FcMultipleInputs } from "react-icons/fc";
import Carousel from 're-carousel';
import IndicatorDots from './indicators';
import storage from '../../services/storage-manager.service';
import translate from '../../locale/translate';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showActions: true,
            services: [{
                label: 'ADDPRODUCT',
                route: 'CreateProduct',
                icon: <FcPlus size="35px" />
            }, {
                label: 'OFFERS',
                route: '',
                icon: <FcLike size="35px" />
            }, {
                label: 'ACCESSMANAGEMENT',
                route: '',
                icon: <FcKey size="35px" />
            }, {
                label: 'ORDERS',
                route: 'orderlist',
                icon: <FcPaid size="35px" />
            }, {
                label: 'CUSTOMERS',
                route: '',
                icon: <FcButtingIn size="35px" />
            }, {
                label: 'STORESETUP',
                route: '',
                icon: <FcServices size="35px" />
            }, {
                label: 'REPORTS',
                route: '',
                icon: <FcBullish size="35px" />
            }, {
                label: 'STOREDESIGN',
                route: 'storeDesign',
                icon: <FcIdea size="35px" />
            }, {
                label: 'MORESERVICES',
                route: '',
                icon: <FcMultipleInputs size="35px" />
            }]
        };
    }

    componentDidMount() {
        const store = storage.get('storeUser');
        const { StoreLink } = store;
        this.setState({ StoreLink });
    }

    banner() {
        const carousel = ['frame1', 'frame2', 'frame3'];
        return (
            <div className="scroll-banner">
                <Carousel loop={true} auto={true} widgets={[IndicatorDots]}>
                    {carousel.map(s => {
                        // android_asset/www -> for android build
                        return <div key={s} className="scroll-item frame" style={{'backgroundImage': `url(/images/banner/${s}.jpg)`}}></div>
                    })}
                </Carousel>
            </div>
        )
    }

    notify() {
        return (
            this.state.showActions ?
                <div className="store-kyc warning">
                    <h5>Pending Action <IoMdClose size="18px" style={{ float: 'right' }} onClick={() => {
                        this.setState({ showActions: false })
                    }} /></h5>
                    <ul>
                        <li>Payment setup</li>
                        <li>Store details</li>
                        <li>Store theme</li>
                        <li>++ include other steps</li>
                    </ul>
                </div> : ''
        )
    }

    services() {
        return (
            <div className="services">
                <ul>
                    {
                        this.state.services.map(s => {
                            return <li key={s.label} onClick={() => this.props.history.push(s.route)}>{s.icon}<label>{translate(s.label)}</label></li>
                        })
                    }
                </ul>
            </div>
        )
    }

    render() {
        const { StoreLink } = this.state
        return (
            <div className="dashboard">
                {this.banner()}
                <div className="store-url"><label>{StoreLink}</label> <FaShareAlt size="24px" style={{ float: 'right' }} /></div>
                {this.notify()}
                {this.services()}
            </div>
        );
    }
}

export default Dashboard;