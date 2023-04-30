import React, { useEffect, useState } from "react";
import { bankLists, MONTH_NUMBER, PAYMENT_OPTIONS, YEAR_NUMBER } from "../../constants";
import './cartDetails.css';
import { getCartValues } from "../../commonUtils";

const AddressObj = {
    name: "",
    mobileNumber: "",
    pincode: 0,
    locality: "",
    address: "",
    city: "",
    state: "dadasdas",
    landmark: "",
    alternetMobileNumber: "",
    addressType: ""
};

const PaymentOption = (props) => {
    const { cartItems } = props;
    const [paymentOptions, setPaymentOptions] = useState(() => PAYMENT_OPTIONS);
    const [cartSummary, setCartSummary] = useState({})
    const [upipaymentSubmitStatus, setUpipaymentSubmitStatus] = useState(true);

    useEffect(() => {
        const cartValue = getCartValues(cartItems);
        setCartSummary(cartValue);
    }, [cartItems]);

    const onVerifyHandler = () => {
        setUpipaymentSubmitStatus(false)
    }

    const onUpiPaymentSubmit = () => {

    }

    return <>
        <form className="row g-3 needs-validation" novalidate>
            <ul className="list-group">
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="radio" name="paymentoptions" value="upiPayment" id="upiPayment" checked={paymentOptions.upiPayment.isSelected} />
                    <label className="form-check-label">UPI Payment</label>
                    <div className="">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control upi-payment-option-input" placeholder="Enter UPI ID" aria-label="Enter UPI ID"
                                aria-describedby="button-addon2" />
                            <button className="btn btn-outline-secondary upi-payment-option-button" type="button" id="button-addon2" onClick={onVerifyHandler}>VERIFY</button>
                        </div>
                        <div className="input-group mb-3">
                            <button className="btn btn-primary" type="button" id="button-addon2" disabled={upipaymentSubmitStatus} onClick={onUpiPaymentSubmit}>PAY &#8377;{cartSummary.finalCartValue}</button>
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="radio" name="paymentoptions" value="netBanking" id="netBanking" checked={paymentOptions.netBanking.isSelected} />
                    <label className="form-check-label">Net Banking</label>
                    <h6>This instrument has low success, use UPI or cards for better experience</h6>
                    <div>
                        <p className="mb-1">Popular Banks.</p>
                        {bankLists.map((bank) => {
                            return bank.isPopular &&
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="popularBanks" id="inlineCheckbox1" value="option1" />
                                    <label><img src={bank.imageIcon} className="bank-icon-style" />{bank.bankName}</label>
                                </div>;
                        })}
                    </div>
                </li>
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="radio" name="paymentoptions" value="cardPayment" id="cardPayment" checked={paymentOptions.cardPayment.isSelected} />
                    <label className="form-check-label">Credit/Debit Card</label>
                    <div class="row">
                        <div className="col-md-6">
                            <div class="mb-3">
                                <label className="form-label">Enter Card Number</label>
                                <input class="form-control form-control-lg" type="number" placeholder="0000 0000 0000 0000" min={1111111111111111} max={9999999999999999}></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="mb-3">
                                <label className="form-label">Enter Card Holder Name</label>
                                <input class="form-control form-control-lg" type="text" placeholder="Enter Card Holder Name"></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="mb-3">
                                <label className="form-label" style={{ width: "100%" }}>Valid Thru</label>
                                <select class="btn btn-outline-secondary dropdown-toggle valid-thru-style month-dropdown-style" name="validThruMonth" id="validThruMonth">
                                    <option value="" disabled="">MM</option>
                                    {MONTH_NUMBER.map((month, index) => {
                                        return <option value={index}>{month}</option>
                                    })}
                                </select>
                                <select class="btn btn-outline-secondary dropdown-toggle valid-thru-style year-dropdown-style" name="validThruYear" id="validThruYear">
                                    <option value="" disabled="">YY</option>
                                    {YEAR_NUMBER.map((year, index) => {
                                        return <option value={index}>{year}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div class="mb-3">
                                <label className="form-label">Enter CVV</label>
                                <input class="form-control form-control-lg" type="number" placeholder="Enter CVV" min="100" max="999"></input>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="radio" name="paymentoptions" value="cashOnDelivery" id="cashOnDelivery" checked={paymentOptions.cashOnDelivery.isSelected} />
                    <label className="form-check-label">Cash On Delivery</label>
                    <div>
                        <p className="mb-1">Some placeholder content in a paragraph.</p>
                        <small>And some small print.</small>
                    </div>
                </li>
            </ul>
        </form>
    </>
}

export default PaymentOption;