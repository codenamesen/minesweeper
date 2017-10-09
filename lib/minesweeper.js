'use strict';

//This constant variable holds the pipe character used to create the grid
var blankLine = '  |   |  ';

console.log('This is what an empty board would look like:');

console.log(blankLine);
console.log(blankLine);
console.log(blankLine);

//This constant variable holds the guess(bomb) in the first square
var guessLine = '1 |   |  ';

//This constant variable holds the revealed bomb
var bombLine = '  | B |  ';

console.log('This is what a board with a guess and a bomb on it would look like:');

console.log(guessLine);
console.log(bombLine);
console.log(blankLine);