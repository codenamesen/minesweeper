//The main class used to call the methods in Board class
class Game {
  //This constructor creates a new instance of the class Board
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  //This method starts a session of Minesweeper
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);

    //This control statement checks if the flipped tile has a bomb
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log(`The game is over!`);
      console.log(`Current Board: `)
      this._board.print();

    } else if(!this._board.hasSafeTile()) {  /*Checks whether any more safe tiles are left*/
      console.log(`You Won the Game!`);
      console.log(`Entire Board: `)
      //prints the entire board
      this._board.print();

    } else {  /*This is executed if there is still safe tile left and a bomb tile has not been clicked*/
      console.log(`Current Board: `)
      this._board.print();
    }
  }
}

//Creates a class named Board
class Board {
  //Used to create an instance of the Board, the arguments determines the size and the no. of Bombs present
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;

    //calculates the total number of tiles available and stores it in the variable
    this._numberOfTiles = numberOfRows * numberOfColumns;
    //Calls the function generatePlayerBoard function to creates the player board and stores it to the variable
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    //Calls the function generatePlayerBoard function to creates the bomb board and stores it to the variable
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  //Getter Method to access the variable _playerBoard
  get playerBoard() {
    return this._playerBoard;
  }

  //Method that flips the tile
  flipTile(rowIndex, columnIndex) {
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
  getNumberOfNeighbourBombs(rowIndex, columnIndex) {
    //This constant stores the array which represents the neighbouring 8 squares
    const neighborOffsets = [[-1, -1], [-1,0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    //This constant stores the total no. of rows present in the board
    const numberOfRows = this._bombBoard.length;
    //This constant stores the total no. of column present in the board
    const numberOfColumns = this._bombBoard[0].length;

    //This constatnt will be used to store the no. of bombs present to the adjacent of the squeare clicked
    let numberOfBombs = 0;

    //This iterator will check all the neighboring squares for the presence of bombs
    neighborOffsets.forEach(offset => {
      //Add the rowIndex with the first value in the offset array to get the row value of the adjoining square
      const neighborRowIndex = rowIndex + offset[0];

      //Add the rowIndex with the first value in the offset array to get the row value of the adjoining square
      const neighborColumnIndex = columnIndex + offset[1];

      //Checks if the adjacent square do exists
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {

        //Checks if bomb is present in the selected adjacent square
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          //If bomb is present the counter is incremented by one.
          numberOfBombs++;
        }
      }
    });

    //Returns totoal no. of Bomb present in the adjacent squares
    return numberOfBombs;
  };

  //This method is used to inform the user that there are no more non-bomb/safe tiles
  hasSafeTile() {
    //This statements checks the number of tiles not flipped against the number of bombs present
    return this._numberOfTiles !== this._numberOfBombs;
  }

  //This function will print the board.
  print() {
    console.log(this.playerBoard.map(row => row.join('|')).join('\n'));
  }

  //This function will generate a blank board of a given size to hold the player's guesses
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    //for storing the dynamically generated board
    let board = [];

    //for loop interating through number of numberOfRows
    for (let numberOfRowsIndex = 0; numberOfRowsIndex < numberOfRows; numberOfRowsIndex++) {

      //for storing the dynamically generated row
      let row = [];

      //for interating through numberOfColumns
      for (let numberOfColumnsIndex = 0; numberOfColumnsIndex < numberOfColumns; numberOfColumnsIndex++) {
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
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {

    //for storing the dynamically generated board
    let board = [];

    //for loop interating through number of numberOfRows
    for (let numberOfRowsIndex = 0; numberOfRowsIndex < numberOfRows; numberOfRowsIndex++) {
      //for storing the dynamically generated row

      let row = [];

      //for interating through numberOfColumns
      for (let numberOfColumnsIndex = 0; numberOfColumnsIndex < numberOfColumns; numberOfColumnsIndex++) {
        //push null in the rows
        row.push(null);
      }

      //push all the rows with their respective column
      board.push(row);
    }

    //This variable keeps the track of no of bombs placed
    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs) {

      //Generate random row index
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);

      //Generate random column index
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

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
}

const g = new Game(3, 3, 3);

g.playMove(0, 1);
