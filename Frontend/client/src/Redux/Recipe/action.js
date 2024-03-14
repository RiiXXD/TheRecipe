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
export const getRecipe=(pageNum,limit,total,prevPage)=>async(dispatch)=>{
 try {  
   const upperPageLimit=Math.ceil(total/limit);
   if(pageNum===1||upperPageLimit>=pageNum && pageNum !==prevPage)
   {
        const data=await fetch(`http://localhost:8080/recipe/getRecipe?page=${pageNum}&limit=${limit}`);
    const response=await data.json();
    dispatch({type:GET_RECIPE_SUCCESS,payload:{recipe:response.recipe,total_count:response.total_count,pageNum}})
    console.log(response);
 }
    }
    catch(e){console.log(e);}
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
        dispatch({
            type: DELETE_SUCESS,
            payload: {recId,msg:data.message} 
        });
    }
    catch(e){
        // dispatch({type:DELETE_ERROR});
        console.log(e);

    }
}