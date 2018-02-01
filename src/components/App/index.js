import React from 'react';
import Button from '../Button';
import Modal from '../Modal';
import './App.scss';

const settingsMap = {
  easy: {
    grid: [10, 10],
    mines: 10,
  },
  medium: {
    grid: [20, 20],
    mines: 50,
  },
  hard: {
    grid: [40, 20],
    mines: 100,
  }
};

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      settings: {},
      inGame: false,
      initialized: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ initialized: true });
    });
  }

  startGame(settings) {
    this.setState({
      settings,
      inGame: true,
    });
  }

  getLevelClickHandler(level) {
    return () => {
      this.startGame(settingsMap[level]);
    };
  }

  render() {
    const { initialized, inGame } = this.state;

    return (
      <div className="App">
        <Modal show={initialized && !inGame}>
          <h1>Mine Sweeper V2</h1>
          <p>
            <Button onClick={this.getLevelClickHandler('easy')}>
              Easy
            </Button>
            <Button onClick={this.getLevelClickHandler('medium')}>
              Medium
            </Button>
            <Button onClick={this.getLevelClickHandler('hard')}>
              Hard
            </Button>
          </p>
        </Modal>
      </div>
    );
  }
}
