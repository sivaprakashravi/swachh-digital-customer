import React from 'react';
import './productList.style.scss';

const ItemScreen = (props) => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('')
    const { data } = props
    return (
        <div className="row-view" >
            <div >
                <img src={data} alt="product" width="100" height="100" />
            </div>
            <input type="text" placeholder="Product Name" /><br />
            <input type="text" placeholder="price" /><br />
        </div>

    )
}

export default ItemScreen;