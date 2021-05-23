import {ADD_USER,GET_USER,CLEAR_USER} from '../types';



export const userReducer = (state = {},action) =>{
     switch(action.type){
         case ADD_USER: return {users:action.payload};
         case GET_USER: return {...state,users:action.payload};
         case CLEAR_USER: return {users:null};
         default: return state;
     }
}