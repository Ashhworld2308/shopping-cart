import { createStore } from "redux";
import itemCartReducer from './reducers/itemCartReducer';

const store = createStore(itemCartReducer);

export default store;