import LastConnections from "./lastConnections";
const Token = require('../questions/token');
const React = require('react');

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
      Token.deltetToken();
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