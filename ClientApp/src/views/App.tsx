import React from 'react';
import '../styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Home from './Home';
import Header from './components/Header';
import Journals from './Journals';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/journals"><Journals /></Route>
        <Route path="/"><Home /></Route>
      </Switch>
    </Router>
  );
}

export default App;
