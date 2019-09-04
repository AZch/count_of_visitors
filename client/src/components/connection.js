const React = require('react');

function Connection(props) {
    let connectionData = props.index + " ip connect: " + props.item.ip_addr;
    if (props.item.user !== null &&
        props.item.user !== undefined &&
        props.item.user !== "") {
        connectionData += " login: " + props.item.user;
    }
    return (
        <div className="board-row">
            { connectionData }
        </div>
    );
}

export default Connection;