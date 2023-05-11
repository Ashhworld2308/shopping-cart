import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, updateItemsQuntity } from "../actions/cartAction";
import { Link } from "react-router-dom";
import authContext from '../Context/authContext';

import "./components.css";
import CartSummary from "./cartDetails/CartSummary";
import OrderSummary from "./cartDetails/OrderSummary";
import AddressDetails from "./cartDetails/AddressDetails";
import PaymentOption from "./cartDetails/PaymentOption";
import userCartContext from "../Context/userCartContext";
import { useNavigate } from "react-router-dom/dist";

const CART_DETAILS = {
  addressDetails: {},
  orderSummary: {},
  paymentDetails: {}
}

const CART_OPTIONS = {
  deliveryAddress: {
    isShow: true
  },
  orderSummary: {
    isShow: false
  },
  paymentOptions: {
    isShow: false
  }
}

const UserCart = () => {
  const { deleteToCartHandler: deleteCartHandler } = useContext(authContext);
  const [finalCheckoutResult, setFinalCheckoutResult] = useState(() => CART_DETAILS);
  const [cartOptions, setCartOptions] = useState(CART_OPTIONS);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);


  const cartItems = useSelector((state) => state);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const deleteItemHandler = (cartItem) => {
    dispatch(deleteItem(cartItem));
    deleteCartHandler(cartItem);
  }

  const onSaveAddressHandler = (data) => {
    cartOptions.deliveryAddress.isShow = false;
    cartOptions.orderSummary.isShow = true;

    setCartOptions(() => cartOptions);

    finalCheckoutResult.addressDetails = data;
    setFinalCheckoutResult(() => finalCheckoutResult);
    forceUpdate();
  }

  const onOrderSummarySaved = (data) => {
    cartOptions.orderSummary.isShow = false;
    cartOptions.paymentOptions.isShow = true;
    setCartOptions(() => cartOptions);

    finalCheckoutResult.orderSummary = data;
    setFinalCheckoutResult((prevStat) => { return { ...prevStat, orderSummary: finalCheckoutResult.orderSummary } });
    forceUpdate();
  }

  const onPaymentDetailUpdate = (paymentOptions) => {
    finalCheckoutResult.paymentDetails = paymentOptions;
    setFinalCheckoutResult((prevStat) => { return { ...prevStat, paymentDetails: paymentOptions } });
  }

  const onUpdateItemQuantity = (e, item) => {
    const buttonType = e.target.id;
    dispatch(updateItemsQuntity(item, buttonType));
  }

  const onCheckout = (event, paymentData) => {
    console.log("finalCheckoutResult: ", finalCheckoutResult);
    localStorage.setItem("user_checkout_summary", JSON.stringify(finalCheckoutResult));
    navigate("/summary");
  }

  const goToPreviousStep = (event, currenStep, PrevStep) => {
    cartOptions[PrevStep].isShow = true;
    cartOptions[currenStep].isShow = false;
    setCartOptions(() => cartOptions);
    forceUpdate();
  }

  return (
    <userCartContext.Provider value={{onCheckout: onCheckout, onPaymentDetailUpdate: onPaymentDetailUpdate}}>
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
                  <button className={`accordion-button ${!cartOptions.deliveryAddress.isShow ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse"
                    data-bs-target="#deliveryAddress" onClick={(e) => onSaveAddressHandler(e)} disabled>
                    DELIVERY ADDRESS
                  </button>
                </h2>
                <div id="deliveryAddress" className={`accordion-collapse collapse ${cartOptions.deliveryAddress.isShow ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    <AddressDetails onSaveAddressHandler={onSaveAddressHandler} />
                  </div>
                </div>
              </div>
              <div className="accordion-item" key="orderSummary">
                <h2 className="accordion-header">
                  <button className={`accordion-button ${!cartOptions.orderSummary.isShow ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse"
                    data-bs-target="#orderSummary" disabled>
                    ORDER SUMMARY
                  </button>
                </h2>
                <div id="orderSummary" className={`accordion-collapse collapse ${cartOptions.orderSummary.isShow ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    <OrderSummary cartItems={cartItems} deleteItemHandler={deleteItemHandler} onUpdateItemQuantity={onUpdateItemQuantity} 
                    onOrderSummarySaved={onOrderSummarySaved} goToPreviousStep={goToPreviousStep} />
                  </div>
                </div>
              </div>
              <div className="accordion-item" key="paymentOption">
                <h2 className="accordion-header">
                  <button className={`accordion-button ${!cartOptions.paymentOptions.isShow ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse"
                    data-bs-target="#paymentOption" disabled>
                    PAYMENT OPTIONS
                  </button>
                </h2>
                <div id="paymentOption" className={`accordion-collapse collapse ${cartOptions.paymentOptions.isShow ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    <PaymentOption cartItems={cartItems} goToPreviousStep={goToPreviousStep} />
                  </div>
                </div>
              </div>
            </div>
            <div className="back-to-shop">
              <Link to="/"><span className="text-muted">Back to shop</span></Link>
              {/* <button className="btn btn-lg btn-primary" type="button" onClick={onCheckout}>CHECKOUT</button> */}
            </div>
          </div>
          <CartSummary cartItems={cartItems} />
        </div>

      </div>
    </userCartContext.Provider>
  );
};

export default UserCart;