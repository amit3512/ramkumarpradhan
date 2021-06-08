import Navbar from './components/Navbar';
import Info from './components/Info';
import Main from './components/Main';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Reset from './components/Reset';
import NewPassword from './components/Newpassword';

function App() {
  return (
    <div className="App">
      <Router>
     <Navbar/>
    
          <Route path="/main" exact component={Main}/>
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
      
     </Router>
     
    
    </div>
  );
}

export default App;
