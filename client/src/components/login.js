const React = require('react');
const StandartQuestions = require('../questions/standart');

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            updateData: props.updateData
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        this.state.updateData(event.target.value);
    }

    render() {
        return (
            <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange} />
        )
    }
}

class LoginInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            status: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        if (email === '' || password === '') {
            this.setState({
               status: 'email or password cant be empty'
            });
        } else {
            console.log('go post');
            StandartQuestions.postData("", { email: email, password: password })
                .then((result) => {
                    if (result.error === undefined) {
                        this.setState({
                            status: 'success login'
                        });
                        this.state.history.push('/user/');
                    }
                })
                .catch(() => {
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
                some
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

export default LoginInput;