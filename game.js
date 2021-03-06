const player = {
  player1: {
    name: "",
    score: 0,
  },
  player2: {
    name: "",
    score: 0,
  },
};

function welcome(req, res) {
  res.send(
    `<h1>Welcome to Tenzi Game !!!</h1> <h3>Please enter your name using this command:  "http://localhost:4000/inputnames?player1={yourName}&player2={yourName}"</h3>`
  );
}
function displayName(player1, player2) {
  return `<h1>Welcome to Tenzi game ${player1} and ${player2}</h1>`;
}

function rollSetOfDice(times) {
  let diceArray = [];
  for (let dice = 1; dice <= times; dice++) {
    diceArray.push(rollDice());
  }
  return diceArray;
}

function rollDice() {
  number = Math.floor(Math.random() * 6 + 1);
  return number;
}

function getMode(array) {
  var mostFrequnet = null,
    mostFrequnetItem;
  var arr1 = array;
  arr1.sort();
  for (var i = 0; i < arr1.length; i++) {
    var single = arr1[i];
    var total = arr1.lastIndexOf(single) - arr1.indexOf(single) + 1;

    if (total > mostFrequnet) {
      mostFrequnetItem = arr1[i];
      mostFrequnet = total;
      i = arr1.lastIndexOf(single) + 1;
    }
  }
  return mostFrequnetItem;
}

function playTenziFun() {
  let diceToRoll = 10;
  let rollCounter = 0;
  let setAsideDice = [];
  let currentMode;
  let diceStatus = rollSetOfDice(diceToRoll);
  currentMode = getMode(diceStatus);
  rollCounter++;
  while (diceStatus.includes(currentMode)) {
    setAsideDice.push(diceStatus[diceStatus.indexOf(currentMode)]);
    diceStatus.splice(diceStatus.indexOf(currentMode), 1);
  }

  diceToRoll = diceToRoll - setAsideDice.length;

  while (diceToRoll > 0) {
    diceStatus = rollSetOfDice(diceToRoll);

    if (getMode(diceStatus) === currentMode) {
      while (diceStatus.includes(currentMode)) {
        setAsideDice.push(diceStatus[diceStatus.indexOf(currentMode)]);

        diceStatus.splice(diceStatus.indexOf(currentMode), 1);

        diceToRoll--;
      }
    }
    rollCounter++;
  }
  return rollCounter;
}

module.exports = { displayName, welcome, playTenziFun, player };
