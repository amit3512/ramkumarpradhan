import axios from "axios";
import { useState } from "react";


const SignUp = () => {
const [email, setEmail] = useState("");
const[password, setPassword] = useState("");
const[token, setToken] = useState("");
const[redirect, setRedirect] = useState("");

const handleEmail = (e) => {
     const email = e.target.value;
     setEmail(email);
}

const handlePassword = (e) => {
    const password = e.target.value;
    console.log(password);
    setPassword(password);
}

const handleSubmit = e =>{
    
 
    
    if(!(email=== "" || password === "")
    && (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)))
    {
            axios.post("http://localhost:3333/users/signUp",{
                email:email,
                password:password
            })
            .then((res)=>{
                setToken({token:res.data.token})

                const result = {
                    token,
                    time:new Date().getTime()
                }

                localStorage.setItem('user', JSON.stringify(result));
                setRedirect(true);
            }).catch(err=>{
                     console.log(err);
            });

            
          
    }
    else{
        alert("Please Enter Valid Details");
    }
 
}

    return( 
             <div className="container">
                 <div className="row">
                 <div className="col-md-4"></div>
                     <div className="col-md-4">
                     <h4 className="text-center">Sign In </h4>
                            <form className="text-center border py-2">
                                <input type="email" placeholder="email" className="mb-2" name="email" onChange={handleEmail}/><br/>
                                <input  type="password" placeholder="password" name="password"  onChange={handlePassword}/><br/>
                                <button className="text-center border my-2" onSubmit={handleSubmit}>Submit</button>
                            </form>
                     </div>
                 </div>
                 
             </div>
    )
}

export default SignUp;