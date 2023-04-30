import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./component/common/Layout";
import ProductItems from './component/ProductItems';
import UserCart from "./component/UserCart";
import authContext from './Context/authContext';

const dummuyItems = [
  {
    id: 1,
    name: "Electronic Car",
    price: 1000,
    packagingCharges: 0,
    deliveryCharge: 0,
    discount: 5,
    category: "Test",
    isCartItem: false
  },
  {
    id: 2,
    name: "teddy Bear",
    price: 750,
    packagingCharges: 0,
    deliveryCharge: 0,
    discount: 5,
    category: "Test",
    isCartItem: false
  },
  {
    id: 3,
    name: "Bag",
    price: 1200,
    packagingCharges: 0,
    deliveryCharge: 0,
    discount: 0,
    category: "Test",
    isCartItem: false
  },
  {
    id: 4,
    name: "Baby Bed",
    price: 3600,
    packagingCharges: 0,
    deliveryCharge: 0,
    discount: 10,
    category: "Test",
    isCartItem: false
  },
  {
    id: 5,
    name: "Chocolates",
    price: 410,
    packagingCharges: 0,
    deliveryCharge: 0,
    discount: 0,
    category: "Test",
    isCartItem: false
  }
];

function App() {
  const [products, setProducts] = useState(dummuyItems);
  const UserContext = createContext();

  useEffect(() => {
    setProducts(() => [...products]);
  }, []);

  const addToCartHandler = (item) => {
    const tempProducts = products.map((product) => {
      if(item.id == product.id) {
        product.isCartItem = true;
      }
      return product;
    }); 

    setProducts(() => [...tempProducts]);
  }

  const deleteToCartHandler = (item) => {
    const tempProducts = products.map((product) => {
      if(item.id == product.id) {
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
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      </authContext.Provider>
  );
}

export default App;