const checkWinningCells = (winnningCells, winningDimensions, cell) => {
  if (winnningCells.length < 4) return false;

  console.log("WinningDimensions", winningDimensions);

  let parent = cell.parentNode;

  parent.style.background = "#fff";

  console.log("Win Win Win", cell.parentNode);
  return true;
};

const getCell = (cell, row, column) => {
  console.log("Get Cell", cell, row, column);
};

export const checkStatusOfGame = (
  board,
  rowIndex,
  colIndex,
  player,
  cell,
  rows,
  columns,
  cellBoard
) => {
  console.log("check status", board, rowIndex, colIndex, cell);
  console.log("Cell board", cellBoard, cellBoard[rowIndex][colIndex]);

  /* Check Horizontally */

  let winnningCells = [board[rowIndex][colIndex]];
  let winningDimensions = [{ row: rowIndex, col: colIndex }];
  let rowToCheck = rowIndex;
  let colToCheck = colIndex - 1;

  while (colToCheck >= 0) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
      winningDimensions.push({ row: rowToCheck, col: colToCheck });
      colToCheck--;
    } else {
      break;
    }
  }

  colToCheck = colIndex + 1;

  while (colToCheck <= columns - 1) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
      winningDimensions.push({ row: rowToCheck, col: colToCheck });
      colToCheck++;
    } else {
      break;
    }
  }

  let isWinningCombo = checkWinningCells(
    winnningCells,
    winningDimensions,
    cell
  );

  if (isWinningCombo)
    return {
      isWin: true,
      winningDimensions: winningDimensions,
      WonPlayer: player,
    };

  /* Check Vertically */

  winnningCells = [board[rowIndex][colIndex]];
  winningDimensions = [{ row: rowIndex, col: colIndex }];
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex;

  while (rowToCheck >= 0) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
      winningDimensions.push({ row: rowToCheck, col: colToCheck });
      rowToCheck--;
    } else {
      break;
    }
  }

  rowToCheck = rowIndex + 1;

  while (rowToCheck <= rows - 1) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
      winningDimensions.push({ row: rowToCheck, col: colToCheck });
      rowToCheck++;
    } else {
      break;
    }
  }

  isWinningCombo = checkWinningCells(winnningCells, winningDimensions, cell);
  if (isWinningCombo)
    return {
      isWin: true,
      winningDimensions: winningDimensions,
      WonPlayer: player,
    };

  /* Check diagonally right */

  winnningCells = [board[rowIndex][colIndex]];
  winningDimensions = [{ row: rowIndex, col: colIndex }];
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex - 1;

  while (colToCheck >= 0 && rowToCheck >= 0) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
      winningDimensions.push({ row: rowToCheck, col: colToCheck });
      rowToCheck--;
      colToCheck--;
    } else {
      break;
    }
  }

  rowToCheck = rowIndex + 1;
  colToCheck = colIndex + 1;

  while (colToCheck <= columns - 1 && rowToCheck <= rows - 1) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
      winningDimensions.push({ row: rowToCheck, col: colToCheck });
      rowToCheck++;
      colToCheck++;
    } else {
      break;
    }
  }

  isWinningCombo = checkWinningCells(winnningCells, winningDimensions, cell);
  if (isWinningCombo)
    return {
      isWin: true,
      winningDimensions: winningDimensions,
      WonPlayer: player,
    };

  /* Check diagonally left */

  winnningCells = [board[rowIndex][colIndex]];
  winningDimensions = [{ row: rowIndex, col: colIndex }];
  rowToCheck = rowIndex + 1;
  colToCheck = colIndex - 1;

  while (colToCheck >= 0 && rowToCheck <= rows - 1) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
      winningDimensions.push({ row: rowToCheck, col: colToCheck });
      rowToCheck++;
      colToCheck--;
    } else {
      break;
    }
  }

  rowToCheck = rowIndex - 1;
  colToCheck = colIndex + 1;

  while (colToCheck <= columns - 1 && rowToCheck >= 0) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
      winningDimensions.push({ row: rowToCheck, col: colToCheck });
      rowToCheck--;
      colToCheck++;
    } else {
      break;
    }
  }

  isWinningCombo = checkWinningCells(winnningCells, winningDimensions, cell);
  if (isWinningCombo)
    return {
      isWin: isWinningCombo,
      winningDimensions: winningDimensions,
      WonPlayer: player,
    };
  else return { isWin: false, winningDimensions: [], wonPlayer: 0 };
};
