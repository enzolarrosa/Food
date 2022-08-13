import React from "react";
import { Link } from "react-router-dom";
import c from '../styles/card.module.css'

export default function Card({id,name,healthScore,image,diets}){

    return (
        <div key={id} className={c.card}>
            <div className={c.conteOne}>
            <Link to={'/detail/' + id}>
            <div className={c.divImg}><img className={c.img} alt='Recipe' src={`${image}`}/></div>
            <p className={c.nameOne}>{name}</p>
            </Link>
            <p className={c.parraf}>healthScore: {healthScore}</p>
            { diets.length !==0 &&
            <p className={c.parraf} >Diets: {diets.map(e => {return e.name + '. '})}</p>
            }
            </div>
        </div>
    )
}