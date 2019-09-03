import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import MainPage from "./components/MainPage";

const Router = require('react-router-dom').BrowserRouter;
const Link = require('react-router-dom').Link;
const Route = require('react-router-dom').Route;
const Token = require('./questions/token');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
    Token.deltetToken();

    this.logout = this.logout.bind(this);
  }

  userUpdate = (userData) => {
    this.setState({
      userData: userData
    });
  };

  logout(event) {
    event.preventDefault();
    Token.deltetToken();
    this.setState({
      userData: {}
    })
  }

  render() {
    const { userData } = this.state;
    let userPresent = "", loginButton, loginText;
    if (userData !== undefined && userData !== null && userData.login !== undefined && userData.email !== undefined) {
      userPresent = "User login: " + userData.login + " email: " + userData.email;
      loginButton = <button onClick={this.logout}>Logout</button>;
      loginText = "Logout";
    } else {
      loginButton = <Login userUpdate={this.userUpdate}/>;
      loginText = "Login";
    }
    return (
      <Router>
        <div className="board-row">
        {userPresent}
        </div>
          <div>
              <nav>
                  <ul>
                      <li>
                          <Link to="/">Main</Link>
                      </li>
                      <li>
                          <Link to="/login">{loginText}</Link>
                      </li>
                  </ul>
              </nav>

              <Route path="/" exact component={MainPage}/>
              <Route path="/login" render={() => loginButton}/>
          </div>
      </Router>
  );
  }


}

export default App;