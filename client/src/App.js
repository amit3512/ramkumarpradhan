import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Upload from './components/Upload.js';
import Home from './components/Home.js';
function App() {
    return (
        <div className="container">
            <Router>
                <nav className="nav">
                    <div className="nav-brand">Cloudinary Demo</div>
                    <ul className="nav-items">
                        <li className="nav-item">
                            <Link to="/">Gallery</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/upload">Upload</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route component={Upload} path="/upload" />
                    <Route component={Home} path="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;


// import Navbar from './components/Navbar';
// import Info from './components/Info';
// import Main from './components/Main';
// import {BrowserRouter as Router,Route} from 'react-router-dom';
// import './App.css';
// import SignIn from './components/SignIn';
// import SignOut from './components/SignOut';
// import Reset from './components/Reset';
// import NewPassword from './components/Newpassword';
// import Testimonials  from './components/Testimonials ';
// import Swiper  from './components/Slide';
// import Marquee  from './components/Marquee';
// import Upload  from './components/Upload';
// import Home  from './components/Home';


// function App() {
//   return (
//     <div className="App">
//       <Router>
//      <Navbar/>
//      <Upload/>
//      <Home/>
     {/* <Marquee/> */}
          {/* <Route path="/main" exact component={Main}/>
          <Route path="/" exact component={Info}/>
          <Route path="/user/:id" exact component={Main}/>
          <Route path="/signIn" exact component={SignIn}/>
          <Route path="/signOut" exact component={SignOut}/>
          <Route exact path="/reset">
            <Reset/>
          </Route>
          <Route path="/reset/:token">
            <NewPassword />
          </Route>
         <Testimonials/> */}
           {/* <Swiper/> */}
    //  </Router>
       {/* <Testimonials/> */}
     
     
     
    
//     </div>
//   );
// }

// export default App;

