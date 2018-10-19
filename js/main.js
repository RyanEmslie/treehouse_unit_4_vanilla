let gameType = "";
let playerOne = "";
let playerTwo = "";
let playerComputer = "Computer";
let count = 0;
let randomIndex = [];
let totalMoves = [];
let tempArray = [];
let temp2Array = [];
let winningMoves = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];
player1TestMoves = [];
player2TestMoves = [];
player1Moves = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
player2Moves = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
aRandomArray();
initialize();

// ***************************************************************
// **********************      SETUP   *****************************
// ***************************************************************
function initialize() {
  hideBtn = document.querySelector("#startButton").classList.add("hidden");
} //initialize()

//
//Function displays corect name input based on game type selected
function playerNames() {
  gameType = "";
  hideClassById("playerOneName");
  hideClassById("playerTwoName");
  hideClassById("startButton");
  if (document.getElementsByName("gameType")[0].checked) {
    gameType = "PvP";
    showClassById("playerOneName");
    showClassById("playerTwoName");
  } else if (document.getElementsByName("gameType")[1].checked) {
    gameType = "PvCEasy";
    showClassById("playerOneName");
  } else if (document.getElementsByName("gameType")[2].checked) {
    gameType = "PvCMedium";
    showClassById("playerOneName");
  }
  showClassById("startButton");
} //playerNames()

//
//Function called after play correctly enters name - attached to button
function startGame() {
  playerOne = document.getElementById("playerOneName").value;
  playerTwo = document.getElementById("playerTwoName").value;
  if (gameType === "PvP") {
    if (playerOne !== "" && playerTwo !== "") {
      setGameBoard();
    } else {
      alert(`Please enter Both Player's Name`);
    }
  } else if (gameType === "PvCEasy" || gameType === "PvCMedium") {
    if (playerOne !== "") {
      setGameBoard();
    } else {
      alert(`Please enter Player One Name`);
    }
  }
} // startGame()

function setGameBoard() {
  hideClassById("start");
  showClassById("board");
  document.getElementById("player1").classList.add("active");
  document.getElementById("player2").classList.remove("active");
  if (gameType === "PvP") {
    displayPlayers(playerOne, playerTwo);
  } else {
    displayPlayers(playerOne, playerComputer);
  }
} // setGameBoard()

//displays users name on the game board
function displayPlayers(x, y) {
  document.getElementById("displayName1").textContent = x;
  document.getElementById("displayName2").textContent = y;
} //displayPlayers

function hideClassById(id) {
  document.getElementById(id).classList.add("hidden");
} //hideClassById()

function showClassById(id) {
  document.getElementById(id).classList.remove("hidden");
} //showClassById

// ******************************************************
//*****************************************************
// **********EVENTLISTENERS**************************
//*****************************************************
document.querySelector("ul.boxes").addEventListener("mouseout", function(e) {
  e.target.removeAttribute("style");
}); // eventListener to hover image over available tile
document.querySelector("ul.boxes").addEventListener("mouseover", function(e) {
  if (
    e.target.classList.contains("box-filled-1") ||
    e.target.classList.contains("box-filled-2")
  ) {
  } else {
    if (document.getElementById("player1").classList.contains("active")) {
      e.target.style.backgroundImage = 'url("img/o.svg")';
    } else {
      e.target.style.backgroundImage = 'url("img/x.svg")';
    }
  }
}); // mouse over event

//Click function only for Player 1
document.querySelector("ul.boxes").addEventListener("click", function(e) {
  //if space is already taken nothing happens prevents click
  if (
    e.target.classList.contains("box-filled-1") ||
    e.target.classList.contains("box-filled-2")
  ) {
    return;
  } else {
    //nested conditional if symbol is placed on open space based active class
    if (document.getElementById("player1").classList.contains("active")) {
      e.target.classList.add("box-filled-1");
      let num = e.target.id;
      player1Moves[num] = player1Moves[num] + 1;
      player1TestMoves.push(num);
      totalMoves.push([parseInt(num)]);
      count = count + 1;
    } else if (
      document.getElementById("player2").classList.contains("active")
    ) {
      e.target.classList.add("box-filled-2");
      let num = e.target.id;
      player2Moves[num] = player2Moves[num] + 1;
      count = count + 1;
      console.log(`Count in EventList Player 2: ${count}`);
    }
  }
  checkWinner();
}); //eventListener click to place tile and change player turn

