import { SINGLETON_RECIPE_REQUEST,SINGLETON_RECIPE_SUCCESS,SINGLETON_RECIPE_FAIL } from "./action-type";

export const singleton=(id)=>async (dispatch)=>{
dispatch({type:SINGLETON_RECIPE_REQUEST});
try{const res=await fetch(`http://localhost:8080/recipe/getRecipe/&id=${id}`)
const data=await res.json();
dispatch({type:SINGLETON_RECIPE_SUCCESS});
}
catch (err) {
    dispatch({type:SINGLETON_RECIPE_FAIL});

}

}