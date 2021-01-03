import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const grandTotal = cart[i];
        total = total + grandTotal.price * grandTotal.quantity ;
        
    }
    // const total = cart.reduce( (total, productValue) => total + productValue.price, 0);

    let shipping = 0;
    if( total > 15 && total < 35){
        shipping = 4.33;
    }
    else if( total > 35){
        shipping = 3.55;
    }
    else if( total > 0 && total < 15){
        shipping = 12.45;
    }
  

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping+ Number(tax)).toFixed(2);

    return (
        <div>
            <h3>Order summary</h3>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {Number(total.toFixed(2))}</p>
            <p><small>Tax + Vat: {tax}</small></p>
            <p><small>shipping cost: {shipping}</small></p>
            <h5>Order Total: {grandTotal}</h5>
            <br/>
           {
               props.children
           }

        </div>
    );
};

export default Cart;