import * as actionTypes from '../actionTypes';
const initialState = {
    allRequests:[],
    selectedRequest:{}
};


const chiefRequestReducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SELECT_CHEIF_REQUEST:
            console.log(state);
        break;

        default:
        return state;
    }
}

export default chiefRequestReducer;