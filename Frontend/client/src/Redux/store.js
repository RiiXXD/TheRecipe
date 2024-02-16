import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import thunk from 'redux-thunk'
const rootReducer = combineReducers({
    recipeReducer,authReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))