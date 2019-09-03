import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import MainPage from "./components/MainPage";

const Router = require('react-router-dom').BrowserRouter;
const Link = require('react-router-dom').Link;
const Route = require('react-router-dom').Route;

function App() {
  return (
      <Router>
          <div>
              <nav>
                  <ul>
                      <li>
                          <Link to="/">Main</Link>
                      </li>
                      <li>
                          <Link to="/login">Login</Link>
                      </li>
                  </ul>
              </nav>

              <Route path="/" exact component={MainPage}/>
              <Route path="/login" component={Login}/>
          </div>
      </Router>
  );
}

export default App;