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
      row.push(' ');
    }

    //push all the rows with their respective column
    board.push(row);
  }

  //return the finally generated board
  return board;
};

//console.log(generatePlayerBoard(6, 4));