//Function for game logic
const checkWinner = () => {
  if (
    player1Moves[1] + player1Moves[2] + player1Moves[3] === 3 ||
    player1Moves[4] + player1Moves[5] + player1Moves[6] === 3 ||
    player1Moves[7] + player1Moves[8] + player1Moves[9] === 3 ||
    player1Moves[1] + player1Moves[4] + player1Moves[7] === 3 ||
    player1Moves[2] + player1Moves[5] + player1Moves[8] === 3 ||
    player1Moves[3] + player1Moves[6] + player1Moves[9] === 3 ||
    player1Moves[1] + player1Moves[5] + player1Moves[9] === 3 ||
    player1Moves[3] + player1Moves[5] + player1Moves[7] === 3
  ) {
    setTimeout(function() {
      gameOver();
    }, 300);
  } else if (
    player2Moves[1] + player2Moves[2] + player2Moves[3] === 3 ||
    player2Moves[4] + player2Moves[5] + player2Moves[6] === 3 ||
    player2Moves[7] + player2Moves[8] + player2Moves[9] === 3 ||
    player2Moves[1] + player2Moves[4] + player2Moves[7] === 3 ||
    player2Moves[2] + player2Moves[5] + player2Moves[8] === 3 ||
    player2Moves[3] + player2Moves[6] + player2Moves[9] === 3 ||
    player2Moves[1] + player2Moves[5] + player2Moves[9] === 3 ||
    player2Moves[3] + player2Moves[5] + player2Moves[7] === 3
  ) {
    setTimeout(function() {
      gameOver();
    }, 300);
  } else if (count > 8) {
    document.getElementById("player1").classList.remove("active");
    document.getElementById("player2").classList.remove("active");
    document.querySelector(".message").innerHTML = `TIE`;
    document.querySelector("#finish").classList.add("screen-win-tie");
    setTimeout(function() {
      gameOver();
    }, 300);
  } else {
    setTimeout(function() {
      changePlayer();
    }, 300);
  }
}; //function checkWinner

//Computer picks a random number to test if space is available
function computerTurnEasy() {
  document.getElementById("player2").classList.add("active");
  document.getElementById("player1").classList.remove("active");
  for (let i = 0; i < randomIndex.length; i++) {
    let testNum = randomIndex[i];
    let test = document.querySelectorAll(".box")[testNum];

    if (
      test.classList.contains("box-filled-1") ||
      test.classList.contains("box-filled-2")
    ) {
    } else {
      document.querySelectorAll(".box")[testNum].classList.add("box-filled-2");
      testNum = testNum + 1;
      player2Moves[testNum] = player2Moves[testNum] + 1;
      player2TestMoves.push(testNum);
      totalMoves.push([testNum]);
      count = count + 1;
      i = 100;
    }
  }
  checkWinner();
} //function computerTurnEasy

