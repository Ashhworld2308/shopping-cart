import React, { useEffect, useState, useContext, userContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem } from "../actions/cartAction";
import { Link } from "react-router-dom";
import authContext from '../Context/authContext';
import CartItem from "./cartDetails/CartItem";


import "./components.css";
import CartSummary from "./cartDetails/CartSummary";
import OrderSummary from "./cartDetails/OrderSummary";
import AddressDetails from "./cartDetails/AddressDetails";
import PaymentOption from "./cartDetails/PaymentOption";

const UserCart = () => {
  const {deleteToCartHandler:deleteCartHandler } = useContext(authContext);

  const cartItems = useSelector((state) => state);
  const dispatch = useDispatch();

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
                            <div className="col align-self-center"><h4><b>Shopping Cart</b></h4></div>
                            <div className="col align-self-center text-right text-muted">{cartItems.length} items</div>
                        </div>
                    </div>
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                      <div class="accordion-item">
                        <h2 class="accordion-header">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            DELIVERY ADDRESS
                          </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                          <div class="accordion-body">
                            <AddressDetails />
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            ORDER SUMMARY
                          </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                          <div class="accordion-body">
                            <OrderSummary cartItems={cartItems} deleteItemHandler={deleteItemHandler} />
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            PAYMENT OPTIONS
                          </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                          <div class="accordion-body">
                            <PaymentOption cartItems={cartItems} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="back-to-shop"><Link to="/"><span className="text-muted">Back to shop</span></Link></div>
                </div>
                <CartSummary cartItems={cartItems} />
            </div>
            
        </div>
  );
};

export default UserCart;