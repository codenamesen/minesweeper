'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Creates a class named Board and exports it as a module
var Board = exports.Board = function () {
  //Used to create an instance of the Board, the arguments determines the size and the no. of Bombs present
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;

    //calculates the total number of tiles available and stores it in the variable
    this._numberOfTiles = numberOfRows * numberOfColumns;
    //Calls the function generatePlayerBoard function to creates the player board and stores it to the variable
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    //Calls the function generatePlayerBoard function to creates the bomb board and stores it to the variable
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  //Getter Method to access the variable _playerBoard


  _createClass(Board, [{
    key: 'flipTile',


    //Method that flips the tile
    value: function flipTile(rowIndex, columnIndex) {
      //Checks if the flipped tile is empty
      if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped');
        return;

        //Checks if the flipped tile has a bomb in the corresponding square in bombBoard
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        //If there is a bomb in the boamboard mark it with 'B' in the corresponding index of the playerBoard
        this.playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        //Puts the total no of bombs present in the neighouring squares of the bombboard
        this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighbourBombs(rowIndex, columnIndex);
      }

      //Return the no of tiles not flipped yet
      this._numberOfTiles--;
    }

    //This method calculates the no. of adjacent bombs to a squeare

  }, {
    key: 'getNumberOfNeighbourBombs',
    value: function getNumberOfNeighbourBombs(rowIndex, columnIndex) {
      var _this = this;

      //This constant stores the array which represents the neighbouring 8 squares
      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

      //This constant stores the total no. of rows present in the board
      var numberOfRows = this._bombBoard.length;
      //This constant stores the total no. of column present in the board
      var numberOfColumns = this._bombBoard[0].length;

      //This constatnt will be used to store the no. of bombs present to the adjacent of the squeare clicked
      var numberOfBombs = 0;

      //This iterator will check all the neighboring squares for the presence of bombs
      neighborOffsets.forEach(function (offset) {
        //Add the rowIndex with the first value in the offset array to get the row value of the adjoining square
        var neighborRowIndex = rowIndex + offset[0];

        //Add the rowIndex with the first value in the offset array to get the row value of the adjoining square
        var neighborColumnIndex = columnIndex + offset[1];

        //Checks if the adjacent square do exists
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {

          //Checks if bomb is present in the selected adjacent square
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            //If bomb is present the counter is incremented by one.
            numberOfBombs++;
          }
        }
      });

      //Returns totoal no. of Bomb present in the adjacent squares
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTile',


    //This method is used to inform the user that there are no more non-bomb/safe tiles
    value: function hasSafeTile() {
      //This statements checks the number of tiles not flipped against the number of bombs present
      return this._numberOfTiles !== this._numberOfBombs;
    }

    //This function will print the board.

  }, {
    key: 'print',
    value: function print() {
      console.log(this.playerBoard.map(function (row) {
        return row.join('|');
      }).join('\n'));
    }

    //This function will generate a blank board of a given size to hold the player's guesses

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      //for storing the dynamically generated board
      var board = [];

      //for loop interating through number of numberOfRows
      for (var numberOfRowsIndex = 0; numberOfRowsIndex < numberOfRows; numberOfRowsIndex++) {

        //for storing the dynamically generated row
        var row = [];

        //for interating through numberOfColumns
        for (var numberOfColumnsIndex = 0; numberOfColumnsIndex < numberOfColumns; numberOfColumnsIndex++) {
          //push blank space in the row array
          row.push(' ');
        }

        //push all the completed row with to the board array
        board.push(row);
      }

      //return the finally generated board array
      return board;
    }
    //console.log(generatePlayerBoard(6, 4));


    //This function will generate a board containing the bombs

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {

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

      //This variable keeps the track of no of bombs placed
      var numberOfBombsPlaced = 0;

      while (numberOfBombsPlaced < numberOfBombs) {

        //Generate random row index
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);

        //Generate random column index
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

        //Checks if the square already has a bomb
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {

          //Place a Bomb at the random row and column
          board[randomRowIndex][randomColumnIndex] = 'B';
          //Increment the counter
          numberOfBombsPlaced++;
        }
      }

      //return the finally generated board containing bombs placed randomly
      return board;
    }
  }]);

  return Board;
}();

//const g = new Game(3, 3, 3);

//g.playMove(0, 1);