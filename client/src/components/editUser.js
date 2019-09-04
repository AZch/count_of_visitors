import LastConnections from "./lastConnections";
import TextInput from "./textInput";
import UserData from "../questions/userData";

const React = require('react');
const StandartQuestions = require('../questions/standart');

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        const userData = UserData.getUserData();
        this.state = {
            email: userData.email,
            newPassword: '',
            oldPassword: '',
            login: userData.login,
            status: '',
            userUpdate: props.userUpdate,
        };
        console.log(this.state);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, password, oldPassword, login, newPassword } = this.state;
        if (email === '' || password === '' || login === '' ||
            oldPassword === '') {
            this.setState({
               status: 'field cant be empty'
            });
        } else {
            const resNewPassword = newPassword === '' ? oldPassword : newPassword;
            StandartQuestions.editUser({ email: email, login: login, oldPassword: oldPassword, newPassword: resNewPassword })
                .then((result) => {
                    if (result.error === undefined) {
                        this.state.userUpdate(result);
                        this.setState({
                            status: 'success'
                        });
                    }
                })
                .catch((error) => {
                    this.setState({
                        status: 'cant perform action'
                    });
                    console.log(error);
                });
        }
    }

    updateEmailField = (value) => {
        this.setState({ email: value });
    };

    updateOldPasswordField = (value) => {
        this.setState({ oldPassword: value });
    };

    updateNewPasswordField = (value) => {
        this.setState({ newPassword: value });
    };

    updateLoginField = (value) => {
        this.setState({ login: value });
    };

    render() {
        const { status, email, login } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="board-row" >
                    login: <TextInput typeInput="text"
                                      value={login}
                                      updateData={this.updateLoginField}/>
                </div>
                <div className="board-row" >
                    email: <TextInput typeInput="text"
                                      value={email}
                                      updateData={this.updateEmailField}/>
                </div>
                <div className="board-row" >
                    Old password: <TextInput typeInput="password"
                                         updateData={this.updateOldPasswordField}/>
                </div>
                <div className="board-row" >
                    New password: <TextInput typeInput="password"
                                         updateData={this.updateNewPasswordField}/>
                </div>
                <input type="submit" value="Submit" />
                <div className="board-row">
                    Status login: {status}
                </div>
                <LastConnections url="/user" />
            </form>
        )
    }
}

export default EditUser;