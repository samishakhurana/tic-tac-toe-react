import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Square (props) {
      return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {

    renderSquare(i) {
      return (
        <Square value={this.props.value[i]} 
            onClick={() => this.props.onClick(i)}/>
        );
    }
  
    render() {
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
    constructor (props) {
        super(props);
        this.state = {
            history: [Array(9).fill(null)],
            XIsNext: true,
            stepNumber: 0
        }
    }
    handleClick (i) {
        let history = this.state.history.slice(0, this.state.stepNumber + 1);
        let current = history[history.length - 1].slice()
        if (calculateWinner(current) || current[i]) {
            return;
        }
        current[i] = this.state.XIsNext ? 'X' : 'O';
        this.setState({history: history.concat([current]),
            XIsNext: !this.state.XIsNext,
            stepNumber: history.length})
    }
    jumpToMove (step) {
        this.setState({stepNumber: step,
            XIsNext: step % 2 === 0});
    }
    render() {
      let status = ''
      const winner = calculateWinner(this.state.history[this.state.stepNumber])
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.XIsNext ? 'X' : 'O');
      }

      const moves = this.state.history.map((move, step) => {
          let desc = step ? `Go to move ${step}` : `Go to start of the game`
          return (
            <li key={step}>
                <button onClick={() => this.jumpToMove(step)}>{desc}</button>
            </li>
          )
      })
      return (
        <div className="game">
          <div className="game-board">
            <Board value={this.state.history[this.state.stepNumber]}
                XIsNext={this.state.XIsNext}
                onClick={this.handleClick.bind(this)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  function calculateWinner (values) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i]
          if (values[a] && values[a] === values[b] && values[b] === values[c]) {
              return values[a];
          }
      }
  }
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  