
import { SIGN_SUCCESS,SIGN_REQUEST,SIGN_ERROR,LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST } from "./action-type"

const intitState={
    isLoading : false,
    checkAuth:false,
    user : {},
    loggedInUsers:[],
    isError : false,
    msg : '',
   
    loginMsg:"",
    isRegistered:false,
    token:"",
    isLogout:false
}
export const reducer =(state=intitState,{type,payload})=>{
    switch(type){
        case SIGN_REQUEST : {
            return {
              ...state,
              isLoading :true,
              isError:false,
              checkAuth : false,
            }}
            case SIGN_SUCCESS : {
                console.log(payload);

                return {
                  ...state,
                  user:{...payload},
                  isLoading :false,
                  isError:false,
                  checkAuth : true,
                  msg:payload.msg,
                }}
                case SIGN_ERROR:{
                    console.log(payload);
                   return { ...state,
                    msg:payload,
                    isLoading :false,
                    isError:true,
                    checkAuth : false,}
                }
                case LOGIN_REQUEST : {
                    console.log(payload);
    
                    return {
                      ...state,
                      isLoading :true,
                      isError:false,
                     checkAuth:false,
                    }}
                    case LOGIN_SUCCESS:{
                        console.log(payload);
                       return { 
                        ...state,
                        user:{...payload.user,token:payload.token},
                        isLoading :false,
                        isError:false,
                        checkAuth : payload.user?true:false,
                        
                    }
                    }
                    case LOGIN_FAILURE:{
                        
                       return { 
                        ...state,
                        user:"",
                        isLoading :false,
                        isError:true,
                        checkAuth : false,
                    }
                    }
                case LOGOUT_REQUEST:{
                    
                   return { 
                    ...state,
                    user:"",
                    msg:"",
                    isLoading :false,
                    isError:false,
                    checkAuth : false,
                }
                }
                
        default:
            {
                return state
            }
    }

}