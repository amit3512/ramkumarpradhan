import { ADD_USER, ADD_USERS, GET_USER, UPDATE_USER, UPDATE_USERS, CLEAR_USER} from '../types';



export const userReducer = (state = {},action) =>{
     switch(action.type){
         case ADD_USER: return {users:action.payload};
         case ADD_USERS: return {users:action.payload};
         case GET_USER: return {...state,users:action.payload};
         case UPDATE_USER: return {...state,users:action.payload};
         case UPDATE_USERS: return {...state,users:action.payload};
         case CLEAR_USER: return {users:null};
         default: return state;
     }
}