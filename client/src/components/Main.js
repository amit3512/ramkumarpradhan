import CreateUser from './CreateUser';
import {useSelector, useDispatch} from 'react-redux';
import React, { useState, useEffect } from 'react';
import {addUser} from '../actions/userActions';
import UpdateUser from './UpdateUser';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function Main(props) {
    const [all, setAll] = useState(initialExpenses);
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [desc, setDesc] = useState("");
    const [take, setTake] = useState("");
    const [give, setGive] = useState("");
    const [remain, setRemain] = useState("");
    const [brief, setBrief] = useState("");
    const [redirect, setRedirect] = useState(false);
    
    const users = useSelector((state)=>state.users.users);
    const dispatch = useDispatch();
    // console.log(users);

    useEffect(() => {
        console.log("called");
        getPosts();
        localStorage.setItem("users", JSON.stringify(all));
        
      }, [all]);

      const handleDate = e => {
        setDate(e.target.value);
      };

      const handleName = e => {
        setName(e.target.value);
      };
    
      const handlePhone = e => {
        setPhone(e.target.value);
      };

      const handleDesc = e => {
        setDesc(e.target.value);
      };
    
      const handleTake = e => {
        setTake(e.target.value);
      };
      
      const handleGive = e => {
        setGive(e.target.value);
      };

      const handleRemain = e => {
        setRemain(e.target.value);
      };

      const handleBrief = e => {
        setBrief(e.target.value);
      };


const handleSubmit = (e) => {
        e.preventDefault();
        const data = {date,name,phone,desc,take,give,remain,brief}
        dispatch(addUser(data));
        setRedirect(true);
}

const handleUpdate = (e) => {
  const id = props.match.params.id;
  e.preventDefault();
  const data = {date,name,phone,desc,take,give,remain,brief}
  console.log(data);
  
  
  axios.put(`http://localhost:3333/users/update/${id}`,data).then((res)=>{
    if (res.data.success){
        alert("Edited Successfully")
        
                        }
   }
   
  )
  
}

const getPosts=()=>{
  const id =props.match.params.id;
  console.log(id)
  axios.get(`http://localhost:3333/users/${id}`).then((res)=>{
    if(res.data.success){
     setDate(res.data.user.date);
     setName(res.data.user.name);
     setPhone(res.data.user.phone);
     setDesc(res.data.user.desc);
     setTake(res.data.user.take);
     setGive(res.data.user.give);
     setRemain(res.data.user.remain);
     setBrief(res.data.user.brief);
      
    }
  })
};



return(
  <div>
                 {redirect?(
             <div> 
                <Redirect to="/" />
             </div>
         ):(
          <div className="container">
          {
            !props.match.params.id?
            (
              <CreateUser 
              handleDate={handleDate}
              handleName={handleName}
              handlePhone={handlePhone}
              handleDesc={handleDesc}
              handleTake={handleTake}
              handleGive={handleGive}
              handleRemain={handleRemain}
              handleBrief={handleBrief}
            
              name={name}
              phone={phone}
              desc={desc}
              take={take}
              give={give}
              remain={remain}
              brief={brief}
              handleSubmit={handleSubmit}
              />
            ):(
              <UpdateUser
              handleDate={handleDate}
              handleName={handleName}
              handlePhone={handlePhone}
              handleDesc={handleDesc}
              handleTake={handleTake}
              handleGive={handleGive}
              handleRemain={handleRemain}
              handleBrief={handleBrief}
              name={name}
              phone={phone}
              desc={desc}
              take={take}
              give={give}
              remain={remain}
              brief={brief}
              handleSubmit={handleUpdate}
              />
            )
          }
            
            
        </div>
         )

         }  

  </div>
     );
}

export default Main;