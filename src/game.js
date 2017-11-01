// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

//This imports the Board class
import {Board} from './board';

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
      console.log(`Game over! Final Board`);      
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
