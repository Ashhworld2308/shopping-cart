import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../actions/cartAction";
import authContext from '../Context/authContext';
import { useNavigate } from "react-router-dom/dist";

const ProductItem = (props) => {
    const {addToCartHandler} = useContext(authContext);
    const {item} = props;
    const dispatch = useDispatch(item);
    const navigate = useNavigate();


    const onAddItem = () => {
        item.quantity = 1;
        item.totalPrice = item.price;
        dispatch(addItem(item));
        addToCartHandler(item);
    }

    const goToCart = () => {
      navigate("/cart");
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
                {!item.isCartItem && <button type="button" disabled={item.isCartItem} className={item.isCartItem ? "btn btn-sm" : "btn btn-sm btn-primary"} onClick={onAddItem}>Add to Cart</button>}
                {item.isCartItem && <button type="button" className="btn btn-sm" onClick={goToCart}>Go to Cart</button>}                 
                <span className="item-price-style"><label>&#36; {item.price}</label></span>
              </div>
            </div>
        </div>
    );
};

export default ProductItem;