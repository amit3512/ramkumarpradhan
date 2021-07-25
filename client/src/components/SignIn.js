import axios from "axios";
import { useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import Alert from "./Alert";

const SignIn = () => {
const [email, setEmail] = useState("");
const[password, setPassword] = useState("");
const [alert,setAlert] = useState({show:false});
const[token, setToken] = useState(null);
const[redirect, setRedirect] = useState(localStorage.getItem('user') ? true : false,);

const handleEmail = (e) => {
     const email = e.target.value;
     setEmail(email);
}

const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
}

const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 1500);
  };
const handleSubmit = () =>{
    if(!(email=== "" || password === "")
    && (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)))
    {
            axios.post("/signIn",{
                email:email,
                password:password
            })
            .then((res)=>{
                
                setToken({token:res.data.token})

                const result = {
                    token:res.data.token,
                    time:new Date().getTime()
                }

                localStorage.setItem('user', JSON.stringify(result));
                setRedirect(true);
            }).catch(err=>{
                     console.log(err);
            });

           
          
    }
    else{
        handleAlert({
            type:"danger",
            text:"Enter Valid Email/Password"
        })
    }
 
}

    return( 
        <div>
            {redirect?(
                <div>
                    <Redirect to="/"/>
                </div>
            ):(
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                    <h4 className="text-center">Sign In </h4>
                           <form className="text-center border py-2 input_box">
                               <label htmlFor="inputEmail">Email: </label> <br/>
                               <input type="email" placeholder="email" className="mb-2" id ="inputEmail" name="email" onChange={handleEmail}required /><br/>
                               <label htmlFor="inputPassword">Password: </label><br/>
                               <input  type="password" placeholder="password" id ="inputPassword" name="password"  onChange={handlePassword} required/><br/>
                               {alert.show && <h5><Alert type={alert.type} text={alert.text}/></h5>}
                               <button className="btn-info border my-2 p-1" onClick={handleSubmit} type="button"><h5>Submit</h5></button><br/>
                               <Link to="#" className="px-2" type="button">Forgot Password?</Link>
                           </form>
                    </div>
                </div>
                
            </div>
            )}
             
        </div>
             
    )
}

export default SignIn;