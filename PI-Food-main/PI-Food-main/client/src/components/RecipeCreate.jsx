import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipes, getDiets } from '../actions/index';
import { useDispatch, useSelector } from "react-redux"; // D: Voy a usar Hooks

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un nombre';
       } else if (!input.summary){
        errors.summary = 'Se requiere un resumen';
       } else if (!input.healthScore){
        errors.healthScore = 'Se requiere un punjate de alimento saludable';
       } else if (!input.steps){
        errors.steps = 'Se requieren instrucciones paso a paso';
       } else if (!input.image){
        errors.image = 'Se requiere una imagen';
       } else if(!input.diets){
        errors.diets = 'Se requieren los tipos de dieta';
       };
       return errors;
}

export default function RecipeCreate(){
    const dispatch =  useDispatch();
    const diets = useSelector((state) => state.diets);
    const history = useHistory();
    const [ errors, setErrors ] = useState({});

    const [ input, setInput ] = useState({ // D: En este objeto me voy a guardar el Post que estoy creando.
        name: "",
        image: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: [],
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.targer.value
        }));
    }

    useEffect(() => {
        dispatch(getDiets());
    }, []);

    const handleSelect = (e) => {
        setInput({
            ...input,
            typeOfDiet: [...input.typeOfDiet, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postRecipes(input));
        alert("Receta creada");
        setInput({
            name: "",
            image: "",
            summary: "",
            healthScore: "",
            steps: "",
            diets: [],
        })
        history.push('/home');
    }
    
    const handleDelete = (el) => {
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== el)
        })
    }
    

    return(
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Creá tu receta!</h1>
            <form onSubmit={(e) => {handleSubmit(e)}}> 
                <div>
                    <label>Nombre:</label>
                    <input 
                        type='text' 
                        value={input.name}
                        name='name'
                        onChange={(e) => {handleChange(e)}}
                    />
                    {errors.name && (
                        <p classname='error'>{errors.name}</p>
                    )};
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                    type='text' 
                    value={input.image}
                    name='image'
                    onChange={(e) => {handleChange(e)}}
                    />
                    {errors.image && (
                        <p classname='error'>{errors.image}</p>
                    )};
                </div>
                <div>
                    <label>Resumen del plato:</label>
                    <input
                    type='text' 
                    value={input.summary}
                    name='summary'
                    onChange={(e) => {handleChange(e)}}
                />
                {errors.summary && (
                        <p classname='error'>{errors.summary}</p>
                    )};
                </div>
                <div>
                    <label>Nivel de comida saludable:</label>
                    <input 
                    type='number' 
                    value={input.healthScore}
                    name='healthScore'
                    onChange={(e) => {handleChange(e)}}
                />
                {errors.healthScore && (
                        <p classname='error'>{errors.healthScore}</p>
                    )};
                </div>
                <div>
                    <label>Paso a paso:</label>
                    <input
                    type='text' 
                    value={input.steps}
                    name='steps'
                    onChange={(e) => {handleChange(e)}}
                />
                {errors.steps && (
                        <p classname='steps'>{errors.name}</p>
                    )};
                </div>

                <select onChange={e=> handleSelect(e)}> // D: Para poder seleccionar los tipos de dieta
                <option value="s">Tipo de dieta:</option>
                    {                        
                    diets.map( d => {
                        return (
                       <option key={d.name} value={d.name}>{d.name}</option>
                       )
                    })            
                    }
                {errors.diets && (
                        <p classname='error'>{errors.diets}</p>
                    )};
                </select>
                <ul><li>{input.typeOfDiet.map(el => el + ", ")}</li></ul>

                <button type='submit'>Crear Receta</button>

            </form>
            {input.diets.map(el => 
                <div classname= 'divDiets'>
                    <p>{el}</p>
                    <button classname='botonX' onclick={() => handleDelete(el)}>X</button>
                </div>
            )}
        </div>
    )
}

