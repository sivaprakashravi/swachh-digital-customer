import React from 'react';
import '../register.style.scss';
import register from '../../../services/fetchsvc.service';
import storage from '../../../services/storage-manager.service';
class StoreRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storename: '',
            address: '',
            contact: '',
            id: ''
        };

    }

    componentDidMount() {
        const data = storage.get('userToken');
        if(!data) {
            // this.props.history.go('register');
        }
    }

    async registerControl() {
        const { storename, address, contact } = this.state;
        const data = storage.get('userToken');
        const { email, localId, idToken } = JSON.parse(data);
        await this.setState({ id: this.state.storename.substring(0, 4) + this.randomString(4, '0123456789') });
        try {
            const data = {
                "StoreName": storename,
                "StoreAddress": address,
                "StoreId": this.state.id,
                "Email": email,
                "StoreContact": contact,
                "CreatedBy": localId,
                "ModifiedBy": localId,
                "LogoUrl": "",
                "Pincode": "500072",
                "UserId": localId,
                "GST": "ASDFKKPP1234",
            "TagLine": "super sales",
            "StoreTheme": "White"
            };
            const checkId = await register.get(`api/getStoreDetails/${this.state.id}`, idToken);
            const len = Object.keys(checkId).length;
            if (len < 1) {
                const dataApi = await register.post('api/createStore', JSON.stringify(data), idToken);
                await storage.put('storeUser', dataApi)
                this.props.history.push('createProduct');
            } else {
                this.registerControl()
            }

        } catch (error) {
            console.log("store register", error)
        }
    }

    //generate random value
    randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i)
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    }

    enforce_maxlength(event) {
        var t = event.target;
        if (t.hasAttribute('maxlength')) {
            t.value = t.value.slice(0, t.getAttribute('maxlength'));
        }
    }
    storeNameControls() {
        return (
            <ul>
                <li>
                    <label>Store Name:</label>
                    <input type="text" value={this.state.storename} onChange={(e) => { this.handleChange(e, 'storename') }} />
                </li>
                <li>
                    <label>Address:</label>
                    <input type={'text'} value={this.state.address} onChange={(e) => { this.handleChange(e, 'address') }} />
                </li>
                <li>
                    <label>Mobile Number</label>
                    <input type="number" min="0" max="9999999999" pattern="\d*" maxLength="10" value={this.state.contact} onChange={(e) => { this.enforce_maxlength(e); this.handleChange(e, 'contact') }} />
                </li>
                <li><button className="primary" disabled={!(this.state.storename && this.state.address && this.state.contact)} onClick={() => this.registerControl()}>Save & Continue</button></li>
            </ul>
        )
    }


    controls() {
        return (
            <div className="controls">
                {this.storeNameControls()}
            </div>)
    }

    render() {
        return (
            <div className="register">
                <h3>Enter Store Details {this.state.id}</h3>
                {this.controls()}
            </div>
        )
    }
}

export default StoreRegister;