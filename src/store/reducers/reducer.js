import * as actionTypes from '../actionTypes';
const initialState = {
    selectedRow: {},
    cheifRequestDrawerState: false,
    cheifRequestDrawerData: {},

};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_CHIEF_REQUEST:
            console.log("in reducer", action.payload);
            return {
                ...state,
                cheifRequestDrawerData: action.payload
            };
            break;


        case actionTypes.OPEN_CHEIF_REQUEST_DRAWER:
            return {
                ...state,
                cheifRequestDrawerState: true
            }
            break;


        case actionTypes.CLOSE_CHEIF_REQUEST_DRAWER:
            return {
                ...state,
                cheifRequestDrawerState: false
            }
            break;

        default:
            return state;
    }
}

export default reducer;