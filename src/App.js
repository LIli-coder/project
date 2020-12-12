import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import { Route, Link, BrowserRouter as Router, Switch,useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyTable from './components/MyTable';
     


export default function App() {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <Route exact path="/">
             <MyTable/>
          </Route>
          <Route exact path='/data/:dataId' >
              <Home/> 
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Home() {
  let { dataId } = useParams();
  return <h3>Requested topic ID: {dataId}</h3> 
}
