import React, {useState} from "react";
import { STATES } from "../../constants";

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
}
const AddressDetails = (props) => {
    const { onSaveAddressHandlers } = props;
    const [addressDetail, setAddressDetails] = useState(AddressObj);

    const onSaveAddressHandler = (event) => {
        event.preventDefault();
        console.log(event.target, addressDetail);
    }

    const onFormChangeHandler = (event) => {
        console.log(event, AddressObj[event.target.id]);
        if(event.target.type == "radio"){
            AddressObj[event.target.name] = event.target.value;
        } else {
            AddressObj[event.target.id] = event.target.value;
        }

        setAddressDetails(() => AddressObj);
    } 

    return <>
        <form class="row g-3 needs-validation" novalidate onSubmit={onSaveAddressHandler}>
            <div class="col-md-5">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" required onChange={onFormChangeHandler} />
            </div>
            <div class="col-md-5">
                <label for="mobileNumber" class="form-label">10 Digit Mobile Number</label>
                <input type="number" class="form-control" id="mobileNumber" required onChange={onFormChangeHandler} />
            </div>
            <div class="col-md-5">
                <label for="pincode" class="form-label">Pin Code</label>
                <input type="number" class="form-control" id="pincode" required onChange={onFormChangeHandler} />
            </div>
            <div class="col-md-5">
                <label for="locality" class="form-label">Locality</label>
                <input type="text" class="form-control" id="locality" required onChange={onFormChangeHandler} />
            </div>
            <div class="col-md-10">
                <label for="address" class="form-label">Address (Area and Street)</label>
                <textarea type="textarea" class="form-control" id="address" required onChange={onFormChangeHandler} />
            </div>
            <div class="col-md-5">
                <label for="city" class="form-label">City/District/Town</label>
                <input type="text" class="form-control" id="city" required onChange={onFormChangeHandler} />
            </div>
            <div class="col-md-5">
                <label for="state" class="form-label">State</label>
                <select class="form-select" id="state" required onChange={onFormChangeHandler}>
                    <option value="" disabled>Select State</option>
                    {STATES.map((state, index) => {
                        return <option value={index}>{state}</option>
                    })}
                </select>
            </div>
            <div class="col-md-5">
                <label for="landmark" class="form-label">Landmark(Optional)</label>
                <input type="text" class="form-control" id="landmark" required onChange={onFormChangeHandler} />
            </div>
            <div class="col-md-5">
                <label for="alternetMobileNumber" class="form-label">Alternet Phone(Optional)</label>
                <input type="text" class="form-control" id="alternetMobileNumber" onChange={onFormChangeHandler} />
            </div>
            <div class="col-12">
                <label for="alternet" class="form-label">Address Type</label><br/>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="addressType" id="inlineRadio1" value="home" onChange={onFormChangeHandler} />
                    <label class="form-check-label" for="inlineRadio1">Home (All Day delivery)</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="addressType" id="inlineRadio2" value="work" onChange={onFormChangeHandler} />
                    <label class="form-check-label" for="inlineRadio2">Work (Delivery between 10AM - 6PM)</label>
                </div>
            </div>
            <div class="col-12">
                <button class="btn btn-lg btn-primary" type="submit" onClick={onSaveAddressHandler}>Submit form</button>
            </div>
        </form>
    </>
}

export default AddressDetails;