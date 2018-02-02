function isNeighbour(coordinate, base) {
  return coordinate >= base - 1 && coordinate <= base + 1;
}

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

export default function minesGenerator(field, settings, initialCell) {
  let minesLeft = settings.mines;
  while (minesLeft > 0) {
    const i = Math.round(Math.random() * (settings.grid[0] - 1));
    const j = Math.round(Math.random() * (settings.grid[1] - 1));

    const cell = field[i][j];
    if (isNeighbour(i, initialCell[0]) || isNeighbour(j, initialCell[1]) || cell.isMine) {
      continue;
    }

    cell.isMine = true;
    cell.risk = 0;
    minesLeft -= 1;

    increaseRiskAround(field, [i, j]);
  }
}
