import { GET_RECIPE_SUCCESS,SINGLETON_RECIPE_REQUEST,DELETE_ERROR,DELETE_SUCESS,DELETE_REQUEST,SEARCH_RESULTS_FOUND,SEARCH_RESULTS_NOT_FOUND,SINGLETON_RECIPE_SUCCESS,SINGLETON_RECIPE_FAIL } from "./action-type";
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
export const getRecipe=(pageNum)=>async(dispatch)=>{
    const data=await fetch(`http://localhost:8080/recipe/getRecipe?page=${pageNum}&limit=10`);
    const response=await data.json();
    dispatch({type:GET_RECIPE_SUCCESS,payload:response.recipe})
    console.log(response);
    // setRecipes((prevData) => [...prevData,...response.recipe]);
  }
export const fetchSearchResults=(k)=>async(dispatch)=>{
 try{   if(k===""||k===" ")
    dispatch({type:SEARCH_RESULTS_NOT_FOUND});
    else{
    const search=await fetch(`http://localhost:8080/recipe/search/?q=${k}`)
    const results=await search.json();
    dispatch({type:SEARCH_RESULTS_FOUND,payload:results});

   }}
   catch(e){
    dispatch({type:SEARCH_RESULTS_NOT_FOUND});

   }
    
    
 
}
export const delRecipe=(recId,userID)=>async(dispatch)=>{
    try{
        console.log(userID,recId)
        const res=await fetch(`http://localhost:8080/recipe/delete/${recId}/${userID}`,
        {method:"DELETE"})
        // dispatch({type:DELETE_REQUEST});
 
        const data=await res.json();
        // dispatch({type:DELETE_SUCESS});
        // dispatch(getRecipe(1));
        console.log(data);
    }
    catch(e){
        // dispatch({type:DELETE_ERROR});
        console.log(e);

    }
}