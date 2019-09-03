const React = require('react');

function Connection(props) {
    let connectionData = "";
    try {
        connectionData = props.index + ") ip connect: " + props.item.ip_addr + " " + "id: " + props.item.id + " ";
        if (props.item.user !== null &&
            props.item.user !== undefined &&
            props.item.user !== "") {
            connectionData += "login: " + props.item.user;
        }
    } catch (e) {
        connectionData = "no no"
    }
    return (
        <div className="board-row">
            { connectionData }
        </div>
    );
}

export default Connection;