import { ADD_ITEM, DELETE_ITEM } from "../actionTypes/actionTypes";

const addItem = (product) => {
  return {
    type: ADD_ITEM,
    product: product,
  };
};

const deleteItem = (product) => {
  return {
    type: DELETE_ITEM,
    product: product,
  };
};

export { addItem, deleteItem };