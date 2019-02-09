console.log(`===== STARTED =====\t${new Date().toString().substring(0, 24)}`);

var express = require("express"),
    http = require("http"),
    websocket = require("ws"),
    uniqid = require('uniqid');

var app = express();

app.use(express.static(`${__dirname}/game`));

var server = http.createServer(app);
const wss = new websocket.Server({ server });

var currentRooms = {}

app.use("/", function (req, res) {

});

wss.on("connection", function connection(ws) {
    let con = ws;
    let ID = uniqid('_');
    con.id = ID;

    try {
        con.send(JSON.stringify({ ID: ID }));
    } catch (e) {
        console.log(`${new Date().toString().substring(0, 24)}\tERROR:\t\t${e}`);
    }
    console.log(`${new Date().toString().substring(0, 24)}\tCONNECTION:\t${ID}`);


    con.on("message", function incoming(message) {
        console.log(`${new Date().toString().substring(0, 24)}\tMESSAGE:\t${message}`);
        let messageJSON = JSON.parse(message);

        if (messageJSON.gameID) {
            // if the room already exists
            if (currentRooms[messageJSON.gameID]) {

            }
            // if the room doesn't exits yet
            else {
                currentRooms[messageJSON.gameID] = { players: [] };
            }
            let contains = false;
            currentRooms[messageJSON.gameID].players.forEach(p => {
                if (p.ID == con.id) {
                    contains = true;
                }
            });
            if (!contains) {
                currentRooms[messageJSON.gameID].players.push({ "ID": con.id, "nickname": messageJSON.nickname, "ws": con });
            }
            delete contains;

            currentRooms[messageJSON.gameID].players.forEach(p => {
                if (p.ID != messageJSON.playerID) {
                    console.log("hi")
                    p.ws.send(JSON.stringify({ "yeet": "yeet" }));
                }
            });
            console.log(currentRooms[messageJSON.gameID].players)
        }


    });

    con.on("close", function (code) {
        //
    });
});

server.listen(process.env.PORT || 80);
