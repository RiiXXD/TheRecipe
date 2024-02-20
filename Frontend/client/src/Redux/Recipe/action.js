import { SINGLETON_RECIPE_REQUEST,SINGLETON_RECIPE_SUCCESS,SINGLETON_RECIPE_FAIL } from "./action-type";

export const singleton=(id)=>async (dispatch)=>{
dispatch({type:SINGLETON_RECIPE_REQUEST});
try{
    console.log(id);
    const res=await fetch(`http://localhost:8080/recipe/getRecipe/${id}`)
    const data=await res.json();
    dispatch({type:SINGLETON_RECIPE_SUCCESS,payload:data});
    console.log(data);
}
catch (err) {
    dispatch({type:SINGLETON_RECIPE_FAIL});

}

}