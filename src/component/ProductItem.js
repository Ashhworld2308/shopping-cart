import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../actions/cartAction";
import authContext from '../Context/authContext';

const ProductItem = (props) => {
    const {addToCartHandler} = useContext(authContext);
    const {item} = props;
    const dispatch = useDispatch(item);

    const onAddItem = () => {
        item.quantity = 1;
        item.totalPrice = item.price;
        dispatch(addItem(item));
        addToCartHandler(item);
    }
    return (
        <div className="col-sm-4 mb-2">
            <div className="card">
              <img src={item.image} className="card-img-top product-image" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
              </div>
              <div className="card-body">
                <button type="button" disabled={item.isCartItem} className="btn btn-sm btn-primary" onClick={onAddItem}>Add to Cart</button>
                    <span className="item-price-style"><label>&#8377; {item.price}</label></span>
              </div>
            </div>
        </div>
    );
};

export default ProductItem;