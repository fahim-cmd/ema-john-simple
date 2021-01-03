import React from 'react';

const ReviewItems = (props) => {
    const {name,quantity,key,price} = props.product;
    const reviewItemsStyle = {
        marginLeft: " 120px",
        marginRight: " 120px",
        borderBottom: " 1px solid lightgray",
        marginBottom: " 35px",
        paddingBottom: " 15px"
    }
    return (
        <div style={reviewItemsStyle}>
            <h4 className="product-name">{name}</h4>
            <p> Quintity : {quantity}</p>
            <p><small>${price}</small></p>
            <button onClick={() => props.removeProduct(key)} className="cart-btn">Remove item</button>
        </div>
    );
};

export default ReviewItems;