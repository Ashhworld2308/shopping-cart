import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { storeItemCartReducer } from "./store";
import Layout from "./component/common/Layout";
import ProductItems from './component/ProductItems';
import UserCart from "./component/UserCart";

const dummuyItems = [
  {
    id: 1,
    name: "Electronic Car",
    price: 10,
    category: "Test",
    isCartItem: false
  },
  {
    id: 2,
    name: "teddy Bear",
    price: 100,
    category: "Test",
    isCartItem: false
  },
  {
    id: 3,
    name: "Bag",
    price: 110,
    category: "Test",
    isCartItem: false
  },
  {
    id: 4,
    name: "Baby Bed",
    price: 210,
    category: "Test",
    isCartItem: false
  },
  {
    id: 5,
    name: "Chocolates",
    price: 410,
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
    <UserContext.Provider addToCartHandler={addToCartHandler} deleteToCartHandler={deleteToCartHandler}>
      <Provider store={storeItemCartReducer}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}> 
              <Route index element={<ProductItems products={products} />} />
              <Route path="cart" element={<UserCart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      </UserContext.Provider>
  );
}

export default App;