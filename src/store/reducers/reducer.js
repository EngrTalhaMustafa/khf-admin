import * as actionTypes from '../actionTypes';
const initialState = {
    selectedRow: {},
    cheifRequestDrawerState: false,
    cheifRequestDrawerData: {},
    riderRequestDrawerState: false,
    riderRequestDrawerData: {},
    orderDrawerState: false,
    orderDrawerData: {}
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


        case actionTypes.SELECT_RIDER_REQUEST:
            console.log("in reducer", action.payload);
            return {
                ...state,
                riderRequestDrawerData: action.payload
            };
            break;


        case actionTypes.OPEN_RIDER_REQUEST_DRAWER:
            return {
                ...state,
                riderRequestDrawerState: true
            }
            break;


        case actionTypes.CLOSE_RIDER_REQUEST_DRAWER:
            return {
                ...state,
                riderRequestDrawerState: false
            }
            break;

        case actionTypes.SELECT_ORDER:
            console.log("in reducer", action.payload);
            return {
                ...state,
                orderDrawerData: action.payload
            };
            break;


        case actionTypes.OPEN_ORDER_DRAWER:
            return {
                ...state,
                orderDrawerState: true
            }
            break;


        case actionTypes.CLOSE_ORDER_DRAWER:
            return {
                ...state,
                orderDrawerState: false
            }
            break;

        default:
            return state;
    }
}

export default reducer;