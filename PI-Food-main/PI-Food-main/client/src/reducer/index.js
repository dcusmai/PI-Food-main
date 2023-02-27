const initialState = {
  recipes: [], 
  allRecipes: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_RECIPES":
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
            case 'FILTER_BY_STATUS':
                const allRecipes = state.allRecipes
                const statusFiltered = action.payload === "created" ? state.allRecipes.filter(el => el.created) : state.allRecipes.filter(el => !el.created)
                return{
                    ...state,
                    recipes: action.payload === 'all' ? state.allRecipes : statusFiltered
                }
            case 'FILTER_BY_DIETS': // D: Revisar si está bien
                const allRecipesByDiets = state.recipes
                const statusFilteredByDiets = action.payload === "all" ? allRecipesByDiets : allRecipesByDiets.filter(el => el.status === action.payload)
                return{
                    ...state,
                    recipes: statusFilteredByDiets
                    }    
            default:
                return state;
    }
}

export default rootReducer;