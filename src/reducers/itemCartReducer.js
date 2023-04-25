import { ADD_ITEM, DELETE_ITEM } from "../actionTypes/actionTypes";

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
    default:
      return state;
  }
};

export default itemCartReducer;