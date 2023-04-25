import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem } from "../actions/cartAction";
import { Link } from "react-router-dom";

import "./components.css";

const UserCart = () => {
  const {deleteToCartHandler:deleteCartHandler } = useContext(UserContext);

  const cartItems = useSelector((state) => state);
  const dispatch = useDispatch();
  const [cartTotalValue, setCartTotalValue] = useState(0)

  useEffect(() => {
    const cartTotalValue = cartItems.reduce((x, y) => {
        return x + y.price;
      }, 0);
      setCartTotalValue(cartTotalValue);
  }, [cartItems]);

  const deleteItemHandler = (cartItem) => {
    dispatch(deleteItem(cartItem));
    deleteCartHandler(cartItem);
  }

  return (
    <div className="card">
            <div className="row">
                <div className="col-md-8 cart">
                    <div className="title">
                        <div className="row">
                            <div className="col"><h4><b>Shopping Cart</b></h4></div>
                            <div className="col align-self-center text-right text-muted">{cartItems.length} items</div>
                        </div>
                    </div>
                    {!cartItems.length && <span>No Items Selected Go To shopping</span>}
                    {!!cartItems.length && cartItems.map((cartItem) => 
                      <div className="row border border-top border-bottom display-container" key={cartItem.id}>
                          <div className="row main align-items-center display-container">
                              <div className="col-sm-2"><img className="img-fluid" src="https://placehold.it/150x80?text=IMAGE" /></div>
                              <div className="col">
                                  <div className="row text-muted">{cartItem.name}</div>
                              </div>
                              <div className="col">
                                  <a href="#" className="border">1</a>
                              </div>
                              <div className="col">&euro; {cartItem.price}
                                <button type="button" className="btn btn-link close" 
                                  onClick={() => deleteItemHandler(cartItem)}>&#10005;</button>
                              </div>
                          </div>
                      </div>
                    )}
                    <div className="back-to-shop"><Link to="/"><span className="text-muted">Back to shop</span></Link></div>
                </div>
                <div className="col-md-4 summary">
                    <div><h5><b>Summary</b></h5></div>
                    <hr/>
                    <div className="row">
                        <div className="col total-items">ITEMS {cartItems.length}</div>
                        <div className="col text-right">&euro; {cartTotalValue}</div>
                    </div>
                    <div className="row price-display">
                        <div className="col">TOTAL PRICE</div>
                        <div className="col text-right">&euro; {cartTotalValue}</div>
                    </div>
                    <button className="btn btn-primary">CHECKOUT</button>
                </div>
            </div>
            
        </div>
  );
};

export default UserCart;