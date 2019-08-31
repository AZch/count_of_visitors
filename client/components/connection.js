const React = require('react');

function Connection(props) {
    let connectionData = "ip connect: " + props.ip_addr + " ";
    if (props.login !== null &&
        props.login !== undefined &&
        props.login !== "") {
        connectionData += "login: " + props.login;
    }
    return (
        <div className="board-row">
            { connectionData }
        </div>
    );
}

module.export = Connection;