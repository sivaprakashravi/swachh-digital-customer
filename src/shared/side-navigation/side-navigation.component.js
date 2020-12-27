import React from 'react';
import './side-navigation.style.scss';
import { IoMdClose } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { CgLogOff } from "react-icons/cg";
import { withRouter } from "react-router-dom";
import storage from '../../services/storage-manager.service';
import session from '../../services/session-manger.service';
import translate from '../../locale/translate'
class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                label: 'HOME',
                route: 'dashboard',
                active: true
            }, {
                label: 'ADDPRODUCT',
                route: 'CreateProduct'
            }, {
                label: 'ADDCATEGORY',
                route: ''
            },
            {
                label: 'PRODUCTLIST',
                route: 'productlist'
            }, {
                label: 'ORDERS',
                route: 'orderlist'
            }, {
                label: 'Manage Staff',
                route: ''
            }, {
                label: 'Store Setup',
                route: '',
                subMenu: [{
                    label: 'Business Setup',
                    route: 'businessSetup'
                },
                {
                    label: 'My account page',
                    route: 'myAccount'
                },
                {
                    label: 'User management page',
                    route: 'userManage'
                }]
            }, {
                label: 'Business Settings',
                route: ''
            }]
        };
    }

    componentDidMount() {
        const { props } = this;
        if (props && props.active && props.active.label) {
            this.handleClick(props.active, true);
        }
    }

    handleClick(l, noroute) {
        const list = this.state.list.map(lt => {
            lt.active = false;
            if (lt.label === l.label && !lt.subMenu) {
                lt.active = true;
                if (!noroute) {
                    this.props.toggle();
                    this.props.selected(l);
                    if (l && l.route) {
                        this.props.history.push(l.route);
                    }
                }
            }
            else if (lt.label === l.label) {
                l.active = true;
                if (noroute) {
                    l.toggle = true;
                    lt = l;
                } else {
                    lt.toggle = !lt.toggle;
                    this.props.selected(l);
                }
            }
            return lt;
        });
        this.setState({ list });
    }

    handleSubClick(l, sub) {
        const list = this.state.list.map(lt => {
            lt.active = false;
            if (lt.label === l.label) {
                l.subMenu.map(sbt => {
                    sbt.active = false;
                    if (sbt.label === sub.label) {
                        sbt.active = true;
                        this.props.selected(l);
                        this.props.toggle();
                        if (sbt && sbt.route) {
                            this.props.history.push(sbt.route);
                        }
                    }
                    return sbt;
                });
            }
            return lt;
        });
        this.setState({ list });
    }

    logout() {
        session.logout();
        this.props.history.push('');
    }

    render() {
        const store = storage.get('storeUser');
        const { Role, Email } = store;
        return (
            <div className={this.props.show ? 'navigation show' : 'navigation'}>
                <div className="menu">
                    <div className="profile">
                        <span><FcBusinessman size="24px" style={{ verticalAlign: 'middle', marginTop: '2px' }} /></span>
                        <label>{Email}
                            <i>{Role}</i>
                        </label>
                    </div>
                    <IoMdClose className="close" size="26px" onClick={() => {
                        this.props.toggle();
                    }} style={{ margin: '6px 10px 0' }} />
                    <ul className="main-nav">
                        {
                            this.state.list.map(l => {
                                return <li onClick={() => { this.handleClick(l) }} key={l.label} className={l.active ? 'active' : ''}><label>{l.label}</label>
                                    {(l.subMenu && l.toggle) &&
                                        <ul className="sub-nav">
                                            {l.toggle}
                                            {l.subMenu.map(sub => {
                                                return <li onClick={() => {
                                                    this.props.toggle();
                                                    this.handleSubClick(l, sub);
                                                }} key={sub.label} className={sub.active ? 'active' : ''}>{sub.label}</li>;
                                            })}
                                        </ul>}
                                </li>;
                            })}
                    </ul>
                    <footer>
                        <div onClick={() => this.logout()}><CgLogOff size="18px" />Logoff</div>
                        <i>Version: 1.0.0 <label>&copy; Swachh Digital</label></i>
                    </footer>
                </div>
                {this.props.show ? <div className="overlay" onClick={this.props.toggle}></div> : null}

            </div>
        );
    }
}

export default withRouter(SideNav);