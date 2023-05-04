import React, {useState, useEffect, Suspense, lazy} from 'react';
const ProductItem = lazy(() => import("./ProductItem"));

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
      return item.name.toLowerCase().includes(value.toLowerCase()) && item;
    });

    setFilteredProducts(() => tempProducts);
  }
  return (<div className="container">
          <div className="row">
            <input type="text" name="search" placeholder="Serch Products" value={searchValue} 
            onChange={(event) => onSearchFilterHandler(event)} />
          </div>
          <div className="row">
          <Suspense fallback={<div>Loading...</div>}>
            {!filteredProducts.length && <label>No Products Available</label>}
            {!!filteredProducts && filteredProducts.map((item, index) => <ProductItem item={item} key={index} />)}
          </Suspense>
          </div>
        </div>);
}

export default ProductItems;