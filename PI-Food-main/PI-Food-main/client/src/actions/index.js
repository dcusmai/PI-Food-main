import axios from "axios"; // D: Acá en las actions no vamos a hacer ningún tipo de lógica nunca. La función es solo despachar un tipo. La lógica va en reducer o componente.


export function getRecipes(){
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/recipes", {}); // D: IMPORTANTE: Acá se conecta el Front con el Back

        return dispatch({
            type: "GET_RECIPES",
            payload: json.data
        })
    } 
}
export function filterRecipesByStatus(payload){ // D: Va a filtrar por "Todos, DB y API". 
    return{
        type:'FILTER_BY_STATUS',
        payload
    }
}
export function filterRecipesByDiets(payload){ // D: Va a filtrar por "all, gluten free, ketogenic...". REVISAR
    return{
        type:'FILTER_BY_DIETS',
        payload
        }
}