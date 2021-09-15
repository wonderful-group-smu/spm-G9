import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Navbar from "./Components/Navbars/Navbar"
import Courses from "./Pages/Courses/Courses"
import Records from "./Pages/Records/Records"


function App() {
  return (
    <Router>
     
   
      <Switch>
        <Route path='/courses' component={Courses}/>
        <Route path='/records' component={Records}/>


      </Switch>
      <Navbar></Navbar>
      
      

    </Router>
  );
}

export default App;
