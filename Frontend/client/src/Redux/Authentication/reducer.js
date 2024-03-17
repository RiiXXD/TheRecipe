
import { SIGN_SUCCESS,SIGN_REQUEST,SIGN_ERROR,LOGIN_FAILURE,EDIT_SUCCESSFUL, EDIT_FAILURE,LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST } from "./action-type"

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
                        user:{...payload.user},
                        isLoading :false,
                        isError:false,
                        checkAuth : payload.user?true:false,
                        msg:payload.msg,
                        token:payload.token
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
                case EDIT_SUCCESSFUL:{
                    return{
                        ...state,
                        msg:payload.message,
                        user:{...state.user,name:payload.user.name,profileImg:payload.user.profileImg},
                    }
                }
                case EDIT_FAILURE:{
                    return{

                    }}
                
        default:
            {
                return state
            }
    }

}