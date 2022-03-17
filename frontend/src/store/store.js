import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({

})
let init = {}

const middleware = [thunk]

const store = createStore(reducer,init,composeWithDevTools(applyMiddleware(...middleware)))

export default store