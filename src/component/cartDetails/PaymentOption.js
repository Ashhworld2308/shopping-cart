import React, { useCallback, useEffect, useState } from "react";
import { bankLists, MONTH_NUMBER, PAYMENT_OPTIONS, YEAR_NUMBER } from "../../constants";
import './cartDetails.css';
import { getCartValues } from "../../commonUtils";
import _ from "lodash";
const { debounce } = _;

const PaymentOption = (props) => {
    const { cartItems, onCheckout } = props;
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

    const delaySaveToDb = useCallback(
        debounce((value)=>{
            setPaymentOptions(() => value);
        }, 10000), []);

    const onUPIValidation = (event) => {
        paymentOptions.upiPayment.upiID = event.target.value;
        delaySaveToDb(paymentOptions);

    };

    const debounceCall = useCallback(
        debounce((value)=>{
            Object.keys(paymentOptions).forEach(key => {
                paymentOptions[key].isSelected = key == value ? true : false;
            });
            setPaymentOptions(() => paymentOptions);
        }, 1000), []);

    const onPaymentOptionChange = (event) => {
        console.log(event, event.target);
        debounceCall(event.target.id);
        console.log(paymentOptions);
    }

    const onBankChangeHandler = (event, bank) => {
        console.log(event.target.value, event.target);
        paymentOptions.netBanking.id = event.target.value;
        paymentOptions.netBanking.bankName = bank.bankName;

        delaySaveToDb(paymentOptions);
    }

    return <>
        <form className="row g-3 needs-validation">
            <ul className="list-group">
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="radio" name="paymentoptions" value="upiPayment" id="upiPayment"  onChange={(e) => onPaymentOptionChange(e)} checked />
                    <label className="form-check-label">UPI Payment</label>
                    <div className={!paymentOptions.upiPayment.isSelected ? "d-none" : ""}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control upi-payment-option-input" placeholder="Enter UPI ID"  onChange={(e) => onUPIValidation(e)} />
                            {!upipaymentSubmitStatus && <div className="btn btn-success upi-payment-option-button"><i class="bi bi-check"></i></div>}
                            {upipaymentSubmitStatus && <button className="btn btn-outline-secondary upi-payment-option-button" type="button" id="button-addon2" onClick={onVerifyHandler}>VERIFY</button>}
                        </div>
                        <div className="input-group mb-3">
                            <button className={upipaymentSubmitStatus ? "btn btn-disabled" : "btn btn-primary"} type="button" id="button-addon2" disabled={upipaymentSubmitStatus} onClick={(event) => onCheckout(event, paymentOptions.upiPayment)}>PAY &#8377;{cartSummary.finalCartValue}</button>
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="radio" name="paymentoptions" value="netBanking" id="netBanking"  onChange={(e) => onPaymentOptionChange(e)} />
                    <label className="form-check-label">Net Banking</label>
                    <h6>This instrument has low success, use UPI or cards for better experience</h6>
                    <div className={!paymentOptions.netBanking.isSelected ? "d-none" : ""}>
                        <p className="mb-1">Popular Banks.</p>
                        {bankLists.map((bank) => {
                            return bank.isPopular &&
                                <div className="form-check form-check-inline" key={bank.id} >
                                    <input id={bank.id} className="form-check-input" type="radio" name="popularBanks" value={bank.bankName}
                                    onChange={(e) => onBankChangeHandler(e, bank)} />
                                    <label><img src={bank.imageIcon} className="bank-icon-style" />{bank.bankName}</label>
                                </div>;
                        })}
                    </div>
                </li>
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="radio" name="paymentoptions" value="cardPayment" id="cardPayment" onChange={onPaymentOptionChange} />
                    <label className="form-check-label">Credit/Debit Card</label>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Enter Card Number</label>
                                <input className="form-control form-control-lg" type="number" placeholder="0000 0000 0000 0000" min={1111111111111111} max={9999999999999999}></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Enter Card Holder Name</label>
                                <input className="form-control form-control-lg" type="text" placeholder="Enter Card Holder Name" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label" style={{ width: "100%" }}>Valid Thru</label>
                                <select className="btn btn-outline-secondary dropdown-toggle valid-thru-style month-dropdown-style" name="validThruMonth" id="validThruMonth">
                                    <option value="" disabled>MM</option>
                                    {MONTH_NUMBER.map((month, index) => {
                                        return <option value={index} key={index}>{month}</option>
                                    })}
                                </select>
                                <select className="btn btn-outline-secondary dropdown-toggle valid-thru-style year-dropdown-style" name="validThruYear" id="validThruYear">
                                    <option value="" disabled="">YY</option>
                                    {YEAR_NUMBER.map((year, index) => {
                                        return <option value={index} key={index}>{year}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Enter CVV</label>
                                <input className="form-control form-control-lg" type="number" placeholder="Enter CVV" min="100" max="999"></input>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="radio" name="paymentoptions" value="cashOnDelivery" id="cashOnDelivery" onChange={onPaymentOptionChange} />
                    <label className="form-check-label">Cash On Delivery</label>
                    <div>
                        <h6 className="mb-1">Scan & Pay using Cash, UPI and Cards at the time of Delivery.</h6>
                    </div>
                </li>
            </ul>
        </form>
    </>
}

export default PaymentOption;