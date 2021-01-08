import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import './dashboard.style.scss';
import { IoMdClose } from "react-icons/io";
import { RiCheckboxLine, RiCheckboxBlankLine } from "react-icons/ri";
import { BiRupee } from "react-icons/bi";
import Carousel from 're-carousel';
import IndicatorDots from './indicators';
import storage from '../../services/storage-manager.service';
import translate from '../../locale/translate';
import fetchApi from '../../services/fetchsvc.service';
import * as _ from 'lodash';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showActions: true,
            products: [],
            categories: [],
            productsView: []
        };
    }

    async componentDidMount() {
        const products = await fetchApi.get('getProducts?StoreId=Demo1234');
        let categories = products.map(p => p.Category);
        categories = _.uniq(categories);
        categories = categories.map(c => {
            return { label: c, enabled: true }
        });
        this.setState({ products, categories, productsView: products });

    }

    banner() {
        const carousel = ['frame1', 'frame2', 'frame3'];
        return (
            <div className="scroll-banner">
                <Carousel loop={true} auto={true} widgets={[IndicatorDots]}>
                    {carousel.map(s => {
                        // android_asset/www -> for android build
                        return <div key={s} className="scroll-item frame" style={{ 'backgroundImage': `url(/images/banner/${s}.jpg)` }}></div>
                    })}
                </Carousel>
            </div>
        )
    }

    products() {
        return (
            <div className="product">
                <h3>Store Products</h3>
                <ul>
                    {
                        this.state.productsView.map((s, key) => {
                            return <li key={s.ProductName + key}>
                                <img src={s.Imageurl} alt={s.ProductName} />
                                <div className="name">{s.ProductName}</div>
                                <div className="category">{s.Category}</div>
                                <div className="primary-k">                                    
                                    <div className="add">Add to cart</div>
                                    <div className="price"><BiRupee size="20px" />{s.RetailPrice}</div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }

    categoryToggle(category) {
        const categories = this.state.categories;
        const selectedCategory = categories.find(c => c === category);
        selectedCategory.enabled = !selectedCategory.enabled;
        const activeCategories = categories.filter(c => c.enabled);
        const products = this.state.products;
        const productsView = products.filter(p => activeCategories.find(a => a.label === p.Category));
        this.setState({ categories, productsView });
    }

    filter() {
        return (<div className="filter">
            <h3>Categories</h3>
            <ul>
                {
                    this.state.categories.map((c, key) => {
                        return <li key={c.label + key} onClick={() => { this.categoryToggle(c) }}>
                            {!c.enabled ? <RiCheckboxBlankLine size="22px" /> : <RiCheckboxLine size="22px" />}
                            {c.label}
                        </li>
                    })
                }
            </ul>
        </div>)
    }

    render() {
        return (
            <div className="dashboard">
                {this.banner()}
                <div className="products-view">
                    {this.state.productsView && this.state.productsView.length ?
                        <>
                            {this.filter()}
                            {this.products()}
                        </>
                        : <div>No Products available</div>}
                </div>
            </div>
        );
    }
}

export default Dashboard;