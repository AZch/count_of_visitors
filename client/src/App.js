import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import MainPage from "./components/MainPage";

const Router = require('react-router-dom').BrowserRouter;
const Link = require('react-router-dom').Link;
const Route = require('react-router-dom').Route;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
              <Route path="/login" render={()=><Login value="123123"/>}/>
          </div>
      </Router>
  );
  }


}

export default App;