const express = require("express");
let res = require("express/lib/response");

const { welcome, displayName, playTenziFun, player } = require("./game");
const { request } = require("express");
const app = express();

let p1 = player.player1.name;
let p2 = player.player2.name;

app.get("/", welcome);

app.get("/instructions", (req, res) => {
  res.send(
    `<h1>Click <a href="http://localhost:4000/playgame">here</a> to start playing Tenzi game.</h1>`
  );
});

app.get("/inputnames", (req, res) => {
  p1 = req.query.player1;
  p2 = req.query.player2;

  if (p1 && p2) {
    res.send(
      `${displayName(
        p1,
        p2
      )}. <h2> ${p1} is now Player1, ${p2} is now Player2.<h2><h2> Click <a href="http://localhost:4000/instructions"> For Instructions </a></h2>`
    );
  } else if (p1 === undefined && p2 === undefined) {
    res.send(`<h2>No inputs provided. Please send player names!</h2>`);
  } else if (p1 === undefined || p2 === undefined) {
    res.send(
      `<h2>Only one player input provided. Please resubmit your post request with both player names</h2>`
    );
  } else if (p1 === "yourName" || p2 === "yourName") {
    res.send(
      `<h1 text-align:center><p text-align: center>No players found. Please pass player names using</h1><br> <h2>"http://localhost:4000/inputnames?player1={yourName}&player2={yourName}"</h2>`
    );
  } else {
    res.send(
      `<h1 text-align:center><p text-align: center>No players found.
       Please pass player names using</h1><br> <h2>"http://localhost:4000/inputnames?player1={yourName}&player2={yourName}"</h2>`
    );
  }
});

app.get("/playgame", (req, res) => {
  if (p1) {
    const countPlayer1 = playTenziFun();
    const countPlayer2 = playTenziFun();

    if (countPlayer1 < countPlayer2) {
      player.player1.score = player.player1.score + 1;
      res.send(
        `<h1 text-align:center><p text-align: center>Tenzi!!!</p></h1> <br><h2> ${p1} rolled ${countPlayer1} times and ${p2} rolled ${countPlayer2} times.</h2> <br> <h2>To check scores click <a href = "http://localhost:4000/scores">Scores</a></h2>`
      );
    } else if (countPlayer1 > countPlayer2) {
      player.player2.score = player.player2.score + 1;
      res.send(
        `<h1 text-align:center><p text-align: center>Tenzi!!!</p></h1> <br><h2> ${p1} rolled ${countPlayer1} times and ${p2} rolled ${countPlayer2} times.</h2> <br> <h2>To check scores click <a href = "http://localhost:4000/scores">Scores</a></h2>`
      );
    } else if (countPlayer1 === countPlayer2) {
      res.send(
        `<h1 text-align:center><p text-align: center>Tenzi!!!</p></h1> <br><h2> ${p1} rolled ${countPlayer1} times and ${p2} rolled ${countPlayer2} times.</h2> <br> <h2>To check scores click <a href = "http://localhost:4000/scores">Scores</a></h2>`
      );
    }
  }
});

app.get("/scores", (req, res) => {
  res.send(
    `<h1>Here are scores. ${p1} : ${player.player1.score} and ${p2} : ${player.player2.score}. To <a href = "http://localhost:4000/playgame"> Play Again</a> or to  <a href = "http://localhost:4000/restart"> Reset the game</a> </h1>`
  );
});

app.get("/restart", (req, res) => {
  res.send(
    `<h1>To continue the game "http://localhost:4000/inputnames?player1={yourName}&player2={yourName}</h1>`
  );
});

const PORT = 4000;
function echoPortNumber() {
  console.log(`Listening on port ${PORT}`);
}
app.listen(PORT, echoPortNumber);
