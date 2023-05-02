import React, { useEffect, useState, useContext, userContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, updateItemsQuntity } from "../actions/cartAction";
import { Link } from "react-router-dom";
import authContext from '../Context/authContext';

import "./components.css";
import CartSummary from "./cartDetails/CartSummary";
import OrderSummary from "./cartDetails/OrderSummary";
import AddressDetails from "./cartDetails/AddressDetails";
import PaymentOption from "./cartDetails/PaymentOption";

const CART_DETAILS = { 
  addressDetails: {},
  orderSummary: {},
  paymentDetails: {}
}

const UserCart = () => {
  const { deleteToCartHandler: deleteCartHandler } = useContext(authContext);
  const [finalCheckoutResult, setFinalCheckoutResult] = useState(() => CART_DETAILS);

  const cartItems = useSelector((state) => state);
  const dispatch = useDispatch();

  const deleteItemHandler = (cartItem) => {
    dispatch(deleteItem(cartItem));
    deleteCartHandler(cartItem);
  }

  const onSaveAddressHandler = (data) => {
    finalCheckoutResult.addressDetails = data;
    setFinalCheckoutResult(() => finalCheckoutResult);
  }

  const onOrderSummarySaved = (data) => {
    finalCheckoutResult.orderSummary = data;
    setFinalCheckoutResult((prevStat) => { return {...prevStat, orderSummary: finalCheckoutResult.orderSummary}});
  }

  const onPaymentDetailUpdate = (paymentOptions) => {
    finalCheckoutResult.paymentDetails = paymentOptions;
    setFinalCheckoutResult((prevStat) => { return {...prevStat, paymentDetails: finalCheckoutResult.paymentDetails}});
  }

  const onUpdateItemQuantity = (e, item) => {
    const buttonType = e.target.id;
    dispatch(updateItemsQuntity(item, buttonType));
  }

  const onCheckout = () => {
    console.log("finalCheckoutResult: ", finalCheckoutResult);
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
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item" key="deliveryAddress">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                  data-bs-target="#deliveryAddress" aria-expanded="false" aria-controls="flush-collapseOne">
                  DELIVERY ADDRESS
                </button>
              </h2>
              <div id="deliveryAddress" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <AddressDetails onSaveAddressHandler={onSaveAddressHandler} />
                </div>
              </div>
            </div>
            <div className="accordion-item" key="orderSummary">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#orderSummary" aria-expanded="false" aria-controls="flush-collapseOne">
                  ORDER SUMMARY
                </button>
              </h2>
              <div id="orderSummary" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <OrderSummary cartItems={cartItems} deleteItemHandler={deleteItemHandler} onUpdateItemQuantity={onUpdateItemQuantity} onOrderSummarySaved={onOrderSummarySaved} />
                </div>
              </div>
            </div>
            <div className="accordion-item" key="paymentOption">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#paymentOption" aria-expanded="false" aria-controls="flush-collapseOne">
                  PAYMENT OPTIONS
                </button>
              </h2>
              <div id="paymentOption" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <PaymentOption cartItems={cartItems} onCheckout={onCheckout} onPaymentDetailUpdate={onPaymentDetailUpdate} />
                </div>
              </div>
            </div>
          </div>
          <div className="back-to-shop">
            <Link to="/"><span className="text-muted">Back to shop</span></Link>
            <button className="btn btn-lg btn-primary" type="button" onClick={onCheckout}>CHECKOUT</button>
          </div>
        </div>
        <CartSummary cartItems={cartItems} />
      </div>

    </div>
  );
};

export default UserCart;