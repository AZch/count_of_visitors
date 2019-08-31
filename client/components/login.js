const React = require('react');
const TextInput = require('../components/textInput');

class loginInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit() {

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