import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import {useDispatch} from 'react-redux';
import React, { useState, useEffect } from 'react';
import {addUser, addUsers, updateUser, updateUsers} from '../actions/userActions';
import axios from 'axios';
import {Redirect} from 'react-router-dom';


const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function Main(props) {
    const [all] = useState(initialExpenses);
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [desc, setDesc] = useState("");
    const [take, setTake] = useState("");
    const [give, setGive] = useState("");
    const [remain, setRemain] = useState("");
    const [brief, setBrief] = useState("");
    const [image, setImage] = useState("");
    const [redirect, setRedirect] = useState(false);
    
    // const users = useSelector((state)=>state.users.users);
    const dispatch = useDispatch();
 

    useEffect(() => {
       
        getPosts();
        localStorage.getItem("user", JSON.stringify(all));
        
      },[all]);

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

      const handleImage = e => {
        
        setImage(e.target.files);
      };


const handleSubmit = (e) => {
        e.preventDefault();
        // const data = {date,name,phone,desc,take,give,remain,brief}
        const formData = new FormData();
        

       for (let i = 0; i < image.length; i++) {
          formData.append("image", image[i])
        }
        formData.append("date",date);
        formData.append("name",name);
        formData.append("phone",phone);
        formData.append("desc",desc);
        formData.append("take",take);
        formData.append("give",give);
        formData.append("remain",remain);
        formData.append("brief",brief);
        dispatch(addUsers(formData));
        setRedirect(true);
}

const handleUpdate = (e) => {
  const id = props.match.params.id;
  e.preventDefault();
        // const data = {date,name,phone,desc,take,give,remain,brief}
        const formData = new FormData();
        for (let i = 0; i < image.length; i++) {
          formData.append("image", image[i])
        }
        
        
        formData.append("date",date);
        formData.append("name",name);
        formData.append("phone",phone);
        formData.append("desc",desc);
        formData.append("take",take);
        formData.append("give",give);
        formData.append("remain",remain);
        formData.append("brief",brief);
        dispatch(updateUsers(id,formData));
        setRedirect(true);
}

const getPosts=()=>{
  const id =props.match.params.id;

  axios.get(`/users/${id}`).then((res)=>{
    if(res.data.success){
     setImage(res.data.user.image);
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
              handleImage={handleImage}
            
              name={name}
              phone={phone}
              desc={desc}
              take={take}
              give={give}
              remain={remain}
              brief={brief}
              image={image}
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
              handleImage={handleImage}
              date={date}
              name={name}
              phone={phone}
              desc={desc}
              take={take}
              give={give}
              remain={remain}
              brief={brief}
              image={image}
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