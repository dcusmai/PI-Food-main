const initialState = {
  recipes: [], 
  allRecipes: [],
  diets: [],
  detail: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
            case "GET_RECIPES":
                return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
            case 'GET_NAME_RECIPES':
                return {
                    ...state,
                    recipes: action.payload
                }
            case 'FILTER_BY_STATUS':
                //const allRecipes = state.allRecipes
                const statusFiltered = action.payload === "created" ? state.allRecipes.filter(el => el.created) : state.allRecipes.filter(el => !el.created)
                return{
                    ...state,
                    recipes: action.payload === 'all' ? state.allRecipes : statusFiltered
                }
            case 'GET_DETAILS':
                return {
                    ...state,
                    detail: action.payload
                }
            case 'POST_RECIPE':
                return {
                    ...state,
                }
            case 'GET_DIETS':
                return {
                    ...state,
                    diets: action.payload
                }
            case 'FILTER_BY_DIETS': 
                    const allRecipesByDiets = state.allRecipes
                    const filtered = action.payload === 'all' 
                    ? allRecipesByDiets 
                    : allRecipesByDiets?.filter(el => el.diets?.includes(action.payload))
                    return {
                        ...state,
                        recipes: filtered
                    }




            case 'ORDER_BY_NAME':
                const sortedArr = action.payload === 'asc' ?
                    state.recipes.sort(function(a, b) {
                        if(a.name > b.name) {
                            return 1;
                        }
                        if(b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    }):
                    state.recipes.sort(function(a, b) {
                        if(a.name > b.name) {
                            return -1;
                        }
                        if(b.name > a.name) {
                            return 1;
                        }
                        return 0; 
                    })
                    return{
                        ...state,
                        recipes: sortedArr
                    }
                case 'ORDER_BY_HEALTH':
                const sortedArr2 = action.payload === 'mas' ?
                    state.recipes.sort(function(a, b) {
                        if(a.name > b.name) {
                            return 1;
                        }
                        if(b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    }):
                    state.recipes.sort(function(a, b) {
                        if(a.name > b.name) {
                            return -1;
                        }
                        if(b.name > a.name) {
                            return 1;
                        }
                        return 0; 
                    })
                    return{
                        ...state,
                        recipes: sortedArr2
                    }
        
            default:
                return state;
    }
}

export default rootReducer;