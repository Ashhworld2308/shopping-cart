import React from "react";
import CartItem from "./CartItem";

const OrderSummary = (props) => {
    const { cartItems, deleteItemHandler, onUpdateItemQuantity, onOrderSummarySaved, goToPreviousStep } = props;
    return <>
        {!cartItems.length && <span>No Items Selected Go To shopping</span>}
        {!!cartItems.length && <>
            {cartItems.map((cartItem) => 
                <CartItem item={cartItem} deleteItemHandler={deleteItemHandler} onUpdateQuantity={onUpdateItemQuantity} />
            )}
            <div>
                <button type="button" className="btn btn-primary" onClick={(e) => onOrderSummarySaved(cartItems)}>
                    Proceed to PAYMENT
                </button>
                <button className="btn btn-sm btn-secondary" type="button"
                onClick={(e) => goToPreviousStep(e, "orderSummary", "deliveryAddress")}>
                Go To Address Details
            </button>
            </div>
        </>
        }
    </>
}

export default OrderSummary;