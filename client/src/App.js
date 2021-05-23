import Navbar from './components/Navbar';
import Info from './components/Info';
import Main from './components/Main';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

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
     </Router>
     
    
    </div>
  );
}

export default App;
