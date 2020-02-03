import * as actionTypes from '../actionTypes';
const initialState = {
    allChiefRequests:[],
    selectedChiefRequest:{},
    testData: {'message':'hello, I am from store :)'},
    firstDrawerData:{},
    drawerState: false,
};


const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SELECT_CHEIF_REQUEST:
            console.log("in reducer",action.type);
            return {
            ...state,
            selectedChiefRequest: action.payload
            };
        break;

        case actionTypes.UPDATE_FIRST_DRAWER_DATA:
        console.log("in reducer",action.type);
        return{
            ...state,
            firstDrawerData: action.payload
        }
        break;

        case actionTypes.OPEN_DRAWER_STATE:
        return{
            ...state,
            drawerState:true
        }
        break;

        
        case actionTypes.CLOSE_DRAWER_STATE:
        return{
            ...state,
            drawerState:false
        }
        break;

        default:
        return state;
    }
}

export default reducer;