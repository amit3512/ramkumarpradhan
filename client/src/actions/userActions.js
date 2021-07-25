import axios from 'axios';
import {ADD_USER, ADD_USERS, GET_USER, UPDATE_USER, UPDATE_USERS} from '../types';

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

export const addUser = (formData) => async (dispatch)=>{
  // const token = JSON.parse(localStorage.getItem('user'));
  await axios.post("http://localhost:3333/users/add",formData,{
    headers: {
     'Content-type':'multipart/form-data',
             }
     })
    .then((data) => {
      dispatch({ type: ADD_USER, payload: data.users });
      alert("Added Successfully");
      });
};

export const updateUser = (id,formData) => async (dispatch)=>{
  // const token = JSON.parse(localStorage.getItem('user'));
  await axios.put(`http://localhost:3333/users/update/${id}`,formData,{
    headers: {
     'Content-type':'multipart/form-data',
             }
     })
    .then((data) => {
      dispatch({ type: UPDATE_USER, payload: data.users });
      alert("Updated Successfully");
      });
};


export const addUsers = (formData) => async (dispatch)=>{
  // const token = JSON.parse(localStorage.getItem('user'));
  await axios.post("http://localhost:3333/users/adds",formData,{
    headers: {
     'Content-type':'multipart/form-data',
             }
     })
    .then((data) => {
      dispatch({ type: ADD_USERS, payload: data.users });
      alert("Added Successfully");
      });
};


export const updateUsers = (id,formData) => async (dispatch)=>{
  // const token = JSON.parse(localStorage.getItem('user'));
  await axios.put(`http://localhost:3333/users/updates/${id}`,formData,{
    headers: {
     'Content-type':'multipart/form-data',
             }
     })
    .then((data) => {
      dispatch({ type: UPDATE_USERS, payload: data.users });
      alert("Updated Successfully");
      });
};

export const deleteUser = (id) => async (dispatch)=>{
 
  const token = JSON.parse(localStorage.getItem('user'));
    axios.delete(`/users/delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`${token.token}`
        }
        }).then(()=>{
    dispatch(getUser());
    });
};

