import { GET_RECIPE, GET_DIETS, FILTER_DIETS, ORDER_BY_NAME, ORDER_BY_SCORE, GET_NAME,POST_RECIPE, GET_DETAIL, CLEAR_DETAIL} from "../actions";


const initialState= {
    allRecipes: [],
    recipes: [],
    recipesDetail: [],
    diets: []
}

const rootReducer= (state= initialState, action) =>{
    switch(action.type){
       case GET_RECIPE :
        return {
            ...state,
            allRecipes: action.payload,
            recipes: action.payload
        }
        case GET_DIETS :
        return {
            ...state,
            diets: action.payload
        }
        case FILTER_DIETS:
        const all= state.allRecipes
        const filtrado= action.payload === 'all'? all : 
        all.filter((e) => e.diets.includes(action.payload) || e.diets.find(e => e.name=== action.payload))
        console.log(filtrado)
        return {
            ...state,
            recipes: filtrado
        }
        case GET_DETAIL :
        return {
            ...state,
            recipesDetail: action.payload,
        }
        case CLEAR_DETAIL:
        return {
            ...state,
            recipesDetail: []
        }
        case GET_NAME :
        return {
            ...state,
            recipes: action.payload
        }
        case POST_RECIPE :
            return {
                ...state,
            }
        case ORDER_BY_NAME:
        const orderN= action.payload === 'select' ? state.recipes :
        action.payload === 'a-z' ? state.recipes.sort((a,b) => {
            if(a.name < b.name) {return -1}
            if(a.name > b.name) {return 1}
            return 0
        }) 
        : state.recipes.sort((a,b) => {
            if(a.name < b.name) {return 1}
            if(a.name > b.name) {return -1}
            return 0
        })
        return {
            ...state,
            recipes: orderN

        }
        case ORDER_BY_SCORE:
            const orderS= action.payload === 'select' ? state.recipes :
            action.payload === 'asc' ? state.recipes.sort((a,b) => {
                if(a.healthScore < b.healthScore) {return -1}
                if(a.healthScore > b.healthScore) {return 1}
                return 0
            }) 
            : state.recipes.sort((a,b) => {
                if(a.healthScore < b.healthScore) {return 1}
                if(a.healthScore > b.healthScore) {return -1}
                return 0
            })
            return {
                ...state,
                recipes: orderS
    
            }
        default: return state;
    }
}

export default rootReducer;