import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipes, getDiets } from '../actions/index';
import { useDispatch, useSelector } from "react-redux"; // D: Voy a usar Hooks
import style from './RecipeCreate.module.css'

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un nombre';
    } else if(!input.summary){
        errors.summary = 'Se requiere un resumen';
    } else if(input.healthScore<0 || input.healthScore>100){
        errors.healthScore = 'Se requiere un punjate de alimento saludable'
    } else if(!input.steps){
        errors.steps = 'Se requieren instrucciones paso a paso'
    } else if(!input.image){
        errors.image = 'Se requiere una imagen'
    }
    return errors;
}      
        
export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: 0,
        steps: "",
        diets: [],
        image: "",
    })

    function handleChange(e){
        setInput ({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipes(input))
        alert('Ready! You created your recipe')
        setInput({
        name: "",
        summary: "",
        healthScore: 0,
        steps: "",
        diets: [],
        image: "",
        })
        history.push('/home')
    }

    function handleDelete(el){

        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== el)
        })
    }

useEffect(() =>{
    dispatch(getDiets())
}, [dispatch])

return(
    <div className={style.bodyCreate}>
        <div  className="h1Form">
            <h1 className={style.h1Letra}>Crea tu receta</h1>
        </div>
        <form className={style.form} onSubmit={(e)=>handleSubmit(e)}>
            <div className={style.formName}>
                <label>Nombre: </label>
                <input type='text' value={input.name} name='name' onChange={e=>handleChange(e)} />
                {errors.name && (<p className="error">{errors.name}</p>)}
            </div>
            <div className={style.formImage}>
                <label>Imagen: </label>
                <input type='text' value={input.image} name='image' onChange={e=>handleChange(e)} placeholder="URL" />
                {errors.image && (<p className="error">{errors.image}</p>)}
            </div>
            <div className={style.formSummary}>
                <label>Resumen del plato: </label>
                <textarea value={input.summary} name='summary' onChange={e=>handleChange(e)} rows="3" cols="45"/>
                {errors.summary && (<p className="error">{errors.summary}</p>)}
            </div>
            <div className={style.formHealthScore}>
                <label>Nivel de comida saludable: </label>
                <input type='number' value={input.healthScore} name='healthScore' onChange={e=>handleChange(e)} />
                {errors.healthScore && (<p className="error">{errors.healthScore}</p>)}
            </div>
            <div className={style.formSteps}>
                <label>Paso a Paso: </label>                
                <textarea value={input.steps} name='steps'
                rows="3" cols="45" placeholder="To make this recipe it is necessary to follow the following steps:"
                onChange={e=>handleChange(e)}/>
                {errors.steps && (<p className="error">{errors.steps}</p>)}
            </div>
            {/* <div className="formDiets"> */}
                <label className={style.formDiets}>Selecciona una o más dietas: </label>
            <select onChange={(e)=>handleSelect(e)}>
            <option value="">(Select one)</option>
                {diets.map((diet)=>(
                    <option value={diet.name}>{diet.name}</option>
                ))}
            </select>
                {input.diets.map(el=> 
                        <div className="divDiet">
                            <p>{el}</p>
                            <button className="botonX" type='button' onClick={()=> handleDelete(el)}>x</button>
                        </div> 
                )}
                {/* </div>                           */}
            

            <button className={style.buttonForm} type='submit' disabled={input.name&&input.healthScore&&input.image&&input.steps&&input.summary ? false : true} >Crear Receta</button>

        </form>
        <div className="return">
        <Link to='/home'><button className={style.return}>Volver</button></Link>
        </div>
    </div>
)

}
