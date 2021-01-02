import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();

    const productInfo = fakeData.find( pd => pd.key === productKey)
    console.log(productInfo);
    return (
        <div> 
            <h2>Your Product Details.</h2>
            <Product showAddToCart={false} product={productInfo}></Product> 
        </div>
    );
};

export default ProductDetail;