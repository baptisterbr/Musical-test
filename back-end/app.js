const { io, http, express, app } = require("./socketIO")

const fs = require('fs');
const CORS = require("cors");
app.use(CORS("*"));

const port = 5000;

var json = "";
var currentMusic = "";

let shuffledAnswers = answers => {
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = answers[i];
        answers[i] = answers[j];
        answers[j] = temp;
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/music/get/all', (req, res) => {
    json = fs.readFileSync('./blindtest.json');
    json = JSON.parse(json);
    res.sendStatus(200);
})

app.get('/music/get', (req, res) => {
    let length = json.length;
    let randomIndex = Math.floor(Math.random() * length);
    currentMusic = json[randomIndex];
    res.send(currentMusic);
})

app.get('/music/get/answers', (req, res) => {
    let answers = [], cpt = 0;
    let length = json.length;
    answers.push(currentMusic.artist);
    while (cpt !== 3) {
        let randomIndex = Math.floor(Math.random() * length);
        if (answers.find(answer => answer === json[randomIndex].artist) === undefined) {
            if (json[randomIndex].artist === "") {
                answers.push("UNKNOWN");
            } else {
                answers.push(json[randomIndex].artist);
            }
            cpt++;
        }
    }
    shuffledAnswers(answers);
    res.send(answers);
})

let players = []

io.on("connection", (socket) => {
    players.push({
        "id" : socket.conn.id,
        "name" : ""
    })

    socket.on("changePlayers", (name) =>{
        players.find(p => p.id === socket.conn.id).name = name;
        
        io.emit('changePlayers', players);
    })

    io.emit("changePlayers", players)

    socket.on("disconnect", (connection) => {
        players.splice(players.indexOf(players.find(p => p.id === socket.conn.id)), 1)
        io.emit("changePlayers", players)
    })
})

http.listen(port, function () {
    console.log(`Votre app est disponible sur localhost:${port} !`);
})