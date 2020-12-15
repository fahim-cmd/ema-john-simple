import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {                
    const first10 = fakeData.slice(0, 10);
    const [ products, setProducts] = useState(first10);

    return (
        <div className="shop-container">
            <div className="product-container">                
                {
                products.map( items => <Product product={items}></Product>)
                }
                
            </div>
            <div className="order-container">
                <h3>order summary</h3>
            </div>
           
        </div>
    );
};

export default Shop;