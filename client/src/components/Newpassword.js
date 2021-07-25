import React,{useState} from 'react';
import {Link,useHistory,useParams} from 'react-router-dom';
import M from 'materialize-css';
import Alert from "./Alert";
const SignIn  = ()=>{
    const history = useHistory()
    const [alert,setAlert] = useState({show:false});
    const [password,setPassword] = useState("");
    const [newpassword,setNewPassword] = useState("");
    const {token} = useParams();
    console.log(token)
    const handleAlert = ({ type, text }) => {
        setAlert({ show: true, type, text });
        setTimeout(() => {
          setAlert({ show: false });
        }, 1500);
      };

    const PostData = ()=>{
        if (password === newpassword && password !== ""){
            fetch("/signIn/new-password",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    password,
                    token
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
               if(data.error){
                  M.toast({html: data.error,classes:"#c62828 red darken-3"})
               }
               else{
    
                   M.toast({html:data.message,classes:"#43a047 green darken-1"})
                   history.push('/signin')
               }
            }).catch(err=>{
                console.log(err)
            })
        }else{
            handleAlert({
                type: "danger",
                text:"Password Didn't Match"
            })
        }
       
    }
   return (
      <div className="mycard text-center mt-3 px-3">
          <div className="card auth-card input_box">
            <h2>New Password</h2> <br />
            <label>Password</label> <br />
            <input
            type="password"
            placeholder="enter a new password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />  <br />
            
            <label>Confirm Password</label> <br />
            <input
            type="password"
            className="mt-2"
            placeholder="enter confirm password"
            value={newpassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            />  <br />
            {alert.show && <h5><Alert type={alert.type} text={alert.text}/></h5>}
            
            <button className="btn btn-success my-2"
            onClick={()=>PostData()}
            >
               Update password
            </button>
    
        </div>
      </div>
   )
}


export default SignIn;