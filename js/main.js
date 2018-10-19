console.clear();
let gameType = "PvP";
let playerOne = "Joe";
let playerTwo = "Dan";
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

// ***************************************************************
// **********************      SETUP   *****************************
// ***************************************************************
function initialize() {
  hideBtn = document.querySelector("#startButton").classList.add("hidden");
} //initialize()

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

function restartGame() {
  hideClassById("finish");
  showClassById("start");
  hideClassById("startButton");
  document.getElementById("playerOneName").value = "";
  document.getElementById("playerTwoName").value = "";
  document.getElementsByName("gameType")[0].checked = false;
  document.getElementsByName("gameType")[1].checked = false;
  hideClassById("playerTwoName");
  hideClassById("playerOneName");
  document.querySelector("#finish").classList.remove("screen-win-one");
  document.querySelector("#finish").classList.remove("screen-win-two");
  document.querySelector("#finish").classList.remove("screen-win-tie");
  document.querySelector("#finish").classList.add("hidden");
  for (let i = 0; i < 10; i++) {
    player1Moves[i] = 0;
    player2Moves[i] = 0;
    player1TestMoves[i] = 0;
    player2TestMoves[i] = 0;
    totalMoves = [];
    count = 0;
  }
 
  function empty() {
	  temp2Array.length = 0;
	  tempArray.length = 0;
	  
  }
  empty();
  
  for (let i = 0; i < 9; i++) {
    let test = document.querySelector("ul.boxes");
    if (test.children[i].classList.contains("box-filled-1")) {
      test.children[i].classList.remove("box-filled-1");
    } else if (test.children[i].classList.contains("box-filled-2")) {
      test.children[i].classList.remove("box-filled-2");
    }
  }
  aRandomArray();
} //restartGame()

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
  //if space is already taken nothing happens
  if (
    e.target.classList.contains("box-filled-1") ||
    e.target.classList.contains("box-filled-2")
  ) {return;
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
  // console.log('Player 1 Moves');
  // console.log( JSON.stringify(player1Moves) );
  // console.log('Player 2 Moves');
  // console.log( JSON.stringify(player2Moves) );
}); //eventListener click to place tile and change player turn
// *************************************************************

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

function computerTurnMedium() {
  document.getElementById("player2").classList.add("active");
  document.getElementById("player1").classList.remove("active");
//  console.log(`winning moves in turnmedium ${winningMoves}`)
//  console.log(`total moves in turnmedium ${totalMoves}`)
function emptyArray(){
	temp2Array.length = 0;
	tempArray.length = 0;
}
emptyArray();
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

  if (temp2Array.length > 0) {
    playWinningMove();
  } else {
    randomSelector();
  }


  function playWinningMove() {
	  console.log(`Play Winning Move Called`)
    for (let i = 0; i < temp2Array.length; i++) {
      if (temp2Array[i].length === 1) {
        console.log(`This is the correct move ${temp2Array[i]}`);
		let testNum = (temp2Array[i][0] - 1);
		console.log(`This is testNum: ${testNum}`)
        let test = document.querySelectorAll(".box")[testNum];
        if (
          test.classList.contains("box-filled-1") ||
          test.classList.contains("box-filled-2")
        ) {
        } else {
			// console.log(`This is where we mark the correct square`)
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
	// removeWinning();
  } //function playWinningMove

  function randomSelector() {
	////random selector
	console.log(`Random Selector Was Called`)
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
    // computerBlockMove();
  } //funciton randomSelector()
  checkWinner();
} //computerTurnMedium

function computerBlockMove() {
  console.log(`winning move: ${JSON.stringify(winningMoves)}`);
  console.log(`total moves:  ${JSON.stringify(totalMoves)}`);
} //computerBlockMove()

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

//*************************GAME OVER */
function gameOver() {
  if (document.getElementById("player1").classList.contains("active")) {
    console.log("Player 1 Winner");
    document.querySelector(".message").innerHTML = `PLAYER 1 WINNER`;
    document.querySelector("#finish").classList.add("screen-win-one");
  } else if (document.getElementById("player2").classList.contains("active")) {
    console.log("Player 2 Winner");
    document.querySelector(".message").innerHTML = `PLAYER 2WINNER`;
    document.querySelector("#finish").classList.add("screen-win-two");
  }
  hideClassById("board");
  showClassById("finish");
} //function gameOver()

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
}

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
          i--;
          break;
        }
      }
    }
  }
}

aRandomArray();
initialize();
