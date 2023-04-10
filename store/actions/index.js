import axios from 'axios';
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const SET_TOTALS = 'SET_TOTALS';
export const UPDATE_TOTALS = 'UPDATE_TOTALS';
export const UPDATE_ACC_BALANCE = 'UPDATE_ACC_BALANCE';
export const CLEAR_STATES = 'CLEAR_STATES';
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'
export const SET_TRANSACTIONS_PER_YEAR = 'SET_TRANSACTIONS_PER_YEAR'




export function fetchAccounts(accountId){
    return async (dispatch)=>{
        try {
            const {data} = await axios.get(`https://myfin-sergioomarsanchez.vercel.app/api/accounts/?userId=` + accountId )
            return dispatch({
                type:FETCH_ACCOUNTS,
                payload:data,
             })
        } catch (e) {
            e=>alert(e)
        }
    
}
} 
export function fetchTransactions(accountId){
    return async (dispatch)=>{

        try {
            const {data} = await axios.get(`https://myfin-sergioomarsanchez.vercel.app/api/transactions/?accountId=${accountId}`)
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
export function addAccount(payload){
    return async (dispatch)=>{

        try {
            return dispatch({
                type:ADD_ACCOUNT,
                payload
             })
        } catch (e) {
            e=>alert(e)
        }
    
}
} 
export function setTransactionsPerYear(payload){
    return async (dispatch)=>{

        try {
            return dispatch({
                type:SET_TRANSACTIONS_PER_YEAR,
                payload,
             })
        } catch (e) {
            e=>alert(e)
        }
    
}
} 
export function deleteTransaction(accountId, transactionId){
    return async (dispatch)=>{

        try {
            return dispatch({
                type:DELETE_TRANSACTION,
                payload:transactionId,
                accountId
             })
        } catch (e) {
            e=>alert(e)
        }
    
}
} 
export function deleteAccount(accountId, balance, entityName){
    return async (dispatch)=>{

        try {
            return dispatch({
                type:DELETE_ACCOUNT,
                payload:accountId,
                balance,
                entityName
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
export function updateAccBalance(payload){
    return async (dispatch)=>{

        try {
            return dispatch({
                type:UPDATE_ACC_BALANCE,
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