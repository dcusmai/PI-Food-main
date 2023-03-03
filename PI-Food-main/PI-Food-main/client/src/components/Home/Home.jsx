import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // D: Voy a usar Hooks
import { getRecipes, filterRecipesByStatus, filterRecipesByDiets, orderByName, orderByHealthScore } from "../../actions";
import { Link  } from "react-router-dom";
import Card from "../Card"
import Paginado from "../Paginado";
import SearchBar from "../SearchBar";
import style from './Home.module.css';

export default function Home(){

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes) // D: Me traigo a allRecipes todos los estados que están guardados en recipes
    const [ currentPage, setCurrentPage ] = useState(1); // D: Este estado local setea para que siempre arranque por la página 1
    const [ recipesPerPage, setRecipesPerPage ] = useState(9); // D: Este estado local setea cuántas recetas voy a visualizar por página (9)
    const indexOfLastRecipe = currentPage * recipesPerPage; // 9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // 0
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe) // D: Esto corta y devuelve un arr con las recipes actuales que están entre los índices 0 y 9 (sin el 9). Es decir, devuelve los 9 recipes mostrados en la pagina
    const [orden, setOrden] = useState('')

    const paginado = (pageNumbers) => { // D: Esta const me va a  ayudar al paginado. Lo hago acá para renderizar y me voy al comp Paginado.jsx
        setCurrentPage(pageNumbers);
    }

    useEffect (() => {
        dispatch(getRecipes());
    }, [dispatch]) // D: el [] es mi condicioón de corte para que no se produzca un loop infinito. Podría pasarle adentro condiciones como un dispatch de un estado específico. Ej si no está tal estado antes, no te montes. Como el [] está vacío, no depende de nada para montarse.

    function handleClick(event){ // D: Creo un Handler para el Botón "volver a cargar recetas". Siempre va arriba.
        event.preventDefault();
        dispatch(getRecipes()); // D: Esta fc resetea y vuelve a traer todo en caso que se buguee.
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortHealth(e){
        e.preventDefault();
        dispatch(orderByHealthScore(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterStatus(e){
        dispatch(filterRecipesByStatus(e.target.value))
    }

    function handleFilterDiets(e){
        dispatch(filterRecipesByDiets(e.target.value))
        setCurrentPage(1);
    }

    return(
        <div className={style.home}>
            <button classname={style.crearReceta}>
                <Link to='/creates'>Crear receta</Link>
            </button>
            <h1 className={style.bienvenidos}>Bienvenidos a la Cocina de Henry!</h1>
            <button onClick={event => {handleClick(event)}}>
                Volver a cargar recetas
            </button>
            <div>
                <select onChange={e => handleSort(e)}> // D: Ordenar alfabéticamente
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select onChange={e => handleSortHealth(e)}> // D: Ordenar por puntaje alimento saludable
                    <option value='mas'>Health Score Ascendente</option> // D: Ordena de más a menos saludable healtScore.
                    <option value='menos'>Health Score Descendente</option> 
                </select>
                <select onChange={e => handleFilterStatus(e)}> // D: Filtrar por Todos, Creados en mi db y Traidos de la API
                    <option value='all'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>API</option>
                </select>
                <select onChange={e => handleFilterDiets(e)}>
                    <option value="all">all</option>
                    <option value="gluten free">gluten free</option>
                    <option value="ketogenic">ketogenic</option>
                    <option value="vegetarian">vegetarian</option>
                    <option value="lacto-vegetarian">lacto-vegetarian</option>
                    <option value="ovo-vegetarian">ovo-vegetarian</option>
                    <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
                    <option value="vegan">vegan</option>
                    <option value="pescetarian">pescetarian</option>
                    <option value="paleolithic">paleolithic</option>
                    <option value="primal">primal</option>
                    <option value="low fodmap">low fodmap</option>
                    <option value="whole 30">whole 30</option>
                    <option value="dairy free">dairy free</option>
                </select>
                <Paginado 
                recipesPerPage = {recipesPerPage}
                allRecipes = {allRecipes.length}
                paginado = {paginado}
                />
        <SearchBar></SearchBar>
        </div>
                {currentRecipes?.map((el) => {
                        return(
                            <div classname='cartas'>
                                <Link to={`/detail/${el.id}`}>
                                    <Card name={el.name} diet={el.diets} image={el.image} key={el.id}></Card>
                                </Link>
                            </div>
                        )                        
                    })    
                }
        </div>
    )
}