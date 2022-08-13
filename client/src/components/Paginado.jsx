import React from "react";
import c from '../styles/card.module.css'

export default function Paginado({recipesPerPage, allRecipes, paginado}) {
    const pageNumbers= []

    for(let i=0; i<= Math.floor(allRecipes/recipesPerPage) ; i++){
        pageNumbers.push(i+1)
    }

    return (
        <nav className={c.nav}>
            <ul className={c.ul}>
                {pageNumbers.length && pageNumbers.map( n => {
                    return (
                        <li className={c.li} key={n}>
                        <button onClick={() => paginado(n)}>{n}</button>
                        </li>
                        )
                })}
            </ul>
        </nav>
    )
}