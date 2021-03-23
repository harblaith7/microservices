import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom"
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact strict path="/" component={Login}/>
        </Switch>
    </div>
  );
}

export default App;
