const React = require('react');

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            updateData: props.updateData,
            type: props.typeInput
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        this.state.updateData(event.target.value);
    }

    render() {
        const { type } = this.state;
        return (
            <input
                type={type}
                value={this.state.value}
                onChange={this.handleChange} />
        )
    }
}

export default TextInput;