import axios from 'axios';
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const SET_TOTALS = 'SET_TOTALS';
export const UPDATE_TOTALS = 'UPDATE_TOTALS';
export const CLEAR_STATES = 'CLEAR_STATES';

export function fetchTransactions(accountId){
    return async (dispatch)=>{

        try {
            const {data} = await axios.get(`http://localhost:3000/api/transactions/?accountId=${accountId}`)
            return dispatch({
                type:FETCH_TRANSACTIONS,
                payload:data,
                id:accountId
             })
        } catch (e) {
            e=>alert(e)
        }
    
}
} 
export function addTransactions(accountId, payload){
    return async (dispatch)=>{

        try {
            return dispatch({
                type:ADD_TRANSACTIONS,
                payload,
                accountId
             })
        } catch (e) {
            e=>alert(e)
        }
    
}
} 
export function setTotals(payload){
    return async (dispatch)=>{

        try {
            return dispatch({
                type:SET_TOTALS,
                payload,
             })
        } catch (e) {
            e=>alert(e)
        }
    
}
} 
export function updateTotals(payload){
    return async (dispatch)=>{

        try {
            return dispatch({
                type:UPDATE_TOTALS,
                payload,
             })
        } catch (e) {
            e=>alert(e)
        }
    
}
} 

export function clearStates(){

        return { type: CLEAR_STATES }

} 