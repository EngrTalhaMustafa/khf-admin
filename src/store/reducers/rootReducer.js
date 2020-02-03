import { combineReducers } from 'redux';
import chiefRequestReducer from './chefRequest'
const rootReducer = combineReducers({
    chiefRequestReducer:chiefRequestReducer
})

export default rootReducer;