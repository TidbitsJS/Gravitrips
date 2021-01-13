const checkWinningCells = (winnningCells, winningDimensions, cell) => {
  if (winnningCells.length < 4) return false;

  console.log("WinningDimensions", winningDimensions);

  let parent = cell.parentNode;

  parent.style.background = "#fff";

  console.log("Win Win Win", cell.parentNode);
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
  /* Check Horizontally */

  let winnningCells = [board[rowIndex][colIndex]];
  let winningDimensions = { [`${rowIndex}-${colIndex}`]: true };
  let rowToCheck = rowIndex;
  let colToCheck = colIndex - 1;

  while (colToCheck >= 0) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
      winningDimensions[[`${rowToCheck}-${colToCheck}`]] = true;
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
      winningDimensions[[`${rowToCheck}-${colToCheck}`]] = true;
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
  winningDimensions = { [`${rowIndex}-${colIndex}`]: true };
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex;

  while (rowToCheck >= 0) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
      winningDimensions[[`${rowToCheck}-${colToCheck}`]] = true;
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
      winningDimensions[[`${rowToCheck}-${colToCheck}`]] = true;
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
  winningDimensions = { [`${rowIndex}-${colIndex}`]: true };
  rowToCheck = rowIndex - 1;
  colToCheck = colIndex - 1;

  while (colToCheck >= 0 && rowToCheck >= 0) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
      winningDimensions[[`${rowToCheck}-${colToCheck}`]] = true;
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
      winningDimensions[[`${rowToCheck}-${colToCheck}`]] = true;
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
  winningDimensions = { [`${rowIndex}-${colIndex}`]: true };
  rowToCheck = rowIndex + 1;
  colToCheck = colIndex - 1;

  while (colToCheck >= 0 && rowToCheck <= rows - 1) {
    const cellToCheck = board[rowToCheck][colToCheck];

    if (cellToCheck === player) {
      winnningCells.push(cellToCheck);
      winningDimensions[[`${rowToCheck}-${colToCheck}`]] = true;
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
      winningDimensions[[`${rowToCheck}-${colToCheck}`]] = true;
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

  for (const row of board) {
    for (const column of row) {
      if (column !== 1 && column !== 2) {
        return { isWin: false, winningDimensions: {}, wonPlayer: 0 };
      }
    }
  }

  return { isWin: true, winningDimensions: {}, wonPlayer: -1 };
};
