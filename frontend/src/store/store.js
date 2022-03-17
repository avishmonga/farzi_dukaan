import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer } from './reducers/ProductReducer';

const reducer = combineReducers({
    products:productReducer,


})
let init = {}

const middleware = [thunk]

const store = createStore(reducer,init,composeWithDevTools(applyMiddleware(...middleware)))

export default store