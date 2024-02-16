
import { SIGN_SUCCESS,SIGN_REQUEST,AUTH_ERROR, AUTH_REQUEST, AUTH_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST } from "./actionTypes"

const intitState={
    isLoading : false,
    isAuth:false,
    user : [],
    loggedInUsers:[],
    isError : false,
    regMsg : '',
    errMsg:"",
    loginMsg:"",
    isRegistered:false,
    token:"",
    isLogout:false
}
const reducer =(state=intitState,{type,payload})=>{
    switch(type){
        default:
            {
                return state
            }
    }

}