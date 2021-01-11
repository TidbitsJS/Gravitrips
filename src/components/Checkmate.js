const checkWinningCells = (winnningCells) => {
  if (winnningCells.length < 4) return false;

  console.log("Win Win Win");
  return true;
};

export const checkStatusOfGame = (
  board,
  rowIndex,
  colIndex,
  player,
  cell,
  rows,
  columns
) => {
  console.log("check status", board, rowIndex, colIndex, cell);

  /* Check Horizontally */

  let winnningCells = [board[rowIndex][colIndex]];
  let rowToCheck = rowIndex;
  let colToCheck = colIndex - 1;

  while (colToCheck >= 0) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
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
      colToCheck++;
    } else {
      break;
    }
  }

  let isWinningCombo = checkWinningCells(winnningCells);
  if (isWinningCombo) return true;

  /* Check Vertically */

  winnningCells = [board[rowIndex][colIndex]];
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex;

  while (rowToCheck >= 0) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
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
      rowToCheck++;
    } else {
      break;
    }
  }

  isWinningCombo = checkWinningCells(winnningCells);
  if (isWinningCombo) return true;

  /* Check diagonally right */

  winnningCells = [board[rowIndex][colIndex]];
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex - 1;

  while (colToCheck >= 0 && rowToCheck >= 0) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
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
      rowToCheck++;
      colToCheck++;
    } else {
      break;
    }
  }

  isWinningCombo = checkWinningCells(winnningCells);
  if (isWinningCombo) return true;

  /* Check diagonally left */

  winnningCells = [board[rowIndex][colIndex]];
  rowToCheck = rowIndex + 1;
  colToCheck = colIndex - 1;

  while (colToCheck >= 0 && rowToCheck <= rows - 1) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
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
      rowToCheck--;
      colToCheck++;
    } else {
      break;
    }
  }

  isWinningCombo = checkWinningCells(winnningCells);
  if (isWinningCombo) return true;
};
