import React from "react";
import CartItem from "./CartItem";

const OrderSummary = (props) => {
    const { cartItems, deleteItemHandler } = props;
    
    return <>
        {!cartItems.length && <span>No Items Selected Go To shopping</span>}
        {!!cartItems.length && cartItems.map((cartItem) => 
            <CartItem item={cartItem} deleteItemHandler={deleteItemHandler} />
        )}
    </>
} 

export default OrderSummary;