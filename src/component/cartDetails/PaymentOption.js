import React, { useCallback, useEffect, useState } from "react";
import { PAYMENT_OPTIONS } from "../../constants";
import './cartDetails.css';
import { getCartValues } from "../../commonUtils";
import _ from "lodash";
import UpiPaymentComponent from "./paymentComponents/UpiPaymentComponent";
import NetBankingComponent from "./paymentComponents/NetBankingComponent";
import CardPaymentComponent from "./paymentComponents/CardPaymentComponent";
import CODPaymentComponent from "./paymentComponents/CODPaymentComponent";
const { debounce } = _;

const PaymentOption = (props) => {
    const { cartItems, goToPreviousStep } = props;
    const [paymentOptions, setPaymentOptions] = useState(() => PAYMENT_OPTIONS);
    const [cartSummary, setCartSummary] = useState({})
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        const cartValue = getCartValues(cartItems);
        setCartSummary(cartValue);
    }, [cartItems]);

    const debounceCall = useCallback(
        debounce((value) => {
            Object.keys(paymentOptions).forEach(key => {
                paymentOptions[key].isSelected = key === value ? true : false;
            });
            setPaymentOptions(() => paymentOptions);
            forceUpdate();
        }, 0), [paymentOptions]);

    const onPaymentOptionChange = (event) => {
        debounceCall(event.target.id);
    }

    return <>
        <form className="row g-3 needs-validation">
            <ul className="list-group">
                <li className="list-group-item">
                    <UpiPaymentComponent paymentOptions={paymentOptions} cartSummary={cartSummary} onPaymentOptionChange={onPaymentOptionChange} />
                </li>
                <li className="list-group-item">
                    <NetBankingComponent paymentOptions={paymentOptions} cartSummary={cartSummary} onPaymentOptionChange={onPaymentOptionChange} />
                </li>
                <li className="list-group-item">
                    <CardPaymentComponent paymentOptions={paymentOptions} cartSummary={cartSummary} onPaymentOptionChange={onPaymentOptionChange} />
                </li>
                <li className="list-group-item">
                    <CODPaymentComponent paymentOptions={paymentOptions} cartSummary={cartSummary} onPaymentOptionChange={onPaymentOptionChange} />
                </li>
            </ul>
                <div className="input-group mb-3">
                    <button className="btn btn-sm btn-secondary" type="button"
                        onClick={(e) => goToPreviousStep(e, "paymentOptions", "orderSummary")}>
                        Go To OrderSummary
                    </button>
                </div>
        </form>
    </>
}

export default PaymentOption;