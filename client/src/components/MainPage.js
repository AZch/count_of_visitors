import LastConnections from "./lastConnections";
const React = require('react');

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <LastConnections/>
            </div>
        )
    }
}

export default MainPage;