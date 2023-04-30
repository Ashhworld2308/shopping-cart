import React from "react";

function CartItem({ item: cartItem, deleteItemHandler }) {
    return (<div className="row border border-top border-bottom display-container" key={CartItem.id}>
        <div className="row main align-items-center display-container">
            <div className="col-sm-2"><img className="img-fluid" src="https://placehold.it/150x80?text=IMAGE" /></div>
            <div className="col-sm-4">
                <div className="row text-muted">{cartItem.name}</div>
            </div>
            <div className="col-sm-3">
                <div className="input-group">
                    <button className="input-group-text remove-item-class">
                        <i className="bi bi-dash" viewBox="0 0 16 16">
                        </i>
                    </button>
                    <input type="text" className="form-control input-count-class" value={1}
                        aria-label="Input group example" aria-describedby="basic-addon1" />
                    <button className="input-group-text add-item-class">
                        <i className="bi bi-plus" viewBox="0 0 16 16">
                        </i>
                    </button>
                </div>
            </div>
            <div className="col-sm-2 cart-price">&#8377; {cartItem.price}</div>
            <div className="col-sm-1">
                <button type="button" className="btn btn-sm btn-outline-danger close"
                    onClick={() => deleteItemHandler(cartItem)}>&#10005;</button>
            </div>
        </div>
    </div>);
}

export default CartItem;