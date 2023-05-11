import React, { useEffect, useState } from "react";
import { PAYMENT_TYPE_TITLE } from "../constants";
import { getCartValues } from "../commonUtils";

const UserPurchaseSummary = (props) => {
    const PurchaseSummary = JSON.parse(localStorage.getItem("user_checkout_summary"));
    const [cartValue, getCartValue] = useState(0);

    console.log("PurchaseSummary", PurchaseSummary);
    useEffect(() => {
        const TotalValue = PurchaseSummary.orderSummary.reduce((x, y) => x + y.totalPrice, 0);

        getCartValue(TotalValue);
    }, []);

    const onPlaceOrder = () => {

    }

    return <>
        <div className="row">
            <div className="col-lg-12">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div className="row">
                            <div className="col-md-6"><b>1 Delivery Address</b></div>
                            <div className="col-md-6">
                                <p>{PurchaseSummary.addressDetails.name}</p>
                                <h6>{PurchaseSummary.addressDetails.address}</h6>
                                <h6>{PurchaseSummary.addressDetails.locality},{PurchaseSummary.addressDetails.landmark}</h6>
                                <h6>{PurchaseSummary.addressDetails.city}, {PurchaseSummary.addressDetails.state} {PurchaseSummary.addressDetails.pincode}</h6>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div className="row">
                            <div className="col-md-6"><b>2 Selected Payment Method</b></div>
                            <div className="col-md-6">
                                <p>{PAYMENT_TYPE_TITLE[PurchaseSummary.paymentDetails.selectedOption]}</p>
                                {PurchaseSummary.paymentDetails.selectedOption == "cardPayment" && <>
                                    <h6><span className="fw-bold">Holder Name: </span>{PurchaseSummary.paymentDetails.cardHolderName}</h6>
                                    <h6><span className="fw-bold">Card Number: </span>{PurchaseSummary.paymentDetails.cardNumber}</h6>
                                    <h6><span className="fw-bold">Valid Thru: </span>{PurchaseSummary.paymentDetails.validThruMonth}/{PurchaseSummary.paymentDetails.validThruYear}</h6>
                                    <h6><span className="fw-bold">CVV: </span>{PurchaseSummary.paymentDetails.cvv}</h6>
                                </>}
                                {PurchaseSummary.paymentDetails.selectedOption == "netBanking" && " for " + PurchaseSummary.paymentDetails.bankName}
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div className="row">
                            <div className="col-md-12"><b>3 Review items and delivery</b></div>
                            <ul class="list-group">
                                {!!PurchaseSummary.orderSummary.length &&
                                    PurchaseSummary.orderSummary.map((product) => {
                                        return <li class="list-group-item d-flex justify-content-between align-items-start">
                                            <div className="col-sm-2 ">
                                                <img className="img-fluid" src={product.image} alt={product.name} /></div>
                                            <div className="col-sm-10">
                                                <div className="row text fw-bolder">{product.name}</div>
                                                <div className="row text">{product.description}</div>
                                                <div className="row text">
                                                    <div className="col-sm-6 text">quantity: {product.quantity}</div>
                                                    <div className="col-sm-6 text">&#36; {product.totalPrice}</div>
                                                </div>
                                            </div>
                                        </li>
                                    })}
                            </ul>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div className="row">
                            <div className="col-md-2"><button className="btn btn-lg btn-warning" onClick={onPlaceOrder} data-bs-toggle="modal" data-bs-target="#exampleModal">Place Order</button>
                            </div>
                            <div className="col-md-10">
                                <p><span className="cart-value">Order Total: {cartValue}</span></p>
                                <h6>By placing your order, you agree to Amazon's privacy notice and conditions of use.</h6>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Order Placed</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            We have successfully Places Your order
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" >OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default UserPurchaseSummary;