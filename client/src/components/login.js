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
            login: '',
            status: '',
            userUpdate: props.userUpdate,
            isCreate: props.isCreate === undefined ? false : props.isCreate,
            isEdit: props.isEdit === undefined ? false : props.isEdit
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, password, isCreate, login } = this.state;
        if (email === '' || password === '' || (isCreate && login === '')) {
            this.setState({
               status: 'all field cant be empty'
            });
        } else {
            StandartQuestions.login({ email: email, login: login, password: password,  }, isCreate)
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

    updatePasswordField = (value) => {
        this.setState({ password: value });
    };

    updateLoginField = (value) => {
        this.setState({ login: value });
    };

    render() {
        const { status, isCreate, isEdit } = this.state;
        let urlLastConnections = "", loginUserComponent = <div/>;
        if (isCreate) {
            urlLastConnections = "/user/create";
            loginUserComponent = <div className="board-row">
                                    Login: <TextInput typeInput="text"
                                      updateData={this.updateLoginField}/>
                                 </div>
        } else if (isEdit) {
            urlLastConnections = "/user/login";
        }
        return (
            <form onSubmit={this.handleSubmit}>
                {loginUserComponent}
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