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

export function getNameRecipes(name){ // D: name es lo que llega por payload
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/recipes/name=" + name);
            return dispatch({
                type: "GET_NAME_RECIPES",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDiets(){
    return async function (dispatch) {
        const info = await axios.get ("http://localhost:3001/diets", {});
        return dispatch({ type: "GET_DIETS", payload: info.data});
    };
};

export function postRecipes(payload){
    return async function (dispatch) {
        const response = await axios.post ("http://localhost:3001/recipes", payload);
        return response;
    };
};

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}
export function orderByHealthScore(payload){
    return{
        type: "ORDER_BY_HEALTH",
        payload
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
export function filterCreated(payload){
    return{
        type: 'FILTER_CRATED',
        payload
    }
}
export function getDetail(id){
    return async function  (dispatch) {
        try {
            let json = await  axios.get ("http://localhost:3001/recipes" + id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log('Error');
        }
    }
}