import React, { useEffect, useState } from "react";
import { getCartValues } from '../../commonUtils';

const CartSummary = (props) => {
    const { cartItems } = props;
    const [summary, setSummary] = useState({});
    const [finalTotal, setFinalTotal] = useState(0);


    useEffect(() => {
        // const TotalValue = cartItems.reduce((x, y) => x + y.price, 0);
        // const discount = cartItems.reduce((x, y) => x + (y.price * y.discount) / 100, 0);
        // const packageCharges = cartItems.reduce((x, y) => x + y.packagingCharges, 0);
        // const deliveryCharge = cartItems.reduce((x, y) => x + y.deliveryCharge, 0);

        const cartSummary = getCartValues(cartItems);

        setSummary(cartSummary)

        setFinalTotal(cartSummary.finalCartValue);
    }, [cartItems]);

    return <div className="col-md-4 summary">
        <div><h5><b>PRICE DETAILS</b></h5></div>
        <hr />
        <div className="row">
            <div className="col total-items">Price ({cartItems.length} ITEMS)</div>
            <div className="col text-right">&#8377; {summary.cartTotalValue}</div>
        </div>
        <div className="row">
            <div className="col total-items">Discount</div>
            <div className="col text-right discount-price">- &#8377; {summary.totalDiscount}</div>
        </div>
        <div className="row">
            <div className="col total-items">Delivery Charges</div>
            {!summary.totalDeliveryCharges && <div className="col text-right discount-price"> Free </div>}
            {summary.totalDeliveryCharges > 0 && <div className="col text-right">&#8377; {summary.totalDeliveryCharges}</div>}
        </div>
        <div className="row">
            <div className="col total-items">Secured Packaging Fee</div>
            <div className="col text-right">&#8377; {summary.packagingCharges}</div>
        </div>
        <div className="row price-display">
            <div className="col total-items">TOTAL PRICE</div>
            <div className="col text-right">&#8377; {finalTotal}</div>
        </div>
        <button className="btn btn-primary">CHECKOUT</button>
    </div>
}

export default CartSummary;