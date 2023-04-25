import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem } from "../actions/cartAction";

const ProductItem = (props) => {
    const {item, addToCartHandler} = props;
    const state = useSelector((state) => state);
    const dispatch = useDispatch(item);

    const onAddItem = () => {
        dispatch(addItem(item));
        addToCartHandler(item);
    }
    return (
        <div className="col-sm-4">
            <div className="panel panel-primary">
                <div className="panel-heading">{item.name}</div>
                <div className="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive col-lg-12" alt="Image" /></div>
                <div className="panel-footer">
                    <button type="button" disabled={item.isCartItem} className="btn btn-sm btn-default" onClick={onAddItem}>Add to Cart</button>
                    <span className="item-price-style"><label>$ {item.price}</label></span>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;