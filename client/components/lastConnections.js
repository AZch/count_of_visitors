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

        this.getPage = this.getPage.bind(this);
    }

    getPage(newPage = -1) {
        const { listConn } = this.state;
        let page = '';
        if (page > 0) {
            page = '?page=' + newPage;
        }
        StandartQuestions.getData(page)
            .then((result) => {
                if (result.error === undefined) {
                    let newConn = listConn;
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

    seeNextPage(event) {
        event.preventDefault();
        const { page } = this.state;
        const newPage = page + 1;
        this.getPage(newPage)

    }

    componentDidMount() {
        this.getPage();
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