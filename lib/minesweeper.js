'use strict';

//This will store a function that will generate a blank board of a given size to hold the player's guesses
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  //for storing the dynamically generated board
  var board = [];
  //for loop interating through number of numberOfRows
  for (var numberOfRowsIndex = 0; numberOfRowsIndex < numberOfRows; numberOfRowsIndex++) {
    //for storing the dynamically generated row
    var row = [];
    //for interating through numberOfColumns
    for (var numberOfColumnsIndex = 0; numberOfColumnsIndex < numberOfColumns; numberOfColumnsIndex++) {
      //push blank space in the row
      row.push(' ');
    }

    //push all the rows with their respective column
    board.push(row);
  }

  //return the finally generated board
  return board;
};

//console.log(generatePlayerBoard(6, 4));

//This will store a function that will generate a board containing the bombs
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  //for storing the dynamically generated board
  var board = [];
  //for loop interating through number of numberOfRows
  for (var numberOfRowsIndex = 0; numberOfRowsIndex < numberOfRows; numberOfRowsIndex++) {
    //for storing the dynamically generated row
    var row = [];
    //for interating through numberOfColumns
    for (var numberOfColumnsIndex = 0; numberOfColumnsIndex < numberOfColumns; numberOfColumnsIndex++) {
      //push null in the rows
      row.push(null);
    }

    //push all the rows with their respective column
    board.push(row);
  }

  //This keeps the track of no of bombs placed
  var numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    //Generate random row index
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    //Generate random column index
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    //Place a Bomb at the random row and column
    board[randomRowIndex][randomColumnIndex] = 'B';
    //Increment the counter
    numberOfBombsPlaced++;
  }
  //return the finally generated board
  //This has the flaw of placeing bomb in place already consisting bomb. This needs to be fixed.
  return board;
};

//This constant will hold the function that will print the board.
var printBoard = function printBoard(board) {
  return console.log(board.map(function (row) {
    return row.join('|');
  }).join('\n'));
};

//This generated the two board with the arguments passed to them
var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

//Prints the Player board
console.log('Player Board: ');
printBoard(playerBoard);

//Prints the Bomb board
console.log('Bomb Board: ');
printBoard(bombBoard);