import React, {useEffect, useState} from "react";
import { STATES, INITIAL_ADDRESS } from "../../constants";

const AddressDetails = (props) => {
    const { onSaveAddressHandler } = props;
    const [addressDetail, setAddressDetails] = useState(() => INITIAL_ADDRESS);

    useEffect(() => {
        setAddressDetails(() => addressDetail);
    }, [addressDetail]);

    const onFormChangeHandler = async (event) => {
        if(event.target.type == "radio"){
            addressDetail[event.target.name] = event.target.value;
        } else {
            addressDetail[event.target.id] = event.target.value;
        }

        await setAddressDetails(() => {
            return addressDetail;
        });
    } 

    const onSaveAddressSubmit = (event) => {
        event.preventDefault();
        
        onSaveAddressHandler(addressDetail, "deliveryAddress");
    }

    return <>
        <form className="row g-3 needs-validation" onSubmit={onSaveAddressHandler}>
            <div className="col-md-5">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="name" required onChange={onFormChangeHandler} 
                defaultValue={addressDetail.name} />
            </div>
            <div className="col-md-5">
                <label className="form-label">10 Digit Mobile Number</label>
                <input type="number" className="form-control" id="mobileNumber" required onChange={onFormChangeHandler}
                defaultValue={addressDetail.mobileNumber} />
            </div>
            <div className="col-md-5">
                <label className="form-label">Pin Code</label>
                <input type="number" className="form-control" id="pincode" required onChange={onFormChangeHandler} 
                defaultValue={addressDetail.pincode} />
            </div>
            <div className="col-md-5">
                <label className="form-label">Locality</label>
                <input type="text" className="form-control" id="locality" required onChange={onFormChangeHandler}
                defaultValue={addressDetail.locality} />
            </div>
            <div className="col-md-10">
                <label className="form-label">Address (Area and Street)</label>
                <textarea type="textarea" className="form-control" id="address" required onChange={onFormChangeHandler} 
                defaultValue={addressDetail.address} />
            </div>
            <div className="col-md-5">
                <label className="form-label">City/District/Town</label>
                <input type="text" className="form-control" id="city" required onChange={onFormChangeHandler} 
                defaultValue={addressDetail.city} />
            </div>
            <div className="col-md-5">
                <label className="form-label">State</label>
                <select className="form-select" id="state" required onChange={(e) => onFormChangeHandler(e)} 
                defaultValue={addressDetail.state}>
                    <option value="">Select State</option>
                    {STATES.map((state) => {
                        return <option value={state} key={state}>{state}</option>
                    })}
                </select>
            </div>
            <div className="col-md-5">
                <label className="form-label">Landmark(Optional)</label>
                <input type="text" className="form-control" id="landmark" required onChange={onFormChangeHandler} defaultValue={addressDetail.landmark} />
            </div>
            <div className="col-md-5">
                <label className="form-label">Alternet Phone(Optional)</label>
                <input type="text" className="form-control" id="alternetMobileNumber" onChange={onFormChangeHandler} defaultValue={addressDetail.alternetMobileNumber}  />
            </div>
            <div className="col-12">
                <label className="form-label">Address Type</label><br/>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="addressType" id="inlineRadio1" value="home" defaultChecked={addressDetail.addressType === "home"} />
                    <label className="form-check-label">Home (All Day delivery)</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="addressType" id="inlineRadio2" value="work" defaultChecked={addressDetail.addressType === "work"}
                    onChange={onFormChangeHandler} />
                    <label className="form-check-label">Work (Delivery between 10AM - 6PM)</label>
                </div>
            </div>
            <div className="col-12">
                <button className="btn btn-lg btn-primary" type="submit" onClick={onSaveAddressSubmit}>Save And Deliver Here</button>
            </div>
        </form>
    </>
}

export default AddressDetails;