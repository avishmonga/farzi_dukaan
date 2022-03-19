
import { LOGIN_REQ,LOGIN_FAIL,LOGIN_SUCCESS,CLEAR_ERRORS } from '../AcrionTypes/userActionTypes';

export const userReducer = (state = {user:{}},action)=>{
    switch(action.type){
        case LOGIN_REQ:
            return {
                login:true,
                isAuthenticated:false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                login:false,
                isAuthenticated:true,
                user:action.payload
            }
        case LOGIN_FAIL:
            return {
                ...state,
                login:false,
                isAuthenticated:false,
                error:action.payload,
                user:null,
                
            }
            case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

      default:
      return state
    }

}