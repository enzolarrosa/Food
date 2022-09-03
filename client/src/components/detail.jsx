import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from "react-router-dom";
import { getDetail} from '../actions/index'
import d from '../styles/detail.module.css'
import Footer from './footer'


export default function Detail(){

    const {id} =useParams()

    const dispatch= useDispatch()

     useEffect(() => {
        dispatch(getDetail(id))
     },[dispatch, id])

    const MyRecipe= useSelector(state => state.recipesDetail)

    return (
        <>
        {MyRecipe.length === 0? <img className={d.esperando} alt="esperando" src="https://img.wattpad.com/9b67f052e1e32a97f5624536489a57f043c3e127/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f4f42734d687075417576506271413d3d2d313230373133323936392e3136646636613236366538323762626335393830333232313132332e676966" width="300px" height="300px"/> :
        <div className={d.cont}>
            <Link to='/home'>
         <button className={d.btn}>Back</button>
            </Link>
        <div className={d.contenedor}>
            <div className={d.one}>
                <h1>{MyRecipe.name}</h1>
            </div>
            <div className={d.two}>
                <img alt="Recipe" src={MyRecipe.image} className={d.img}/>
                <div className={d.diets}>
                    <h2>Diets Types</h2>
                    {MyRecipe.diets?.map(e => <p key={e}>{e}</p>)}
                </div>
            </div>
            <div className={d.three}>
                <p>Health Score: {MyRecipe.healthScore}</p>
            </div>
            <div className={d.four}>
                <div className={d.text}>
                    <h3>Summary</h3>
                    <p>{MyRecipe.summary && MyRecipe.summary.replace(/<\/?[^>]+(>|$)/g, ' ')}</p>
                </div>
                {MyRecipe.instructions &&
                <div className={d.textt}>
                    <h3>Instructions</h3>
                    <p>{MyRecipe.instructions.replace(/<\/?[^>]+(>|$)/g, ' ')}</p>
                </div>}
            </div>
        </div>
        </div>}
        { MyRecipe.length &&
        <Footer/>
        }
        </>
    )
}