import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // D: Voy a usar Hooks
import { getDetail } from "../actions";
import { useEffect, useState } from "react";

export default function Detail(props){
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id)).then(() => setLoading(false));
    }, [dispatch]);

    const myRecipe = useSelector((state) => state.detail)

    return (
             <div>
              <>
                {loading ? (
                    <div>
                         <span className={StyleSheet.loader}></span>
                         <p>Loading...</p>
                     </div>
                 ) : (  
                    <div>
                     <div>
                         <h1>Nombre: {myRecipe?.name}</h1>
                         <img src={myRecipe?.image} alt='' width='500px' height='700px'></img>
                         <h2>Resumen: {myRecipe?.summary}</h2>
                         <p>Nivel de comida saludable: {myRecipe?.healthScore}</p>
                         <p>Paso a paso: {myRecipe?.steps}</p>
                         <h4>Dietas: {myRecipe?.diets?.join(', ')}</h4>
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

    