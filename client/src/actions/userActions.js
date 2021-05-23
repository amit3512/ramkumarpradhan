import axios from 'axios';
import { Redirect } from 'react-router';
import {ADD_USER, GET_USER, CLEAR_USER} from '../types';
const url = "/users/add";



export const getUser = () => async (dispatch)=>{
  const users = await axios.get("/users").then(res=>{
    return res.data;
  })
 const data = users.users
 
   dispatch({
       type:GET_USER,
       payload:data,
   })
};

export const addUser = (data) => async (dispatch)=>{
  await axios.post("users/add",data)
    .then((data) => {
      dispatch({ type: ADD_USER, payload: data.users });
      alert("Added Successfully");
    
     
    });
    
     
};

