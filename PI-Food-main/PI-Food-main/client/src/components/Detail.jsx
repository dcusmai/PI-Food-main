import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // D: Voy a usar Hooks
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(props){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch]);

    const myRecipe = useSelector((state) => state.detail)

    return (
        <div>
            {
                myRecipe.length > 0 ?
                <div>
                    <h1>Nombre: {myRecipe[0].name}</h1>
                    <img src={myRecipe[0].image} alt='' width='500px' height='700px'></img>
                    <h2>Resumen: {myRecipe[0].summary}</h2>
                    <p>Nivel de comida saludable: {myRecipe[0].healthScore}</p>
                    <p>Paso a paso: {myRecipe[0].steps}</p>
                    <h4>Dietas: {myRecipe[0].diets.map(el => el.name + (' '))}</h4>
                </div> : <p>Loading...</p>
            } 
        </div>
    )
}

