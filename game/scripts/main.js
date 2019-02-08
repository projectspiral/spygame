var socket = new WebSocket(location.origin.replace(/^http/, 'ws'));
var ID = null;

socket.onmessage = function (event) {
    let message = event.data;
    let messageJSON = JSON.parse(message);

    console.log("recieved: " + message);

    ID = messageJSON.ID || ID;
}