//function for medium play - defensive mode - prevents player 1 from winning (mostly)
function computerTurnMedium() {
  document.getElementById("player2").classList.add("active");
  document.getElementById("player1").classList.remove("active");

  function emptyArray() {
    temp2Array.length = 0;
    tempArray.length = 0;
  }
  emptyArray();
  //For loop that cycles through possible winning moves and filters out options that contain non-available spaces and pushes best move into new array
  for (let k = 0; k < winningMoves.length; k++) {
    for (let j = 0; j < winningMoves.length; j++) {
      for (let i = 0; i < totalMoves.length; i++) {
        if (totalMoves[i].includes(winningMoves[k][j])) {
          let tempNum = totalMoves[i];
          let test = winningMoves[k].filter(x => x !== tempNum[0]);
          tempArray.push(test);
        }
      }
    }
  }
  console.log(`Temp 1 Array:  ${JSON.stringify(tempArray)}`);
  //newly created array is filtered to find wining move (best defensive play)
  for (let c = 0; c < tempArray.length; c++) {
    for (let b = 0; b < tempArray.length; b++) {
      for (let a = 0; a < totalMoves.length; a++) {
        if (totalMoves[a].includes(tempArray[c][b])) {
          let tempNum = totalMoves[a];
          let test2 = tempArray[c].filter(x => x !== tempNum[0]);
          temp2Array.push(test2);
        }
      }
    }
  }
  console.log(`Temp 2 Array:   ${JSON.stringify(temp2Array)}`);

  //if winning array is empty a spot will be chosen at ranom.  Similar to Easy mode
  if (temp2Array.length > 0) {
    playWinningMove();
  } else {
    randomSelector();
  }

  //Function uses newly create array to place position on the board.
  function playWinningMove() {
    console.log(`Play Winning Move Called`);
    for (let i = 0; i < temp2Array.length; i++) {
      if (temp2Array[i].length === 1) {
        console.log(`This is the correct move ${temp2Array[i]}`);
        let testNum = temp2Array[i][0] - 1;
        console.log(`This is testNum: ${testNum}`);
        let test = document.querySelectorAll(".box")[testNum];
        if (
          test.classList.contains("box-filled-1") ||
          test.classList.contains("box-filled-2")
        ) {
        } else {
          document
            .querySelectorAll(".box")
            [testNum].classList.add("box-filled-2");
          testNum = testNum + 1;
          player2Moves[testNum] = player2Moves[testNum] + 1;
          player2TestMoves.push(testNum);
          totalMoves.push([testNum]);
          count = count + 1;
          removeWinning();
          break;
          //   computerBlockMove();
        }
      } else {
        randomSelector();
      }
    }
  } //function playWinningMove

  //Used to randomly place available spot
  function randomSelector() {
    console.log(`Random Selector Was Called`);
    for (let i = 0; i < randomIndex.length; i++) {
      let testNum = randomIndex[i];
      let test = document.querySelectorAll(".box")[testNum];

      if (
        test.classList.contains("box-filled-1") ||
        test.classList.contains("box-filled-2")
      ) {
      } else {
        document
          .querySelectorAll(".box")
          [testNum].classList.add("box-filled-2");
        testNum = testNum + 1;
        player2Moves[testNum] = player2Moves[testNum] + 1;
        player2TestMoves.push(testNum);
        totalMoves.push([testNum]);
        count = count + 1;
        i = 100;
      }
    } //for loop
    removeWinning();
  } //funciton randomSelector()

  checkWinner();
} //computerTurnMedium

//changes the state of the player
function changePlayer() {
  //   console.log(`Count in changePlay:  ${count}`);
  if (count > 8) {
    setTimeout(function() {
      gameOver();
    }, 500);
  } else {
    let pOne = document.getElementById("player1");
    let pTwo = document.getElementById("player2");
    if (document.getElementById("player1").classList.contains("active")) {
      document.getElementById("player1").classList.remove("active");
      document.getElementById("player2").classList.add("active");
    } else {
      document.getElementById("player1").classList.add("active");
      document.getElementById("player2").classList.remove("active");
    }
    if (
      document.getElementById("player2").classList.contains("active") &&
      gameType === "PvCEasy"
    ) {
      computerTurnEasy();
    }
    if (pTwo.classList.contains("active") && gameType === "PvCMedium") {
      computerTurnMedium();
    }
  }
} //changePlayer

//function display either winner or loser
function gameOver() {
  if (document.getElementById("player1").classList.contains("active")) {
    console.log("Player 1 Winner");
    document.querySelector(".message").innerHTML = `${playerOne} WINNER`;
    document.querySelector("#finish").classList.add("screen-win-one");
  } else if (document.getElementById("player2").classList.contains("active")) {
    console.log("Player 2 Winner");
    document.querySelector("#finish").classList.add("screen-win-two");
    if (gameType === "PvP") {
    document.querySelector(".message").innerHTML = `${playerTwo} WINNER`;
  }else {
    document.querySelector(".message").innerHTML = `COMPUTER WINNER`;
  }
    
  }
  hideClassById("board");
  showClassById("finish");
} //function gameOver()

//function that creates a random array 9 unique numbers
function aRandomArray() {
  randomIndex = [];
  for (let i = 0; i < 9; i++) {
    let randomArray = Math.floor(Math.random() * 9);
    if (randomIndex.indexOf(randomArray) === -1) {
      randomIndex.push(randomArray);
    } else {
      i = i - 1;
    }
  }
} //aRandomArray()

function removeWinning() {
  //game logic
  for (let k = 0; k < player2TestMoves.length; k++) {
    for (let i = 0; i < winningMoves.length; i++) {
      //loop iterates through the each value of each array
      for (let j = 0; j < winningMoves[i].length; j++) {
        if (winningMoves[i][j] === player2TestMoves[k]) {
          //if matching value found, remove entire array splic(indexStar, indexEnd)
          winningMoves.splice(i, 1);
          //if array is spliced, index number needs to be reduced by 1
          i--;s
          break;
        }
      }
    }
  }
} //removeWinning();
