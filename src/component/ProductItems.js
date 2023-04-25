import React, { useState } from 'react';
import ProductItem from './ProductItem';

function ProductItems({products, addToCartHandler = () => {}}) {
  return <div className="container">
          <div className="row">
            {products && products.map((item, index) => <ProductItem item={item} key={index} addToCartHandler={addToCartHandler} />)}
          </div>
        </div>;
}

export default ProductItems;