import { SIGN_SUCCESS,SIGN_REQUEST,SIGN_ERROR, AUTH_REQUEST, AUTH_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST } from "./action-type"

const baseUrl="http://localhost:8080/";
export const sign=(formData)=>async (dispatch) =>{
    dispatch({type:SIGN_REQUEST})

    try{
        const res= await fetch(`${baseUrl}user/sign`,{
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
        body: JSON.stringify({...formData})
    })
    const data = await res.json();
      console.log(data.user);
      dispatch({type:SIGN_SUCCESS, payload:data.user})
    }
    catch(err){
        dispatch({type:SIGN_ERROR,payload:err})

        
    }
}

    