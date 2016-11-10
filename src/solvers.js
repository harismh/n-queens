/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

  */

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});

  for (var x = 0; x < n; x++) {
    var y = 0;
    //set piece fo x + 1
    board.togglePiece(x, y);
    while (board.hasAnyRooksConflicts()) {
      //remove piece
      board.togglePiece(x, y);
      y++;
      //set piece for y + 1
      board.togglePiece(x, y);
    }
  } 

  var solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var x = 0;
  var solutionCount = 0; 

  var recurse = function(x) {
    for (var y = 0; y < n; y++) {
      //set piece for current x and y
      board.togglePiece(x, y);
      if (!board.hasAnyRooksConflicts()) {
        //still have more rows to search
        if (x + 1 < n) {
          recurse(x + 1);
        } else { 
          //found solution
          solutionCount++;
        }
      }
      //remove piece for current x and y
      board.togglePiece(x, y);
    }
  };

  recurse(x);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var x = 0;

  var recurse = function(x) {
    for (var y = 0; y < n; y++) {
      //set piece
      board.togglePiece(x, y);
      if (!board.hasAnyQueensConflicts()) {
        //still within bounds
        if (x + 1 < n) {
          var trial = recurse(x + 1);
          //if successful
          if (trial !== false) {
            return trial;
          }
        //start over with new row;
        } else {
          return board.rows();
        }
      }
      //remove piece
      board.togglePiece(x, y);
    }
    //solution fail
    return false;
  };

  var solution = recurse(x) || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;

};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var x = 0;
  var solutionCount = 0; 

  if (n === 0) {
    return 1;
  }

  var recurse = function(x) {
    for (var y = 0; y < n; y++) {
      //set piece for current x and y
      board.togglePiece(x, y);
      if (!board.hasAnyQueensConflicts()) {
        //still have more rows to search
        if (x + 1 < n) {
          recurse(x + 1);
        } else { 
          //found solution
          solutionCount++;
        }
      }
      //remove piece for current x and y
      board.togglePiece(x, y);
    }
  };

  recurse(x);

  console.log(solutionCount);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};










