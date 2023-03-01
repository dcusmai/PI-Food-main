import React  from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from '../actions';

export default function SearchBar(){
    const dispatch =  useDispatch();
    const [ name, setName ] = useState("");

    function handleImputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipes(name))
    }

    return (
        <div>
            <input
                type= 'text'
                placeholder= 'Buscar...'
                onChange={(e) => handleImputChange(e)} 
            />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}