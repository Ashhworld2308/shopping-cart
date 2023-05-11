import React, { useContext, useState } from "react";
import userCartContext from "../../../Context/userCartContext";

const UpiPaymentComponent = (props) => {
    const { paymentOptions, cartSummary, onPaymentOptionChange } = props;
    const { onCheckout, onPaymentDetailUpdate } = useContext(userCartContext);
    const [upiPayment, setUpiPayment] = useState(paymentOptions.upiPayment);
    const [upipaymentSubmitStatus, setUpipaymentSubmitStatus] = useState(true);


    const onUPIValidation = (event) => {
        upiPayment.upiID = event.target.value;
        upiPayment.selectedOption = "upiPayment";
        setUpiPayment(upiPayment);
    };

    const onVerifyHandler = () => {
        setUpipaymentSubmitStatus(false);
        onPaymentDetailUpdate(upiPayment);
    }

    return <>
        <input className="form-check-input me-1" type="radio" name="paymentoptions" value="upiPayment" id="upiPayment"
            onChange={onPaymentOptionChange} checked={upiPayment.isSelected} />
        <label className="form-check-label">UPI Payment</label>
        <div className={!upiPayment.isSelected ? "d-none" : ""}>
            <div className="input-group mb-3">
                <input type="text" className="form-control upi-payment-option-input" placeholder="Enter UPI ID" onChange={(e) => onUPIValidation(e)} />
                {!upipaymentSubmitStatus && <div className="btn btn-success upi-payment-option-button"><i className="bi bi-check"></i></div>}
                {upipaymentSubmitStatus && <button className="btn btn-outline-secondary upi-payment-option-button" type="button" id="button-addon2" onClick={onVerifyHandler}>VERIFY</button>}
            </div>
            <div className="input-group mb-3">
                <button className={upipaymentSubmitStatus ? "btn btn-disabled" : "btn btn-primary"} type="button" id="button-addon2" disabled={upipaymentSubmitStatus} onClick={(event) => onCheckout(event, upiPayment)}>PAY &#36;{cartSummary.finalCartValue}</button>
            </div>
        </div>
    </>
};

export default UpiPaymentComponent;