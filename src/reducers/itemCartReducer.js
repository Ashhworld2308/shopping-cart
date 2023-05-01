import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM_QUANTITY } from "../actionTypes/actionTypes";

const initialState = [];

const itemCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        action.product
      ];
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.product.id);
    case UPDATE_ITEM_QUANTITY:
      return state.filter((cartItem) => {
        if (action.product.id == cartItem.id) {
            if (action.buttonType == "addItem") { cartItem.quantity += 1; }
            else { cartItem.quantity -= 1; }
        }
        cartItem.totalPrice = cartItem.quantity * cartItem.price;
        console.log(cartItem)
        return cartItem.quantity > 0 && cartItem;
    });
    default:
      return state;
  }
};

export default itemCartReducer;