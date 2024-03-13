import { SIGN_SUCCESS,SIGN_REQUEST,SIGN_ERROR, EDIT_FAILURE,EDIT_SUCCESSFUL,AUTH_REQUEST, AUTH_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST } from "./action-type"

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

export const logOut=()=>(dispatch)=>{
  dispatch({type:LOGOUT_REQUEST})

}

export const loginUser=({email,password})=>async(dispatch)=>{
 try{ dispatch({type:LOGIN_REQUEST})
  const res= await fetch(`${baseUrl}user/login`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
  body: JSON.stringify({email,password})
})

const data = await res.json();
console.log(data);
dispatch({type:LOGIN_SUCCESS,payload:data})

console.log(data);
}
catch(e){
  dispatch({type:LOGIN_FAILURE,payload:e})

}
}

export const editUser=(image,dbImg,baseUrl,userId,name)=>async(dispatch)=>{
 let upload=""
 if(upload) console.log("hey")
  if(image) { upload=image}
  const formData = new FormData();
  if(name){
    formData.append('name', name);
    console.log(name,"HELLO")
} 
  if(upload){
    formData.append('profileImg', upload)
    console.log(upload,"HELLO") 
}; 
  console.log("formData",...formData);
try{
  const res = await fetch(`${baseUrl}user/editProfile/${userId}`, {
      method: "PUT",
      
      body: formData
  });
  const data = await res.json();
  dispatch({type:EDIT_SUCCESSFUL,payload:data});
  console.log(data);
}
catch(e){
  console.log(e);
  dispatch({type:EDIT_FAILURE,payload:e})
}
}
export const liked=(userId,recipeId)=>async(dispatch)=>{
try{const res=await fetch(`${baseUrl}user/like/${userId}/${recipeId}`,{ method: "POST",
headers:{
  "Content-Type": "application/json"
},
body: JSON.stringify()
})
const data=await res.json();
console.log(data);}
catch(e){console.log(e);}
}
export const unLiked=()=>async(dispatch)=>{

}