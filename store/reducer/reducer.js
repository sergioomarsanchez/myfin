import { FETCH_TRANSACTIONS, CLEAR_STATES, ADD_TRANSACTIONS, SET_TOTALS,UPDATE_TOTALS, FETCH_ACCOUNTS, DELETE_TRANSACTION, UPDATE_ACC_BALANCE, DELETE_ACCOUNT, SET_TRANSACTIONS_PER_YEAR } from "../actions";

const initialState = {
    transactions : {},
    totalUSD:0,
    totalARS:0,
    accounts:[],
    allAccounts:[],
    transactionsPerYear:{}
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case FETCH_ACCOUNTS:
            return {
                ...state,
                allAccounts: action.payload,
             }
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
        case SET_TRANSACTIONS_PER_YEAR:
                return {
                    ...state,
                    transactionsPerYear: action.payload
                };
        case DELETE_TRANSACTION:
          const transactionFiltered = state.transactions[action.accountId].filter(transaction => transaction._id !== action.payload);
          return {
            ...state,
            transactions: {
              ...state.transactions,
              [action.accountId]: transactionFiltered
            }
          };
        case DELETE_ACCOUNT:
          const filteredAccounts = Object.keys(state.transactions).filter(key=>key!==action.payload)
          .reduce((acc, key)=>{
            acc[key]=state.transactions[key];
            return acc
          }, {})

          if(action.entityName.includes('ars')){
            return {
              ...state,
              allAccounts: state.allAccounts.filter(acc=>acc._id!==action.payload),
              accounts:state.accounts.filter(acc=>acc!==action.payload),
              transactions: filteredAccounts,
              totalARS: state.totalARS-action.balance
            } 
          } else {
          return {
            ...state,
            allAccounts: state.allAccounts.filter(acc=>acc._id!==action.payload),
            accounts:state.accounts.filter(acc=>acc!==action.payload),
            transactions: filteredAccounts,
            totalUSD: state.totalUSD - action.balance
          };
        }
        case SET_TOTALS:
          if (state.accounts.includes(action.payload._id)) {
            return state;
          }
              if (action.payload.entityName.toLowerCase().includes('ars')) {
                return {
                  ...state,
                  accounts: [...state.accounts, action.payload._id],
                  totalARS: state.totalARS + action.payload.balance,
                };
              } else if (action.payload.entityName.toLowerCase().includes('usd')) {
                return {
                  ...state,
                  accounts: [...state.accounts, action.payload._id],
                  totalUSD: state.totalUSD + action.payload.balance,
                };
              }
              return state;
        case UPDATE_ACC_BALANCE:
                  const accToUpdate = allAccounts.find(account=>{account._id===action.payload.id})
                return {
                    ...state,
                    allAccounts:  [...state.allAccounts.filter(account=>{account._id!==action.payload.id}), {...accToUpdate, balance:action.payload.newBalance}]
                };
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
                totalARS:0,
                accounts:[],
                allAccounts:[],
                transactionsPerYear:{}
            }
             default:
                return state
           }
       }