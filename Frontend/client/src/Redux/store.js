import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import{ reducer as authReducer} from "./Authentication/reducer";
import{ reducer as recipeReducer} from "./Recipe/reducer";

import { thunk } from 'redux-thunk';
const rootReducer = combineReducers({
    authReducer,recipeReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))