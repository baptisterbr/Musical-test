import React, { useState, useRef, useEffect } from 'react';
import Form from './Form';
import HomeDefault from './HomeDefault';
//import socketIOClient from "../../back-end/node_modules/socket.io/client-dist/socket.io.js";
import axios from "axios";

import './scss/App.scss';
const ENDPOINT = "http://172.20.10.3:5000";
const { io } = require("socket.io-client")



function App() {

  const [dataCheck, setDataCheck] = useState(false);

  const [players, setPlayers] = useState([]);

  const [music, setMusic] = useState({});

  const [answers, setAnswers] = useState([]);

  const audio = useRef(null);

  let persons = ["Baptiste", "Côme", "Romain", "Amine", "Lucas", "Ruya", "Emma", "Délégué suprême", "Ptite pute", "PHP CA PUE"];

  useEffect(() => {
    const socket = io(ENDPOINT);

    let name = persons[Math.floor(Math.random()*persons.length)];

    socket.emit("changePlayers", name);

    socket.on("changePlayers", data => {
      setPlayers(data);
    });
  }, []);

  const verifyAnswer = (answer) => {
    console.log(music.artist + " =?= " + answer.textContent);
    if (answer.textContent === music.artist) {
      console.log("good answer");
      return true;
    }
    console.log("bad answer");
    return false;
  }

  const loadData = async () => {
    try {
      await axios.get("/music/get/all").then(function (response) {
        console.log(response.data);
      });
    } catch (e) {
      console.log(e);
    }
  }

  const chooseMusic = async () => {
    try {
      await axios.get("/music/get").then(function (response) {
        console.log(response.data);
        setMusic(response.data);
      });
      await axios.get("/music/get/answers").then(function (response) {
        console.log(response.data);
        setAnswers(response.data);
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmitLoad = (e) => {
    e.preventDefault();
    loadData();
    chooseMusic();
    setDataCheck(true);
  }

  return (

    dataCheck ?
      <div className="App">
        <audio ref={audio} autoPlay src={"./music/" + music.file}></audio>
        <h1>Music test</h1>
        <Form music={music} changeMusic={chooseMusic} answers={answers} verifyAnswer={verifyAnswer} />
      </div>
      :
      <div className="App">
        <h1>Music test</h1>
        <HomeDefault handleSubmitLoad={handleSubmitLoad} players={players} />
      </div>
  );
}

export default App;
