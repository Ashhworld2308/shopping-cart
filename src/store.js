import { createStore } from "redux";
import itemCartReducer from './reducers/itemCartReducer';

export default const storeItemCartReducer = createStore(itemCartReducer);
