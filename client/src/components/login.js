import LastConnections from "./lastConnections";
import TextInput from "./textInput";

const React = require('react');
const StandartQuestions = require('../questions/standart');

class LoginInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            status: '',
            userUpdate: props.userUpdate,
            isCreate: props.isCreate === undefined ? false : props.isCreate
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, password, isCreate } = this.state;
        if (email === '' || password === '') {
            this.setState({
               status: 'email or password cant be empty'
            });
        } else {
            StandartQuestions.login({ email: email, password: password }, isCreate)
                .then((result) => {
                    if (result.error === undefined) {
                        this.state.userUpdate(result);
                        this.setState({
                            status: 'success login'
                        });
                    }
                })
                .catch((error) => {
                    this.setState({
                        status: 'cant login'
                    });
                    console.log(error);
                });
        }
    }

    updateEmailField = (value) => {
        this.setState({ email: value });
    };

    updatePasswordField = (value) => {
        this.setState({ password: value });
    };

    render() {
        const { status, isCreate } = this.state;
        let urlLastConnections = "";
        if (isCreate) {
            urlLastConnections = "/user/create";
        } else {
            urlLastConnections = "/user/login";
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="board-row">
                    Login on this site
                </div>
                <div className="board-row" >
                    email: <TextInput typeInput="text"
                                      updateData={this.updateEmailField}/>
                </div>
                <div className="board-row" >
                    Password: <TextInput typeInput="password"
                                         updateData={this.updatePasswordField}/>
                </div>
                <input type="submit" value="Submit" />
                <div className="board-row">
                    Status login: {status}
                </div>
                <LastConnections url={urlLastConnections} />
            </form>
        )
    }
}

export default LoginInput;