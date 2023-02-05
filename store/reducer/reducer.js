import { FETCH_TRANSACTIONS, CLEAR_TRANSACTIONS } from "../actions";

const initialState = {
    transactions : {},
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case FETCH_TRANSACTIONS:
            if(state.transactions.hasOwnProperty(action.id)){
                return {
                    ...state,
                    transactions: {...state.transactions.filter(t=>Object.keys(t)[0]===action.accountId), [action.id]: action.payload},
                }
            } else {
            return {
                ...state,
                transactions: {...state.transactions, [action.id]: action.payload},
             }}
        case CLEAR_TRANSACTIONS:

            return {
                ...state,
                transactions: {},
             }
             default:
                return state
           }
       }