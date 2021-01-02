import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const {img, name,seller,price,stock,key} = props.product;   

    return (
        <div className="product-item">
            <div className="product-imgPart">
                <img src={img} alt=""/>
            </div>
            <div>
               <h1 className="product-name"><Link to={"/product/"+key}>{name}</Link></h1>
               <p>by:{seller}</p>
               <br/>
               <p>${price}</p>
               <p>Only {stock} left in stock - Order in</p>
              {props.showAddToCart === true && <button
               className="cart-btn" 
               onClick={ () => props.handleCart(props.product)}
               >
               <FontAwesomeIcon icon={faShoppingCart}/>
                add to cart
                </button>}
            </div>
            
        </div>
    );
};

export default Product;