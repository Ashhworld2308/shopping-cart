import React, { useContext, useState } from "react";
import userCartContext from "../../../Context/userCartContext";
import { BANK_LIST } from "../../../constants";

const NetBankingComponent = (props) => {
    const { paymentOptions, cartSummary, onPaymentOptionChange } = props;
    const { onCheckout, onPaymentDetailUpdate } = useContext(userCartContext);
    const [netBanking, setNetBanking] = useState(paymentOptions.netBanking);
    const [upipaymentSubmitStatus, setUpipaymentSubmitStatus] = useState(true);


    const onBankChangeHandler = (event, bank) => {
        netBanking.id = event.target.value;
        netBanking.bankName = bank.bankName;
        netBanking.selectedOption = "netBanking";

        setNetBanking(netBanking);
        setUpipaymentSubmitStatus(false);
        onPaymentDetailUpdate(netBanking);
    }

    return <>
        <input className="form-check-input me-1" type="radio" name="paymentoptions" value="netBanking" id="netBanking"
            onChange={onPaymentOptionChange} checked={paymentOptions.netBanking.isSelected} />
        <label className="form-check-label">Net Banking</label>
        <div>
            <h6>This instrument has low success, use UPI or cards for better experience</h6>
        </div>
        <div className={!paymentOptions.netBanking.isSelected ? "d-none" : ""}>
            <p className="mb-1">Popular Banks.</p>
            {BANK_LIST.map((bank) => {
                return bank.isPopular &&
                    <div className="form-check form-check-inline" key={bank.id} >
                        <input id={bank.id} className="form-check-input" type="radio" name="popularBanks" value={bank.bankName}
                            onChange={(e) => onBankChangeHandler(e, bank)} />
                        <label><img src={bank.imageIcon} className="bank-icon-style" />{bank.bankName}</label>
                    </div>;
            })}
            <div className="input-group mb-3">
                <button className={upipaymentSubmitStatus ? "btn btn-disabled" : "btn btn-primary"} type="button" id="button-addon2" disabled={upipaymentSubmitStatus} onClick={(event) => onCheckout(event, netBanking)}>PAY &#36;{cartSummary.finalCartValue}</button>
            </div>
        </div>
    </>
};

export default NetBankingComponent;