import axios from "axios";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import {getUser} from "../actions/userActions";

const Info = () =>{

const data = useSelector((state)=>state.users.users);
const dispatch = useDispatch();

const onDelete = (id) =>{
    axios.delete(`/users/delete/${id}`).then(()=>{
    dispatch(getUser());
    });
    
}

useEffect(() => {
   
    dispatch(getUser());
},[]);

 
    return(
        <div>
            {!localStorage.getItem("user")?(
                <div>
                    <Redirect to="/signIn" />
                </div>
            ):(
                <div className="container">
                <div className="row">
                <div className="col-lg-1">
                    <button className="btn btn-success">Excel Export</button>
                </div>
                    <div className="col-lg-10">
                             <table className="table table-border">
                                 <thead>
                                     <tr>
                                         <th>मिति</th>
                                         <th>नाम</th>
                                         <th>फोन न.</th>
                                         <th>विवरण</th>
                                         <th>पाएको रकम(रु.)</th>
                                         <th>दिईसकेको रकम(रु.)</th>
                                         <th>लिन वा दिन बाकि(रु.)</th>
                                         <th>कैफियत</th>
                                         <th></th>
    
                                     </tr>
                                 </thead>
                            
                                        <tbody>
                                     {!data?
                                     (
                                         <div>
                                             .....Loading
                                         </div>
                                     ):(data && data.map((user,index)=>{
                                        return (
                                            <tr key={index+1}>
                                            <td>{user.date}</td>
                                            <td>{user.name}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.desc}</td>
                                            <td>{user.take}</td>
                                            <td>{user.give}</td>
                                            <td>{user.remain}</td>
                                            <td className={user.brief}>{user.brief}</td>
                                            <td className="EditDeleteButton">
                                                <a href={`user/${user._id}`}><button className="btn btn-info">Edit</button></a>
                                               <button onClick={()=>onDelete(`${user._id}`)}  className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                        )
                                    }
                                       
   
                                    
                                             
                                       ))}
                                     
                                        
                                    </tbody>
                               
                             </table>
                             <div className="AddButton">
                                 <a href="/main"><button>Add User</button></a>
                             </div>
                    </div>
                </div>
            </div>
             )} 
        </div>
        
    )
}

export default Info;
