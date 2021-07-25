  
import React,{useState,useContext,} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import axios from 'axios';
const Reset  = ()=>{
    const history = useHistory()
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch('/signIn/reset-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signIn')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
      <div className="mycard text-center mt-5">
          <div className="card auth-card input_box p-2">
           <h4>RESET PASSWORD</h4>
           <label htmlFor="resetPassword">Type your Email</label><br/>
            <input
            id="resetPassword"
            className="my-3"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            /> <br />
            <button className="btn btn-primary mt-3"
            onClick={()=>PostData()}
            >
              Submit
            </button>
            
    
        </div>
      </div>
   )
}


export default Reset;