import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./component/common/Layout";
import ProductItems from './component/ProductItems';
import UserCart from "./component/UserCart";
import authContext from './Context/authContext';
import { DUMMY_CAR_LIST } from './constants';
import UserPurchaseSummary from './component/UserPurchaseSummary';


function App() {
  const [products, setProducts] = useState(DUMMY_CAR_LIST);

  useEffect(() => {
    setProducts(() => [...products]);
  }, []);

  const addToCartHandler = (item) => {
    const tempProducts = products.map((product) => {
      if(item.id === product.id) {
        product.isCartItem = true;
      }
      return product;
    }); 

    setProducts(() => [...tempProducts]);
  }

  const deleteToCartHandler = (item) => {
    const tempProducts = products.map((product) => {
      if(item.id === product.id) {
        product.isCartItem = false;
      }
      return product;
    }); 

    setProducts(() => [...tempProducts]);
  }

  return (
    <authContext.Provider value={{addToCartHandler:addToCartHandler, deleteToCartHandler:deleteToCartHandler}}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}> 
              <Route index element={<ProductItems products={products} />} />
              <Route path="cart" element={<UserCart />} />
              <Route path="summary" element={<UserPurchaseSummary />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      </authContext.Provider>
  );
}

export default App;