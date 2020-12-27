import React from "react";
import ReactDOM from 'react-dom';
import './business.style.scss';
import fetchService from '../../../services/fetchsvc.service';
import storage from '../../../services/storage-manager.service';
import { RiArrowGoBackLine } from 'react-icons/ri';
import Toast from '../../../components/toast/toast.component';

export class BusinessSetupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            StoreName: '',
            TagLine: '',
            PhoneNbr: '',
            StoreAddress: '',
            GST: '',
            Pincode: '',
            DocId: ''
        }
    }

    componentDidMount() {
        this.getStore();
    }
    async getStore() {
        const store = storage.get('storeUser');
        const { StoreId } = store
        const dataAPi = await fetchService.get(`api/getStoreDetails/${StoreId}`);
        console.log("dataP", dataAPi);
        const { DocId, StoreAddress, StoreName, PhoneNbr, Pincode, GST, TagLine } = await dataAPi;
        this.setState({ DocId, StoreAddress, StoreName, PhoneNbr, Pincode, GST, TagLine })
    };
    handleChange(event, stateVariable) {
        this.setState({ [stateVariable]: event.target.value });
    };

    async handleSubmit() {
        try {
            const { StoreName, TagLine, PhoneNbr, StoreAddress, GST, Pincode, DocId } = this.state;
            const user = storage.get('userToken');
            const { localId } = user
            const data = {
                "DocId": DocId,
                "StoreName": StoreName,
                "StoreAddress": StoreAddress,
                "StoreContact": PhoneNbr,
                "Pincode": Pincode,
                "GST": GST,
                "TagLine": TagLine,
                "StoreTheme": "White",
                "ModifiedBy": localId
            };
            const dataAPi = await fetchService.post('api/editStoreInfo', data);
            ReactDOM.render(<Toast message="Update Store Details!" />, document.getElementById('dom'));
        } catch (error) {
            console.log(error);
        }
    }
    inputController() {
        const { StoreName, TagLine, PhoneNbr, StoreAddress, GST, Pincode } = this.state
        return (
            <div className="input">
                <ul>
                    <li>
                        <label>Store Name:</label>
                        <input type="text" value={StoreName} onChange={(e) => { this.handleChange(e, 'StoreName') }} />
                    </li>
                    <li>
                        <label>Tag Line:</label>
                        <input type="text" value={TagLine} onChange={(e) => { this.handleChange(e, 'TagLine') }} />
                    </li>
                    <li>
                        <label>PhoneNbr:</label>
                        <input type="text" value={PhoneNbr} onChange={(e) => { this.handleChange(e, 'PhoneNbr') }} />
                    </li>
                    <li>
                        <label>StoreAddress:</label>
                        <input type="text" value={StoreAddress} onChange={(e) => { this.handleChange(e, 'StoreAddress') }} />
                    </li>
                    <li>
                        <label>Pincode:</label>
                        <input type="text" value={Pincode} onChange={(e) => { this.handleChange(e, 'Pincode') }} />
                    </li>
                    <li>
                        <label>GST Number:</label>
                        <input type="text" value={GST} onChange={(e) => { this.handleChange(e, 'GST') }} />
                    </li>
                    <li
                        onClick={() => { }} className="privacy">Privacy & return policy
                    </li>
                   <li><button onClick={() => this.handleSubmit()} className="primary">SAVE</button></li>
                </ul>
            </div>
        )
    }
    render() {
        return (
            <div className="business-setup">
                <div className="sub-header">
                    <RiArrowGoBackLine onClick={this.props.history.goBack} className="icon" size="22px" />
                    <label>Business setup</label>
                </div>
                {this.inputController()}
            </div>
        )
    }
}