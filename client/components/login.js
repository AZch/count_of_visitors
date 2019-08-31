const React = require('react');
const TextInput = require('../components/textInput');
const StandartQuestions = require('../questions/standart');

class loginInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            status: ''
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        if (email === '' || password === '') {
            this.setState({
               status: 'email or password cant be empty'
            });
        } else {
            StandartQuestions.postData("/", { email: email, password: password })
                .then((result) => {
                    if (result.error === undefined) {
                        this.setState({
                            status: 'success login'
                        });
                        this.state.history.pushState('/user/');
                    }
                })
                .catch((error) => {
                    this.setState({
                        status: 'cant login'
                    });
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
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="board-row">
                    Login on this site
                </div>
                <div className="board-row" >
                    email: <TextInput updateData={this.updateEmailField}/>
                </div>
                <div className="board-row" >
                    Password: <TextInput updateData={this.updatePasswordField}/>
                </div>
                <input type="submit" value="Login" />
            </form>
        )
    }
}