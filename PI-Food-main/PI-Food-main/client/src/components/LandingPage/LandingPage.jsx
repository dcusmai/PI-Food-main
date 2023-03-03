import React from "react";
import { Link } from "react-router-dom";
import style from './LandingPage.module.css'; 
import Cristophe from '../../images/Cristophe3.png'

//styles/LandingPage.module.css

export default function LandingPage(){
    return(
        <div>
            <h1 className={style.bienvenidos}>Bienvenidos a mi PI</h1>
            <h3>(I'm not Christophe)</h3>
            <h2 className={style.henryfood}>HENRY | FOOD</h2>
            <nav>
            <button className={style.ingresar}>
                <Link to='/home' >
                    Ingresar
                </Link>
            </button>
            </nav>
            <img className={style.cristophe} src={Cristophe}></img>
        </div>
    )
}
