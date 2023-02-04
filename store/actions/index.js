import axios from 'axios';
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';

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