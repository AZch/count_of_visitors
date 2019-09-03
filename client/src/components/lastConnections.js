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
            page: 0,
            status: "",
            currentConn: {},
            url: props.url
        };

        this.getPage = this.getPage.bind(this);
        this.seeNextPage = this.seeNextPage.bind(this);
    }

    getPage(isFirst = false) {
        const { listConn, url, page } = this.state;
        const newPage = isFirst ? page : page + 1;
        StandartQuestions.getConnections(url, newPage)
            .then((result) => {
                if (result.error === undefined) {
                    let newConn = listConn.concat(result.old_connections);
                    this.setState({
                        page: newPage,
                        listConn: newConn,
                        status: "success load page",
                        currentConn: result.current_connect
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
                console.log(error);
            });
    }

    seeNextPage(event) {
        event.preventDefault();
        this.getPage()

    }

    componentDidMount() {
        this.getPage(true);
    }

    render() {
        const { listConn, currentConn, status } = this.state;
        return (
            <div>
                <Connection
                    item={currentConn}
                    index="current"/>
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
                <div>
                    status: {status}
                </div>
            </div>
        );
    }
}

export default LastConnections;