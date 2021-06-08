import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getUser, deleteUser} from "../actions/userActions";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


const Info = () =>{

const data = useSelector((state)=>state.users.users);
const dispatch = useDispatch();

const onDelete = (id) =>{
    dispatch(deleteUser(id));
}

useEffect(async () => {
       await dispatch(getUser(data));
},[data]);

const multiDataSet = [
    
    {
        columns: [
            {title:"Date"}, {title:"Name"},{title:"Phone No."}, {title:"Description"}, {title:"Money Taken"},{title:"Money to Give"}, {title:"Remain"}, {title:"Brief"},
        ],
            
       
        data: data!==undefined?(data.map(data=>
            [
                {value:data.date},{value:data.name},{value:data.phone},{value:data.desc},{value:data.take},{value:data.give},{value:data.remain},{value:data.brief},
   
   ]
            )):(null) 
            


      
    },
];

if (data === undefined) {
    return <h4 alt="loading..." className="text-center mt-5"> Loading People... </h4>
  }
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
                </div>
                    <div className="col-lg-10">
                        {data.length > 0 ?(
                            <ExcelFile filename="ramkumar" element={<button type="button" className="excelButton btn btn-success m-3">Export Data</button>}>
                               <ExcelSheet dataSet={multiDataSet} name="Organization"/>
                            </ExcelFile>
                        ):(null)}
                            
                             <table className="table table-border">
                             
                                 <thead>
                                     <tr>
                                         <th>मिति</th>
                                         <th>नाम</th>
                                         <th>फोन न.</th>
                                         <th>विवरण</th>
                                         <th>लिएको</th>
                                         <th>दिएको</th>
                                         <th>लिन/दिन बाकि</th>
                                         <th>कैफियत</th>
                                         <th></th>
                                         <th></th>
    
                                     </tr>
                                 </thead>
                                    
                                 {data.map((user,index)=>{
                                        return (
                                        <tbody key={index+1}>
                                    
                                            <tr>
                                            <td>{user.date}</td>
                                            <td>{user.name}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.desc}</td>
                                            <td>{user.take}</td>
                                            <td>{user.give}</td>
                                            <td>{user.remain}</td>
                                            <td className={user.brief}>{user.brief}</td>
                                            <td >{user.image.map((x,index)=><img key={index} src={x} className="profile_image" alt="profile img"/>)}</td>
                                            <td className="EditDeleteButton">
                                                <a href={`user/${user._id}`}><button className="btn btn-warning m-1">Edit</button></a>
                                               <button className="btn btn-danger" onClick={()=>onDelete(`${user._id}`)}>Delete</button>
                                            </td>
                                        </tr>
                                    
                                     
                                        
                                    </tbody>
                                            )
                                        })}
                                        


                                                
                                        
                             </table>
                             <div className="AddButton">
                                 <a href="/main"><button className="btn btn-primary">Add User</button></a>
                             </div>
                    </div>
                </div>
            </div>
             )} 
        </div>
        
    )
}

export default Info;