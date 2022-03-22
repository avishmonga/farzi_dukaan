import {
  LOGIN_REQ,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_FAIL,
  REGISTER_REQ,
  REGISTER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQ,
  LOAD_USER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from "../AcrionTypes/userActionTypes";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQ:
    case REGISTER_REQ:
      case LOAD_USER_REQ:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: null,
      };
      case LOGOUT_SUCCESS:
        return {
          loading:false,
          user:null,
          isAuthenticated:false,
        }
        case LOGOUT_FAIL:
          return{
            ...state,
            loading:false,
            error:action.payload
          }
      case LOAD_USER_FAIL:
        return {
          loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: null,
        }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
