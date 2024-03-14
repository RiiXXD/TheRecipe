import {GET_RECIPE_SUCCESS,SINGLETON_RECIPE_REQUEST,SEARCH_RESULTS_FOUND,SEARCH_RESULTS_NOT_FOUND,SINGLETON_RECIPE_SUCCESS,SINGLETON_RECIPE_FAIL,DELETE_SUCESS } from "./action-type";


const intitState={
    recipes:[],
    isLoading : false,
    RecipeAuthor : {},
    isError : false,
    msg : '',
    Searchs:[],
    searchMsg: '',
    recipe:{},
    comments:{},
    reload:false,
    total:0,
    pageNum:1,
   }

export const reducer =(state=intitState,{type,payload})=>{
    switch(type){
      case GET_RECIPE_SUCCESS:{
        return {
          ...state,
          isLoading:false,
          recipes:[...state.recipes,...payload.recipe],
          total:payload.total_count,
          pageNum:payload.pageNum,

        }
      }
        case SINGLETON_RECIPE_REQUEST : {
            return {
              ...state,
              isLoading :true,
              isError:false,
            }}
            case SINGLETON_RECIPE_SUCCESS : {
                

                return {
                  ...state,
                  recipe:{...payload},
                  isLoading :false,
                  isError:false,
                  RecipeAuthor : {...payload.authorId},
                 
                }}
                case SINGLETON_RECIPE_FAIL:{
                    
                   return {
                     ...state,
                    msg:payload,
                    isLoading :false,
                    isError:true,
                    }
                }
                case SEARCH_RESULTS_NOT_FOUND:{
                  return{  ...state,
                    Searchs:[],
                    searchMsg:"Not Found!"
                  }

                }
                case SEARCH_RESULTS_FOUND:{
                  return{  ...state,
                    Searchs:[...payload.recipes],
                    searchMsg:payload.msg,
                  }

                }
                case DELETE_SUCESS:
                 
                  const updatedRecipes = state.recipes.filter(recipe => recipe._id !== payload.recId);
                  console.log()
                  return {
                      ...state,
                      recipes: [...updatedRecipes],
                      msg:payload.msg,
                      reload:!state.reload,
                  };
                
                
        default:
            {
                return state
            }
    }

}