import React, { useState , useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../actions/cartAction";
import authContext from '../Context/authContext';

const ProductItem = (props) => {
    const {addToCartHandler} = useContext(authContext);
    const {item} = props;
    const state = useSelector((state) => state);
    const dispatch = useDispatch(item);

    const onAddItem = () => {
        dispatch(addItem(item));
        addToCartHandler(item);
    }
    return (
        <div className="col-sm-4 mb-1 mb-sm-0">
            <div class="card">
              <img src="https://placehold.it/150x80?text=IMAGE" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{item.name}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
              <div class="card-body">
                <button type="button" disabled={item.isCartItem} className="btn btn-sm btn-default" onClick={onAddItem}>Add to Cart</button>
                    <span className="item-price-style"><label>&#8377; {item.price}</label></span>
              </div>
            </div>
        </div>
    );
};

export default ProductItem;