import { FETCH_TRANSACTIONS, CLEAR_STATES, ADD_TRANSACTIONS, SET_TOTALS,UPDATE_TOTALS } from "../actions";

const initialState = {
    transactions : {},
    totalUSD:0,
    totalARS:0,
    accounts:[],
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
        case ADD_TRANSACTIONS:
                const transactions = { ...state.transactions };
                transactions[action.accountId] = [...transactions[action.accountId], action.payload];
                return {
                    ...state,
                    transactions
                };
        case SET_TOTALS:
            if (state.accounts.includes(action.payload._id)) {
                // Account already exists, return current state
                return state;
              }
              if (action.payload.entityName.toLowerCase().includes('ars')) {
                return {
                  ...state,
                  accounts: [...state.accounts, action.payload._id],
                  totalARS: state.totalARS + action.payload.balance
                };
              } else if (action.payload.entityName.toLowerCase().includes('usd')) {
                return {
                  ...state,
                  accounts: [...state.accounts, action.payload._id],
                  totalUSD: state.totalUSD + action.payload.balance
                };
              }
              // If entityName doesn't match 'ars' or 'usd', return current state
              return state;
        case UPDATE_TOTALS:
                  if(action.payload.currency==='ars'){
                    return {
                        ...state,
                        totalARS:  action.payload.transactionType==='credit'? state.totalARS+Number(action.payload.amount): state.totalARS-Number(action.payload.amount) 
                    };
                  } else {
                    return {
                        ...state,
                        totalUSD:  action.payload.transactionType==='credit'? state.totalUSD+Number(action.payload.amount): state.totalUSD-Number(action.payload.amount)
                    };
                  }

        case CLEAR_STATES:

            return {
                transactions : {},
                totalUSD:0,
                totalARS:0
            }
             default:
                return state
           }
       }