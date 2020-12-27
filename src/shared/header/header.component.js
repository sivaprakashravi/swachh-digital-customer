import React from 'react';
import { IoMdMenu, IoMdClose } from "react-icons/io";
import './header.style.scss';
import SideNav from './../side-navigation/side-navigation.component';
import storage from '../../services/storage-manager.service';
import translate from '../../locale/translate';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNav: false,
            activeNav: {}
        };
    }

   componentDidMount(){
    const store = storage.get('storeUser');
    const { StoreName } = store;
    this.setState({ StoreName });
   }

    toggleNav(self) {
        self.setState({ showNav: !self.state.showNav })
    }
    updateNavSelection(e) {
        this.setState({activeNav: e});
    }
    render() {
        const self = this;
        const {StoreName} = self.state
        return (
            <div className="header">
                {
                    self.state.showNav ?
                        <IoMdClose size="26px" onClick={() => { self.setState({ showNav: false }) }} style={{ margin: '6px 10px 0' }} /> :
                        <IoMdMenu size="26px" onClick={() => { self.setState({ showNav: true }) }} style={{ margin: '6px 10px 0' }} />
                }
                <span>{translate("HIUSERNAME",{name:StoreName})} {self.state.showNav} </span>
                {self.state.showNav ? <SideNav selected={(e) => {
                    self.updateNavSelection(e)
                }} active={self.state.activeNav} show={self.state.showNav} toggle={() => {
                    self.toggleNav(self)
                }} /> : null }
            </div>
        );
    }
}

export default Header;