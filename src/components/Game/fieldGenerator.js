function increaseRiskAround(field, coordinates) {
  for (let i = coordinates[0] - 1; i <= coordinates[0] + 1; i += 1) {
    for (let j = coordinates[1] - 1; j <= coordinates[1] + 1; j += 1) {
      try {
        const cell = field[i][j];
        if (cell.isMine) {
          continue;
        }
        cell.risk += 1;
      } catch (e) { /* Do nothing */ }
    }
  }
}

function generateMines(field, settings) {
  let minesLeft = settings.mines;
  while (minesLeft > 0) {
    const i = Math.round(Math.random() * (settings.grid[0] - 1));
    const j = Math.round(Math.random() * (settings.grid[1] - 1));

    const cell = field[i][j];
    if (cell.isMine) {
      continue;
    }

    cell.isMine = true;
    cell.risk = 0;
    minesLeft -= 1;

    increaseRiskAround(field, [i, j]);
  }
}

export default function fieldGenerator(settings) {
  const field = [];
  for (let i = 0; i < settings.grid[0]; i += 1) {
    field[i] = [];
    for (let j = 0; j < settings.grid[1]; j += 1) {
      field[i][j] = {
        isOpen: false,
        isMarked: false,
        isMine: false,
        risk: 0,
      };
    }
  }

  generateMines(field, settings);

  return field;
}
