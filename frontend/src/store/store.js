import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { detalProductReducer, productReducer } from './reducers/ProductReducer';
import { profileReducer, userReducer,forgotPasswordReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    products:productReducer,
    productDetail:detalProductReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer
})
let init = {}

const middleware = [thunk]

const store = createStore(reducer,init,composeWithDevTools(applyMiddleware(...middleware)))

export default store