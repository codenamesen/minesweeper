//This will store a function that will generate a blank board of a given size to hold the player's guesses
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  //for storing the dynamically generated board
  let board = [];
  //for loop interating through number of numberOfRows
  for (let numberOfRowsIndex = 0; numberOfRowsIndex < numberOfRows; numberOfRowsIndex++) {
    //for storing the dynamically generated row
    let row = [];
    //for interating through numberOfColumns
    for (let numberOfColumnsIndex = 0; numberOfColumnsIndex < numberOfColumns; numberOfColumnsIndex++) {
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
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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

  //This keeps the track of no of bombs placed
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
  //return the finally generated board
  //This has the flaw of placeing bomb in place already consisting bomb. This needs to be fixed.
  return board;
};

//This constant holds the function that calculates the no. of adjacent bombs to a squeare
const getNumberOfNeighbourBombs = (bombBoard, rowIndex, columnIndex) => {
  //This constant stores the array which represents the neighbouring 8 squares
  const neighborOffsets = [[-1, -1], [-1,0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, 0], [1, 1]];
  //This constant stores the total no. of rows present in the board
  const numberOfRows = bombBoard.length;
  //This constant stores the total no. of column present in the board
  const numberOfColumns = bombBoard[0].length;
  //This constatnt will be used to store the no. of bombs present to the adjacent of the squeare clicked
  let numberOfBombs = 0;

  //This iterator will check all the neighboring squares for the presence of bombs
  neighborOffsets.forEach(offset => {
    //Add the row
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    //Checks if the adjacent squeares do exists
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      //Checks if bomb is present in the selected adjacent square
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        //If bomb is present the counter is incremented by one.
        numberOfBombs++;
      }
    }
  });

  //Returns totoal no. of Bomb present in the adjacent squares
  return numberOfBombs;
};

//This constant stores the function that allows the user to filp tile.
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  //Checks if the flipped tile is empty
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped');
    return;
    //Checks if the flipped tile has a bomb in the corresponding square in bombBoard
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    //If there is a bomb in the boamboard mark it with 'B' in the playerBoard
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    //Puts the total no of bombs present in the neighouring squares
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighbourBombs(bombBoard, rowIndex, columnIndex);
  }
};


//This constant will hold the function that will print the board.
const printBoard = board => console.log(board.map(row => row.join('|')).join('\n'));

//This generated the two board with the arguments passed to them
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

//Prints the Player board
console.log('Player Board: ');
printBoard(playerBoard);

//Prints the Bomb board
console.log('Bomb Board: ');
printBoard(bombBoard);

//call the fliptile function with the board and the idexes for flipping the tile.
flipTile(playerBoard, bombBoard, 0, 0);

console.log('Updated Player Board: ')

//Prints the updated Player board
printBoard(playerBoard);
