import LastConnections from "./lastConnections";
const UserData = require('../questions/userData');
const React = require('react');
const Standart = require('../questions/standart');

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userUpdate: props.userUpdate
    };
    this.logout = this.logout.bind(this);
  }
    logout(event) {
      event.preventDefault();
      UserData.deleteUser();
      this.state.userUpdate({});
    }

    render() {
        return (
            <div>
                <button onClick={this.logout}>Logout</button>
                <LastConnections url="/user" />
            </div>
        )
    }
}

export default Logout;