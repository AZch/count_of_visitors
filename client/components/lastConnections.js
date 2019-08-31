const React = require('react');
const Connection = require('connection');
const StandartQuestions = require('../questions/standart');

class lastConnections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listConn: [],
            page: 1,
            status: '',
        };
    }

    seeNextPage(event) {
        event.preventDefault();
        const { page, listConn } = this.state;
        const newPage = page + 1;
        StandartQuestions.getData('?page=' + newPage)
            .then((result) => {
                if (result.error === undefined) {
                    let newConn = lastConnections;
                    newConn.push(result.connections);
                    this.setState({
                        listConn: newConn,
                        status: 'success load page',
                    });
                } else {
                    this.setState({
                       status: 'cant load page connections'
                    });
                }
            }).catch((error) => {
                this.setState({
                    status: 'cant get page connections'
                });
            });

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