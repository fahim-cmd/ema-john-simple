import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    // console.log(props.product);
    const {img, name,seller,price,stock} = props.product;

    return (
        <div className="product-item">
            <div className="product-imgPart">
                <img src={img} alt=""/>
            </div>
            <div>
               <h1 className="product-name">{name}</h1>
               <p>by:{seller}</p>
               <br/>
               <p>${price}</p>
               <p>Only {stock} left in stock - Order in</p>
               <button className="cart-btn" onClick={ () => props.handleCart(props.product)}>  <FontAwesomeIcon icon={faShoppingCart}/> add to cart</button>
            </div>
            
        </div>
    );
};

export default Product;