import React, { useEffect, useState, useContext } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import './dashboard.style.scss';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiCheckboxLine, RiCheckboxBlankLine } from "react-icons/ri";
import { BiRupee } from "react-icons/bi";
import Carousel from 're-carousel';
import IndicatorDots from './indicators';
import storage from '../../services/storage-manager.service';
import translate from '../../locale/translate';
import fetchApi from '../../services/fetchsvc.service';
import * as _ from 'lodash';
import { store } from "./../utils/App-state-provider";

function Dashboard() {
    const initialState = {
        showActions: true,
        products: [],
        categories: [],
        productsView: []
    };
    const globalState = useContext(store);
    const [data, setData] = useState(initialState);
    useEffect(() => {
        async function fetchData() {
            var p = await fetchApi.get('getProducts?StoreId=Demo1234')
            let categories = p.map(p => p.Category);
            categories = _.uniq(categories);
            categories = categories.map(c => {
                return { label: c, enabled: true }
            });
            initialState.products = p;
            initialState.categories = categories;
            initialState.productsView = p;
            updateData(initialState);
        }
        fetchData();
    }, []);

    var updateData = (it) => {
        const {showActions, products, categories, productsView} = it;
        setData({ showActions, products, categories, productsView });
    }

    var banner = () => {
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

    var products = () => {
        const { state: { cart } } = globalState;
        const docIds = cart.map(c => c.DocId);
        return (
            <div className="product">
                <h3>Store Products</h3>
                <ul>
                    {
                        data.productsView.map((s, key) => {
                            return <li key={s.ProductName + key}>
                                <img src={s.Imageurl} alt={s.ProductName} />
                                <div className="name">{s.ProductName}</div>
                                <div className="category">{s.Category}</div>
                                <div className="primary-k">
                                    {docIds.find(d => d === s.DocId) ? 
                                    <div className="add" onClick={() => { addCart(s) }}><HiOutlineShoppingCart size="16px" /> Remove</div> : 
                                    <div className="add" onClick={() => { addCart(s) }}><HiOutlineShoppingCart size="16px" /> Add</div>}
                                    <div className="price"><BiRupee size="20px" />{s.RetailPrice}</div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }

    var addCart = (s) => {
        const { state } = globalState;
        state.cart.push(s);
        globalState.dispatch({ type: 'SET_CART', cart: state.cart });
        updateData(data);
    }

    var categoryToggle = (category) => {
        const categories = data.categories;
        const selectedCategory = categories.find(c => c === category);
        selectedCategory.enabled = !selectedCategory.enabled;
        const activeCategories = categories.filter(c => c.enabled);
        const products = data.products;
        const productsView = products.filter(p => activeCategories.find(a => a.label === p.Category));
        setData({ categories, productsView });
    }

    var filter = () => {
        return (<div className="filter">
            <h3>Categories</h3>
            <ul>
                {
                    data.categories.map((c, key) => {
                        return <li key={c.label + key} onClick={() => { categoryToggle(c) }}>
                            {!c.enabled ? <RiCheckboxBlankLine size="22px" /> : <RiCheckboxLine size="22px" />}
                            {c.label}
                        </li>
                    })
                }
            </ul>
        </div>)
    }

    return (
        <div className="dashboard">
            {banner()}
            <div className="products-view">
                {data.productsView && data.productsView.length ?
                    <>
                        {filter()}
                        {products()}
                    </>
                    : <div>No Products available</div>}
            </div>
        </div>
    );
}
export default Dashboard;