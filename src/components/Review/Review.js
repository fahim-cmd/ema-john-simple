import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import  happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = (props) => {
   
    const [cart, setCart] = useState([]);
    const  [placeOrder, setPlaceOrder] = useState(false);

    const history = useHistory()
    const handleProceedCheckout = () => {
        history.push('/shipment');
    }

    const  removeProduct = (productKey) => {
        const newCart = cart.filter( pd => pd.key !== productKey );
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    useEffect(()=>{
        //cart
        const saveCart =  getDatabaseCart()
        const productKeys = Object.keys(saveCart);

        const cartProducts = productKeys.map  ( key => {
            const product = fakeData.find ( pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        })
        setCart (cartProducts);
        
    }, [])

    let thankYou;
    if ( placeOrder){
        thankYou = <img src={happyImage}/>
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map( pd => <ReviewItems removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItems>)
                }
               {
                   thankYou
               }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    {
                        <button onClick={handleProceedCheckout} className="cart-btn"> Proceed checkout</button>
                    }
                </Cart>
            </div>
            
          
        </div>
    );
};

export default Review;