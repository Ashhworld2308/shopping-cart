import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM_QUANTITY } from "../actionTypes/actionTypes";

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

const updateItemsQuntity = (product, type) => {
  return {
    type: UPDATE_ITEM_QUANTITY,
    product: product,
    buttonType: type
  };
};

export { addItem, deleteItem, updateItemsQuntity };