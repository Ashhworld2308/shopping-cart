import React, {useState, useEffect} from 'react';
import ProductItem from './ProductItem';

function ProductItems({products}) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(() => products);

  useEffect(() => {
    setFilteredProducts(filteredProducts);
  }, [products, filteredProducts]);

  const onSearchFilterHandler = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    
    const tempProducts = products.filter((item) => {
      if (item.name.toLowerCase().includes(value.toLowerCase())) { return item; }
    });

    setFilteredProducts(() => tempProducts);
  }
  return (<div className="container">
          <div className="row">
            <input type="text" name="search" placeholder="Serch Products" value={searchValue} 
            onChange={(event) => onSearchFilterHandler(event)} />
          </div>
          <div className="row">
            {!filteredProducts.length && <label>No Products Available</label>}
            {!!filteredProducts && filteredProducts.map((item, index) => <ProductItem item={item} key={index} />)}
          </div>
        </div>);
}

export default ProductItems;