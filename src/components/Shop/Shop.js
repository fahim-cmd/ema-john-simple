import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {                
    const first10 = fakeData.slice(0, 10);
    const [ products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const handleCart = (product) => {
               
        
        const newCart =  [...cart,product]
        setCart(newCart);
    }

    return (
        <div className="shop-container">
            <div className="product-container">                
                {
                products.map( items => <Product handleCart={handleCart} product={items}></Product>)
                }
                
            </div>
            <div className="order-container">
                <Cart cart={cart}></Cart>
            </div>
           
        </div>
    );
};

export default Shop;