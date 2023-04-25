import React from 'react';
import ProductItem from './ProductItem';

function ProductItems({products}) {
  return <div className="container">
          <div className="row">
            {products && products.map((item, index) => <ProductItem item={item} key={index} />)}
          </div>
        </div>;
}

export default ProductItems;