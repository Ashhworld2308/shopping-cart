import React from "react";

function CartItem({ item: cartItem, deleteItemHandler, onUpdateQuantity }) {
    return (<div className="row border border-top border-bottom display-container" key={CartItem.id}>
        <div className="row main align-items-center display-container">
            <div className="col-sm-2"><img className="img-fluid" src={cartItem.image} alt={cartItem.name} height="90px" width="100px"/></div>
            <div className="col-sm-4">
                <div className="row text-muted">{cartItem.name}</div>
            </div>
            <div className="col-sm-3">
                <div className="input-group">
                    <button className="input-group-text remove-item-class" id="minusItem" onClick={(event) => onUpdateQuantity(event, cartItem)}>
                        <i className="bi bi-dash" viewBox="0 0 16 16" id="minusItem" />
                    </button>
                    <input type="text" className="form-control input-count-class" value={cartItem.quantity}
                        aria-label="Input group example" aria-describedby="basic-addon1" readOnly />
                    <button className="input-group-text add-item-class" id="addItem" onClick={(event) => onUpdateQuantity(event, cartItem)}>
                        <i className="bi bi-plus" viewBox="0 0 16 16" id="addItem" />
                    </button>
                </div>
            </div>
            <div className="col-sm-2 cart-price">&#36; {cartItem.totalPrice}</div>
            <div className="col-sm-1">
                <button type="button" className="btn btn-sm btn-outline-danger close"
                    onClick={() => deleteItemHandler(cartItem)}>&#10005;</button>
            </div>
        </div>
    </div>);
}

export default CartItem;