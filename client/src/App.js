import React from 'react';
import './App.css';
import Login from './components/login';
import MainPage from "./components/MainPage";
import Logout from "./components/logout";
import EditUser from "./components/editUser";

const Router = require('react-router-dom').BrowserRouter;
const Link = require('react-router-dom').Link;
const Route = require('react-router-dom').Route;
const UserData = require('./questions/userData');

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(UserData.getUserData());
    this.state = {
        userData: UserData.getUserData()
    };
  }

  userUpdate = (userData) => {
    this.setState({
      userData: userData
    });
  };

  userCreate = (userData) => {
    this.setState({
      userData: userData
    });
  };

  render() {
    const { userData } = this.state;
    let userPresent = "", loginButton, loginText, editOrSignUp, editOrSignUpText;
    if (UserData.isExist()) {
      userPresent = "User login: " + userData.login + " email: " + userData.email;
      loginButton = <Logout userUpdate={this.userUpdate}/>;
      editOrSignUp = <EditUser userUpdate={this.userCreate}/>;
      loginText = "Logout";
      editOrSignUpText = "Edit account";
    } else {
      loginButton = <Login userUpdate={this.userUpdate}/>;
      editOrSignUp = <Login isCreate={true} userUpdate={this.userCreate}/>;
      loginText = "Sign in";
      editOrSignUpText = "Sign up";
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
                      <li>
                          <Link to="/account">{editOrSignUpText}</Link>
                      </li>
                  </ul>
              </nav>

              <Route path="/" exact component={MainPage}/>
              <Route path="/login" render={() => loginButton}/>
              <Route path="/account" render={() => editOrSignUp}/>
          </div>
      </Router>
  );
  }


}

export default App;