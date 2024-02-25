import { SINGLETON_RECIPE_REQUEST,SEARCH_RESULTS_FOUND,SEARCH_RESULTS_NOT_FOUND,SINGLETON_RECIPE_SUCCESS,SINGLETON_RECIPE_FAIL } from "./action-type";


const intitState={
    isLoading : false,
    RecipeAuthor : {},
    isError : false,
    msg : '',
    Searchs:[],
    searchMsg: '',
    recipe:{},
    comments:{},
   }

export const reducer =(state=intitState,{type,payload})=>{
    switch(type){
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
                
                
                
        default:
            {
                return state
            }
    }

}