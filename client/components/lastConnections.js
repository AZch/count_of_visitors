const React = require('react');
const Connection = require('connection');

class lastConnections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listConn: []
        };
    }

    seeNextPage(event) {
        event.preventDefault();
    }

    renderConn(conn) {

    }

    render() {
        const { listConn } = this.state;
        return (
            <div>
                {
                    listConn.map((item, index) => {
                        return (
                            <div className="board-row">
                                <Connection
                                    item={item}
                                    index={index}/>
                            </div>
                        );
                    })
                }
                <button onClick={this.seeNextPage}/>
            </div>
        );
    }
}