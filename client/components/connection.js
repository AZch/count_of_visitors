const React = require('react');

function Connection(props) {
    let connectionData = props.index + ") ip connect: " + props.item.ip_addr + " ";
    if (props.item.login !== null &&
        props.item.login !== undefined &&
        props.item.login !== "") {
        connectionData += "login: " + props.item.login;
    }
    return (
        <div className="board-row">
            { connectionData }
        </div>
    );
}

module.export = Connection;