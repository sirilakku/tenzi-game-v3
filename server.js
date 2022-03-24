const express = require("express");
let res = require("express/lib/response");

const { welcome, displayName, playTenziFun, player } = require("./game");
const { request } = require("express");
const app = express();

let p1 = player.player1.name
let p2 = player.player2.name 
app.get("/", welcome);

app.get("/inputnames", (req, res) => {
  p1 = req.query.player1;
  p2 = req.query.player2;

  if (p1 && p2) {
    res.send(
      `${displayName(p1, p2)}. ${p1} is now Player1, ${
        p2} is now Player2. Please see "http://localhost:4000/instructions"`
    );
  } else if (
    p1 === undefined &&
    p2 === undefined
  ) {
    res.send(`No inputs provided. Please send player names!`);
  } else if (
    p1 === undefined ||
    p2 === undefined
  ) {
    res.send(
      `Only one player input provided. Please resubmit your post request with both player names`
    );
  }
});

app.get("/instructions", (req, res) => {
  res.send(
    `Please curl "http://localhost:4000/playgame" to continue playing this game.`
  );
});

app.get("/playgame", (req, res) => {
  if (p1) {
    const countPlayer1 = playTenziFun();
    const countPlayer2 = playTenziFun();

    if (countPlayer1 < countPlayer2) {
      player.player1.score = player.player1.score + 1;
      res.send(
        `Tenzi!!! ${p1} rolled ${countPlayer1} times and ${p2} rolled ${countPlayer2} times. To check the scores curl "http://localhost:4000/scores"`
      );
    } else {
      player.player2.score = player.player2.score + 1;
      res.send(
        `Tenzi!!! ${p1} rolled ${countPlayer1} times and ${p2} rolled ${countPlayer2} times.`
      );
    }
  } else {
    res.send(
      `No players found. Please pass player names using this command: curl "http://localhost:4000/inputnames?player1={yourName}&player2={yourname}"`
    );
  }
});

app.get("/scores", (req, res) => {
  res.send(
    `Here are scores. ${p1} : ${player.player1.score} and ${p2} : ${player.player2.score}. To reset the game "http://localhost:4000/restart" or to play again "http://localhost:4000/playgame" `
  );
});

app.get("/restart", (req, res) => {
  res.send(
    `To continue the game : curl "http://localhost:4000/inputnames?player1={yourName}&player2={yourname}"`
  );
});

const PORT = 4000;
function echoPortNumber() {
  console.log(`Listening on port ${PORT}`);
}
app.listen(PORT, echoPortNumber);
