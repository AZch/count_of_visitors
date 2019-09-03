const React = require('react');
const StandartQuestions = require('../questions/standart');

function Connection(props) {
    let connectionData = props.index + ") ip connect: " + props.item.ip_addr + " " + "id: " + props.item.id + " ";
    if (props.item.user !== null &&
        props.item.user !== undefined &&
        props.item.user !== "") {
        connectionData += "login: " + props.item.user;
    }
    return (
        <div className="board-row">
            { connectionData }
        </div>
    );
}

class LastConnections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listConn: [],
            page: 1,
            status: "",
            currentConn: {}
        };

        this.getPage = this.getPage.bind(this);
        this.seeNextPage = this.seeNextPage.bind(this);
    }

    getPage(newPage = 0) {
        console.log(newPage);
        const { listConn } = this.state;
        StandartQuestions.getData(newPage)
            .then((result) => {
                if (result.error === undefined) {
                    let newConn = listConn.concat(result.old_connections);
                    this.setState({
                        page: newPage,
                        listConn: newConn,
                        status: "success load page",
                        currentConn: result.current_connect
                    });
                    console.log('suc');
                } else {
                    this.setState({
                       status: 'cant load page connections'
                    });
                }
                    console.log('su1c');
            }).catch((error) => {
                this.setState({
                    status: 'cant get page connections'
                });
                    console.log(error);
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
                <button onClick={this.seeNextPage} > next page </button>
            </div>
        );
    }
}

export default LastConnections;