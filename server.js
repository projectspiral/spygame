console.log(`===== STARTED =====\t${new Date().toString().substring(0, 24)}`);

var express = require("express"),
    http = require("http"),
    websocket = require("ws"),
    uniqid = require('uniqid');

var app = express();

app.use(express.static(`${__dirname}/game`));

var server = http.createServer(app);
const wss = new websocket.Server({ server });


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


    });

    con.on("close", function (code) {
        //
    });
});

server.listen(process.env.PORT || 80);
