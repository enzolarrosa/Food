import React,{useState,useEffect} from "react";
import {getRecipes, getDiets, filterDiets, orderByName, orderByScore, clearDetail } from '../actions'
import {useSelector,useDispatch} from 'react-redux'
import Card from './card'
import h from '../styles/home.module.css'
import Paginado from "./Paginado.jsx";
import Footer from './footer.jsx'

export default function Home(){

    const dispatch = useDispatch()
    const allRecipes= useSelector(state => state.recipes)
    const [currentPage, setCurrentPage] = useState(1)
    const [, setOrder] = useState('')
    const [recipesPerPage, ] = useState(9)
    const lastRecipes= currentPage * recipesPerPage 
    const firtRecipes= lastRecipes - recipesPerPage
    const currentRecipe= allRecipes.slice(firtRecipes,lastRecipes)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect( ()=> {
        dispatch(getRecipes())
        dispatch(getDiets())
        dispatch(clearDetail())
    },[dispatch])


    const allDiets= useSelector( state => state.diets)

    function handleFilt (e){
       e.preventDefault();
       dispatch(filterDiets(e.target.value));
       setCurrentPage(1)
    }

    function handleOrderName (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`${e.target.value}`)

    }

    function handleOrderScore (e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1)
        setOrder(`${e.target.value}`)
    }

    return (
        <div className={h.contenedor}>
                        <div className={h.filt}>
                <div className={h.divSelect} >
                <select onChange={handleOrderName} >
                        <option value='select' >Order by name:</option>
                        <option value='a-z'>A - Z</option>
                        <option value='z-a'>Z - A</option>
                </select>
                </div>
                <div className={h.divSelect}>
                <select onChange={(e) => handleOrderScore(e)}>
                        <option value='select' >Order by Score:</option>
                        <option value='asc'>Ascendent</option>
                        <option value='desc'>Descendent</option>
                </select>
                </div>
                <div className={h.divSelect}>
                <select onChange={(e) => handleFilt(e)} >
                <option value='all'>Filter by diet:</option>
                {allDiets?.map(e => (
                        <option key={e.name} value={e.name}>{e.name}</option>
                ))}

                </select>
                </div>
            </div>
            <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado} 
            />
            <div className={h.contCards}>
            {currentRecipe.length === 0 ? <img className={h.esperando} alt="esperando" src="https://img.wattpad.com/9b67f052e1e32a97f5624536489a57f043c3e127/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f4f42734d687075417576506271413d3d2d313230373133323936392e3136646636613236366538323762626335393830333232313132332e676966" width="300px" height="300px"/> : currentRecipe.map(e => {
                return (
                <Card key={e.id} id={e.id}
                name={e.name} healthScore={e.healthScore} image={e.image? e.image : 'https://img.freepik.com/vector-gratis/vector-ilustracion-dibujos-animados-conjunto-tradicional-comida-comida-rapida_1441-331.jpg'} diets={e.diets} />
        )})}
            </div>
            <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado} 
            />
             { currentRecipe.length &&
            <Footer/>}
        </div>
    )
}



