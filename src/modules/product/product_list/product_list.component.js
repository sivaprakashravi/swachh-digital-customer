import React from 'react';
import { Listview } from './list_view.component';
import fetchservices from '../../../services/fetchsvc.service';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from "react-icons/io";
import Toast from '../../../components/toast/toast.component';
import ReactDOM from 'react-dom';

import storage from '../../../services/storage-manager.service';
export class ProductListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isSearch: false,
            searchText: ''
        }
    }

    async getProducts() {
        try {
            const store = storage.get('storeUser');
            const { StoreId } = store;
            const data = await fetchservices.get(`api/getProducts/${StoreId}`);
            this.setState({ list: data });
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {
        this.getProducts();
    }

    async deleteProduct(id) {
        try {
            const store = storage.get('storeUser');
            const userId = storage.get('userToken');
            const { email, localId, idToken } = userId;
            const { StoreId } = store;
            const list = JSON.stringify({
                "DocId": id
            })
            const deleteApi = await fetchservices.post('api/deleteProduct', list);
            ReactDOM.render(<Toast message="Deleted Product" />, document.getElementById('dom'));
            this.getProducts()
        } catch (error) {

        }
    }

    async editProduct(values) {
        console.log("values", values)
        try {
            const store = storage.get('storeUser');
            const userId = storage.get('userToken');
            const { email, localId, idToken } = userId;
            const { StoreId } = store;
            const list = {
                "DocId": values.DocId, "Brands": "",
                "Category": values.categoryName,
                "SubCategory": "",
                "ImageUrl": values.fileUrl,
                "IsActive": values.active,
                "IsOffer": false,
                "ProductCode": "",
                "ProductName": values.name,
                "ProductDesc": "",
                "RetailPrice": values.price,
                "Offer_Price": 0, "StoreId": StoreId, "ModifiedBy": localId
            }
            const editApi = await fetchservices.post('api/updateProduct', list);
            ReactDOM.render(<Toast message="Product Updated Successfully" />, document.getElementById('dom'));
            this.getProducts()
        } catch (error) {
            console.log(error);
        }
    }

    noList() {
        return (<div className="no-list"><label>No Products Found</label><button className="primary" onClick={() => {
            this.props.history.push('CreateProduct');
        }}>Add a Product</button></div>)
    }
    render() {
        let list = this.state.list && this.state.list.length ? this.state.list.map((x, index) => {
            return (
                <Listview data={x} key={index} nav={this.props.history} edit={this.editProduct} delete={this.deleteProduct} />
            )
        }) : this.noList();
        return (
            <div className="products">
                {this.state.list && this.state.list.length ? <div className="sub-header"><RiArrowGoBackLine onClick={this.props.history.goBack} className="icon" size="22px" />
                    {this.state.isSearch ? <input type="text" value={this.state.searchText} placeholder="Search..." /> : <label>Products List</label>}
                    {this.state.isSearch ? <IoMdClose className="search" size="22px" onClick={() => this.setState({ isSearch: false, searchText: '' })} /> : <BsSearch className="search" size="22px" onClick={() => this.setState({ isSearch: true, searchText: '' })} />}
                </div> : null}
                {list}
            </div>
        )
    }
}
