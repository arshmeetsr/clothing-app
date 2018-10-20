import { combineReducers } from 'redux';
import clothReducer from './clothReducer';
import filterReducer from './filterReducer';

export default combineReducers({
  cloth: clothReducer,
  filters: filterReducer
});