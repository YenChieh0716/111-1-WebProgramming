import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { render } from '@testing-library/react';
function App() {
  const [key, setKey] = useState(0);
  return (
    <div className="App">
      <Game key={key} setKey={setKey} />
    </div>
  );
}

// class Square extends React.Component {
//   // constructor(props) {
//   //   super(props);//所有react component的constructor應以此開頭
//   //   this.state = {
//   //     value: null,
//   //   };
//   // }
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   };
  // }

  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares || squares[i])) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // }
    // else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: false,
      xisNext: true,
      winner: null,
      timerKey: props.key,
      timeIsUp: false,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1]
    const squares = current.squares.slice();
    //(current.squares, this.state.timeIsUp, this.state.xisNext)
    if (calculateWinner(squares, this.state.timeIsUp, this.state.xisNext) || squares[i] || this.state.timeIsUp) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      timerKey: this.state.timeIsUp ? this.state.timerKey : !this.state.timerKey,
    });
    // this.props.setKey(timerKey => timerKey + 1)
  }

  handleTimeIsUp() {
    this.setState({
      timeIsUp: true,
    });
    // this.state
    // var winner = calculateWinner(current.squares, this.state.timeIsUp, this.state.xIsNext);

  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.state.winner === null ? calculateWinner(current.squares, this.state.timeIsUp, this.state.xisNext) : calculateWinner(current.squares, this.state.timeIsUp, this.state.xIsNext);
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner || this.state.timeIsUp) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => [this.handleClick(i)]}
          />

        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        {/*timer*/}
        <div>
          <CountdownCircleTimer
            isPlaying
            duration={5}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            key={this.state.timerKey}
            onComplete={() => this.handleTimeIsUp()}
          >
            {({ remainingTime }) => remainingTime + 'seconds left!'}
          </CountdownCircleTimer>

        </div>
      </div>

    );

  }
  restart() {
    this.props.setKey(prevKey => prevKey + 1)
  }
}

function calculateWinner(squares, timeIsUp, xIsNext) {
  if (timeIsUp) {
    var winner = xIsNext ? 'X' : 'O';
    return winner
  }
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;

}
function restart() {
  this.props.setKey(prevKey => prevKey + 1)
}
export default App;
