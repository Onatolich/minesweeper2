import React from 'react';
import PropTypes from 'prop-types';
import './Game.scss';

export default class Game extends React.PureComponent {
  render() {
    return (
      <div className="Game">Game</div>
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
