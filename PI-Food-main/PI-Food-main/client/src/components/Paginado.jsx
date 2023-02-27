import React from "react";

export default function Paginado ({ recipesPerPage, allRecipes, paginado }) { // D: declaro mi paginado y me traigo las propiedades
    const pageNumbers = []; // D: Declaro un arr vacío

    for( let i = 0; i <= Math.ceil(allRecipes/recipesPerPage); i++){ // D: Voy a recorrer un arr, en el que voy a tomar el nro redondo que resulta de dividir todas las recetas por la cantidad de recetas por página y lo voy a pushear en mi arr vacío.
        pageNumbers.push(i+1)
    }
    return(
        <nav>
            <ul className="paginado">
                { pageNumbers && // D: Si tengo algo en este arr, mapealo y devolveme cada uno de los nros que te devuelva el paginado.
                pageNumbers.map(number => (
                    <li className="number" key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}