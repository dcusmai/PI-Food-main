import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // D: Voy a usar Hooks
import { getDetail } from "../actions";
import { useEffect, useState } from "react";
import style from './Detail.module.css'

export default function Detail(props){
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id)).then(() => setLoading(false));
    }, [dispatch]);

    const myRecipe = useSelector((state) => state.detail)

    return (
             <div className={style.bodyCreate}>
              <>
                {loading ? (
                    <div className={style.detailLoading}>
                         <span className={StyleSheet.loader}></span>
                         <p>Loading...</p>
                     </div>
                 ) : (  
                    <div>
                     <div>
                         <h1 className={style.detailName}>Nombre: {myRecipe?.name}</h1>
                         <img src={myRecipe?.image} alt='' width='200px' height='300px' className={style.image}></img>
                         <h2 className={style.Summary}>Resumen: {myRecipe?.summary}</h2>
                         <p className={style.healthScore}>Nivel de comida saludable: {myRecipe?.healthScore}</p>
                         <p className={style.Steps}>Paso a paso: {myRecipe?.steps}</p>
                         <h4 className={style.Diets}>Dietas: {myRecipe?.diets?.join(', ')}</h4>
                     </div> 
                
                         <Link to='/home'>
                             <button>Volver</button>
                         </Link>
                     </div>
                  )} 
             </> 
             </div>
         )
        }

    