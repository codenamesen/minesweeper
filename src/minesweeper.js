//Arrow function used to print the board
const printBoard = board => {
  console.log('Current Board:');
  console.log(board[0].join('|'));
  console.log(board[1].join('|'));
  console.log(board[2].join('|'));
};

//________________Create an empty 3 X 3 board with three single space in each of the nested arrays_________________
const board = [
          [' ', ' ', ' '],
          [' ', ' ', ' '],
          [' ', ' ', ' ']
        ];


//_______________Display an empty board on the console.__________________________
printBoard(board);

//_______________Set the second element of the first row________________
board[0][1] = '1';
board[2][2] = 'B';

printBoard(board);
