import React, { useState} from 'react'
import n from '../styles/nav.module.css'
import {useDispatch} from 'react-redux'
import { getName } from '../actions';
import { Link } from 'react-router-dom';
import {BiSearchAlt} from 'react-icons/bi'



export default function Nav () {

    const [input, setInput] = useState('')
    

    const dispatch= useDispatch();
    
    function handleInput(e){
        e.preventDefault()
        setInput(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getName(input))
        setInput('')

    }
    
    


    return (
        <nav className={n.nav}>
            <div className={n.search}>
            <input onChange={(e) => handleInput(e)} className={n.bus} type="search" placeholder='Recipe name...'/>
            <button onClick={(e) => handleSubmit(e)} className={n.busOne} type="submit" ><BiSearchAlt/></button>
            <div className={n.otroFilt}>
                <Link to='/create'>
                <button className={n.btn}>Create Recipe</button>
                </Link>
            </div>
            </div>

        </nav>
    ) 
}