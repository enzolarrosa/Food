import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../actions";
import { Link,useHistory } from "react-router-dom";
import c from '../styles/create.module.css'

const validate = (input) => {
    const vName = /^[a-zA-Z\s]+$/ ;
    let error= {}
    if(input.name?.length === 0) {
        error.name = "write a name"
    }
    if (!vName.test(input.name)) {
        error.name = "Do not use special characters and/or numbers"
    }
    if(input.summary?.length < 5 || input.summary?.length > 200 ) {
        error.summary= "between 5 and 200 characters are allowed"
    }
    if(input.healthScore < 1 || input.healthScore >100 ) {
        error.healthScore= "choose a score from 1 to 100"
    }

    return error
}

export default function Create() {
    const dispatch= useDispatch()
    const allDiets= useSelector(state => state.diets)
    const history= useHistory()
    const [err, setErr] = useState({})
    const [input,setInput] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        image: '',
        instructions: '',
        diets: []
    })
    
    useEffect(() => {
        dispatch(getDiets())
        
    },[dispatch])
    
    
    
    
    const handleInput = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErr(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        if(err.name) { return alert("Name is Requerided")}
        if(err.healthScore) { return alert("HealthScore is Requerided")}
        if(err.summary) { return alert("Summary is Requerided")}
        if(err.diets) {return alert("At least 1 diet is required")}
        dispatch(postRecipe(input))
        history.push('/home')
    }
    
    const handleDiets = (e) => {
        if(!input.diets.includes(e.target.value)){
            setInput({
                ...input,
                diets: [...input.diets,e.target.value],
            })
        }
    }

    const handleDelete = (ev) => {
        setInput({
            ...input,
            diets: input.diets.filter( e => e !== ev)
        })
    }
    
return (
    <div className={c.contenedor} >
        
        <div className={c.divForm}>
        <form className={c.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={c.title}>Creating...</h1>
        <div className={c.contInput}>
            <div className={c.divInput} >
            <label>Name:</label>
            <input className={c.input} onChange={(e) => handleInput(e)} type="text" value={input.name} name="name"/>
            {err.name && <h5 className={c.error}>Name is requerided</h5>}
            </div>
            <div className={c.divInput} >
            <label>summary:</label>
            <textarea onChange={(e) => handleInput(e)} type="text" value={input.summary} name="summary"/>
            {err.summary && <h5 className={c.error}>Summary is requerided</h5>}
            </div>
            <div className={c.divInput} >
            <label>healthScore:</label>
            <input className={c.input} onChange={(e) => handleInput(e)} type="number" min="1" max="100" value={input.healthScore} name="healthScore"/>
            {err.healthScore && <h5 className={c.error}>HealthScore is requerided</h5>}
            </div>
            <div className={c.divInput} >
            <label>image:</label>
            <input className={c.input} onChange={(e) => handleInput(e)} type="text" value={input.image} name="image"/>
            </div>
            <div className={c.divInput} >
            <label>Diets:</label>
            <select className={c.select} onChange={(e) => handleDiets(e)}>
                {allDiets?.map(e => (<option key={e.name} value={e.name}>{e.name}</option>))}
            </select>
            </div>
            <div className={c.divInput} >
            <label>instructions:</label>
            <textarea onChange={(e) => handleInput(e)} type="text" value={input.instructions} name="instructions"/>
            </div>
        </div>
        <div className={c.divBtn} >
        <Link to='/home'><button className={c.button}>Back</button></Link>
        <button className={c.button} type="submit" >Create</button>
        </div>
        </form>
        <div className={c.dietsCont}>
        {input.diets.map( el => 
            <div className={c.diets}>
                <p key={el} className={c.p}> {el}  <button key={el} className={c.btn} onClick={() =>handleDelete(el)}>x</button></p>
                
            </div>)}
        </div>
        </div>
    </div>
)
}