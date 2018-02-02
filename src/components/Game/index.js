import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Modal from '../Modal';
import Cell from '../Cell';
import minesGenerator from './minesGenerator';
import './Game.scss';

export default class Game extends React.PureComponent {
  static STATES = {
    PROGRESS: 'progress',
    WIN: 'win',
    LOOSE: 'loose',
  };

  static CELL_SIZE = 30;

  static cloneField(field) {
    return field.map(row => row.map(cell => ({ ...cell })));
  }

  static openCell(field, coordinates) {
    let cell;
    try {
      cell = field[coordinates[0]][coordinates[1]];
    } catch (e) { /* Do nothing */ }

    if (!cell || cell.isOpen || cell.isMarked) {
      return;
    }

    cell.isOpen = true;
    if (cell.isMine || !!cell.risk) {
      return;
    }

    for (let i = coordinates[0] - 1; i <= coordinates[0] + 1; i += 1) {
      for (let j = coordinates[1] - 1; j <= coordinates[1] + 1; j += 1) {
        Game.openCell(field, [i, j]);
      }
    }
  }

  static generateField(settings) {
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

    return field;
  }

  constructor(props) {
    super(props);

    this.state = {
      state: Game.STATES.PROGRESS,
      initialized: false,
      field: Game.generateField(this.props.settings),
    };

    this.processField = this.processField.bind(this);
  }

  getCellClickHandler(coordinates) {
    return () => {
      const { state, initialized } = this.state;
      if (state !== Game.STATES.PROGRESS) {
        return;
      }

      const field = Game.cloneField(this.state.field);

      if (!initialized) {
        minesGenerator(field, this.props.settings, coordinates);
      }

      Game.openCell(field, coordinates);

      this.setState({ field, initialized: true });
      setTimeout(this.processField);
    };
  }

  getCellRightClickHandler([i, j]) {
    return (e) => {
      e.preventDefault();
      if (this.state.state !== Game.STATES.PROGRESS) {
        return;
      }

      const field = Game.cloneField(this.state.field);
      const cell = field[i][j];
      if (cell.isOpen) {
        return;
      }
      cell.isMarked = !cell.isMarked;

      this.setState({ field });
    };
  }

  finish(isWin) {
    const state = isWin ? Game.STATES.WIN : Game.STATES.LOOSE;
    const field = Game.cloneField(this.state.field);

    field.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isMine) {
          cell.isOpen = true;
        }
      });
    });

    this.setState({ field, state });
  }

  processField() {
    const { field } = this.state;
    const { settings } = this.props;
    let opened = 0;

    const alive = field.every(row => row.every((cell) => {
      if (cell.isOpen) {
        opened += 1;
      }
      return !cell.isOpen || !cell.isMine;
    }));

    if (!alive) {
      this.finish(false);
      return;
    }

    if (opened >= (settings.grid[0] * settings.grid[1]) - settings.mines) {
      this.finish(true);
    }
  }

  renderField() {
    return this.state.field.map((row, i) => (
      <div className="Game__Row" key={i}>
        {row.map((data, j) => (
          <Cell
            {...data}
            key={`${i}-${j}`}
            onClick={this.getCellClickHandler([i, j])}
            onContextMenu={this.getCellRightClickHandler([i, j])}
          />
        ))}
      </div>
    ));
  }

  renderFinishModal() {
    const { state } = this.state;
    const isWin = state === Game.STATES.WIN;

    return (
      <Modal show={state !== Game.STATES.PROGRESS}>
        <h1>{isWin ? 'You win! :)' : 'You lost! :('}</h1>
        <p>
          <Button onClick={this.props.onFinish}>
            {isWin ? 'One more time!' : 'Take revenge!'}
          </Button>
        </p>
      </Modal>
    );
  }

  render() {
    const { settings } = this.props;
    const fieldStyles = {
      width: `${settings.grid[1] * Game.CELL_SIZE}px`,
      height: `${settings.grid[0] * Game.CELL_SIZE}px`,
    };

    return (
      <div className="Game">
        <div className="Game__Field" style={fieldStyles}>
          {this.renderField()}
        </div>
        {this.renderFinishModal()}
      </div>
    );
  }
}

Game.propTypes = {
  onFinish: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    grid: PropTypes.arrayOf(PropTypes.number),
    mines: PropTypes.number,
  }),
};
