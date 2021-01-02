import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItems from '../ReviewItems/ReviewItems';

const Review = () => {
    const [cart, setCart] = useState([]);

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

    return (
        <div>
            <h1> My name is review {cart.length}</h1>
            {
                cart.map( pd => <ReviewItems key={pd.key} product={pd}></ReviewItems>)
            }
        </div>
    );
};

export default Review;