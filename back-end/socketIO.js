const express = require("express");
const app = express();
const http = require("http").createServer(app);

/*
    CONFIG - Init socket.io
 */
let allowedOrigins = "*";
const io = require("socket.io")(http, {
    cors: {
        origins: allowedOrigins,
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    origins: allowedOrigins,
    allowEIO3: true,
    handlePreflightRequest: function (req, res) {
        const headers = {
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
            'Access-Control-Allow-Origin': [req.headers.origin], //['http://localhost:8080'],
            'Access-Control-Allow-Credentials': true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

module.exports = { io, http, express, app }