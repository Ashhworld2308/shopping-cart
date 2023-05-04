import React, { useState, useContext } from "react";
import userCartContext from "../../../Context/userCartContext";
import { MONTH_NUMBER, YEAR_NUMBER } from "../../../constants";


const CardPaymentComponent = (props) => {
    const { paymentOptions, cartSummary, onPaymentOptionChange } = props;
    const { onCheckout, onPaymentDetailUpdate } = useContext(userCartContext);
    const [cardPayment, setCardPayment] = useState(paymentOptions.cardPayment);
    const [checkoutEnabled, setCheckoutEnabled] = useState(true);

    const onInputChange = (event) => {
        const value = event.target.value;
        const updateEntry = cardPayment;
        const id = event.target.id;
        let isValidInput = true;

        switch (id) {
            case "cardNumber":
                if (value.length > 16) {
                    isValidInput = false;
                }
                break;
            case "cardHolderName":
                if (value.length == "") {
                    isValidInput = false;
                }
                break;
            case "cvv":
                if (value.length > 3) {
                    isValidInput = false;
                }
                break;
            default:
                break;
        };

        setCardPayment((prevStat) => {
            if (isValidInput) {
                updateEntry[id] = event.target.value;
                updateEntry.selectedOption = "cardPayment";
                return {
                    ...prevStat, ...updateEntry
                };
            }
            return {
                ...prevStat
            }
        });
        setCheckoutEnabled(() => true);

        const isError = Object.keys(cardPayment).filter((value) => {
                if( value == "cardNumber") {
                    if (cardPayment[value].length !== 16 || cardPayment[value].trim() == "") {
                        return value;
                    }
                } else if( value == "cvv") {                    
                    if (cardPayment[value] < 100 && cardPayment[value] > 999) {
                        return value;
                    }
                } else if( value == "validThruMonth" || value == "validThruYear" || value == "cardHolderName") {
                    if (cardPayment[value].trim() == "")  return value;
                }
        });
        if(!isError.length) setCheckoutEnabled(() => false);
        onPaymentDetailUpdate(cardPayment);
    }

    return <>
        <input className="form-check-input me-1" type="radio" name="paymentoptions" value="cardPayment" id="cardPayment"
            onChange={onPaymentOptionChange} />
        <label className="form-check-label">Credit/Debit Card</label>
        <div className={!paymentOptions.cardPayment.isSelected ? "d-none row" : "row"}>
            <div className="col-md-6">
                <div className="mb-3">
                    <label className="form-label">Enter Card Number</label>
                    <input id="cardNumber" className="form-control form-control-lg" type="number" placeholder="0000 0000 0000 0000"
                        onChange={onInputChange} value={cardPayment.cardNumber}></input>
                </div>
            </div>
            <div className="col-md-6">
                <div className="mb-3">
                    <label className="form-label">Enter Card Holder Name</label>
                    <input id="cardHolderName" className="form-control form-control-lg" type="text" placeholder="Enter Card Holder Name" onChange={onInputChange} 
                    value={cardPayment.cardHolderName} />
                </div>
            </div>
            <div className="col-md-3">
                <div className="mb-3">
                    <label className="form-label" style={{ width: "100%" }}>Valid Thru</label>
                    <select className="btn btn-outline-secondary dropdown-toggle valid-thru-style month-dropdown-style"
                        name="validThruMonth" id="validThruMonth" onChange={onInputChange} defaultValue={cardPayment.validThruMonth}>
                        <option value="">MM</option>
                        {MONTH_NUMBER.map((month, index) => {
                            return <option value={month} key={index}>{month}</option>
                        })}
                    </select>
                    <select className="btn btn-outline-secondary dropdown-toggle valid-thru-style year-dropdown-style"
                        name="validThruYear" id="validThruYear" onChange={onInputChange} defaultValue={cardPayment.validThruYear}>
                        <option value="">YY</option>
                        {YEAR_NUMBER.map((year, index) => {
                            return <option value={year} key={index}>{year}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="col-md-3">
                <div className="mb-3">
                    <label className="form-label">Enter CVV</label>
                    <input id="cvv" className="form-control form-control-lg" type="number" placeholder="Enter CVV" onChange={onInputChange} value={cardPayment.cvv} ></input>
                </div>
            </div>
            <div className="input-group mb-3">
                <button className={checkoutEnabled ? "btn btn-disabled" : "btn btn-primary"} type="button" id="button-addon2"
                    disabled={checkoutEnabled} onClick={(event) => onCheckout(event, cardPayment)}>PAY &#8377;{cartSummary.finalCartValue}</button>
            </div>
        </div>
    </>
};

export default CardPaymentComponent;