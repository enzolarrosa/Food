import axios from 'axios'

export const GET_RECIPE= 'GET_RECIPE'
export const GET_DIETS= 'GET_DIETS'
export const FILTER_DIETS= 'FILTER_DIETS'
export const ORDER_BY_NAME= 'ORDER_BY_NAME'
export const ORDER_BY_SCORE= 'ORDER_BY_SCORE'
export const GET_NAME= 'GET_NAME'
export const GET_DETAIL= 'GET_DETAIL'
export const POST_RECIPE= 'POST_RECIPE'
export const CLEAR_DETAIL= 'CLEAR_DETAIL'

export const getRecipes= () => {
    return async function (dispatch) {
        const info= await axios.get('/recipes?name=')
        return dispatch({
            type: GET_RECIPE ,
            payload: info.data
        })
    }
}

export const getName= (name) =>{
    return async function(dispatch){
        const info= await axios.get(`/recipes?name=${name}`)
        return dispatch({
            type: GET_NAME,
            payload: info.data
        })
    }
}

export const clearDetail = () => {
    return ({
        type: CLEAR_DETAIL
    })
}

export const getDiets= () => {
    return async function (dispatch) {
        const info = await axios.get('/diets')
        return dispatch({
            type: GET_DIETS,
            payload: info.data
        })
    }
}

export const filterDiets= (payload) => {
    return ({
        type: FILTER_DIETS,
        payload,
    }
    )

}


export const getDetail = (id) => {
    return async function(dispatch){
        const info= await axios.get(`/recipes/${id}`)
        return dispatch({
            type: GET_DETAIL,
            payload: info.data
        })
    }
}

export const postRecipe = (payload) => {
    return async function(dispatch){
        const info = await axios.post('/recipes',payload)
        return info
    }
}

export const orderByName = (payload) => {
    return ({
        type: ORDER_BY_NAME,
        payload
    })
}

export const orderByScore = (payload) => {
    return ({
        type: ORDER_BY_SCORE,
        payload
    })
}

