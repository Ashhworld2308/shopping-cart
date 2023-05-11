import { useContext, useState } from "react";
import userCartContext from "../../../Context/userCartContext";

const CODPaymentComponent = (props) => {
    const { paymentOptions, cartSummary, onPaymentOptionChange } = props;
    const { onCheckout, onPaymentDetailUpdate } = useContext(userCartContext);
    const [cashOnDelivery, setcashOnDelivery] = useState(paymentOptions.cashOnDelivery);

    const onCodSelect = (e) => {
        onPaymentOptionChange(e);
        cashOnDelivery.isSelected = true;
        cashOnDelivery.selectedOption = "cashOnDelivery";
        setcashOnDelivery(cashOnDelivery);
        onPaymentDetailUpdate(cashOnDelivery);
    }
    return <>
        <input className="form-check-input me-1" type="radio" name="paymentoptions" value="cashOnDelivery" id="cashOnDelivery" 
        onChange={(e) => onCodSelect(e)} />
        <label className="form-check-label">Cash On Delivery</label>
        <h6 className="mb-1">Scan & Pay using Cash, UPI and Cards at the time of Delivery.</h6>
        <div className={!paymentOptions.cashOnDelivery.isSelected ? "d-none row" : "row"}>
            <div className="input-group mb-3">
                <button className="btn btn-primary" type="button" id="button-addon2" onClick={(event) => onCheckout(event, paymentOptions.cashOnDelivery)}>PAY &#36;{cartSummary.finalCartValue}</button>
            </div>
        </div>
    </>
}

export default CODPaymentComponent;