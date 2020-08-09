import React, { Component } from 'react';
import X from './assets/x.png';
import O from './assets/o.png';

class Game extends Component {
  state = {
    size: 3,
    boards: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    turnX: true,
    winner: null,
    endgame: false,
    positionsWin: []
  }

  handleChangeSize = event => {
    const size = parseInt(event.target.value);
    this.setState({
      size,
      boards: Array(size).fill().map(() => Array(size).fill(0)),
      turnX: true,
      winner: null,
      endgame: false,
      positionsWin: []
    });
  }

  handleClickBoard = (i, j) => {
    let { boards, turnX } = this.state;
    boards[i][j] = turnX ? 1 : -1;
    this.setState({
      boards,
      turnX: !turnX
    });
    this.checkWinner();
  }

  handleClickRestartGame = () => {
    const { size } = this.state;
    this.setState({
      boards: Array(size).fill().map(() => Array(size).fill(0)),
      turnX: true,
      winner: null,
      endgame: false,
      positionsWin: []
    });
  }

  onHideModalShowWinner = () => {
    const { size } = this.state;
    this.setState({
      boards: Array(size).fill().map(() => Array(size).fill(0)),
      turnX: true,
      winner: null,
      endgame: false,
      positionsWin: []
    });
  }

  checkWinner = () => {
    const { size, boards } = this.state;
    let { winner, endgame, positionsWin } = this.state;
    let score;
    for (let i = 0; i < size; i++) {
      score = boards[i].reduce((a, b) => a + b, 0);
      if (score === size || score === -size) {
        positionsWin = Array.from(Array(size).keys()).map(item => ({ i, item }));
        endgame = true;
        break;
      }
      score = boards.map(item => item[i]).reduce((a, b) => a + b, 0);
      if (score === size || score === -size) {
        positionsWin = Array.from(Array(size).keys()).map(item => ({ i: item, j: i }));
        endgame = true;
        break;
      }
    }
    if (!endgame) {
      score = boards.map((item, index) => item[index]).reduce((a, b) => a + b, 0);
      if (score === size || score === -size) {
        positionsWin = Array.from(Array(size).keys()).map(item => ({ i: item, j: item }));
        endgame = true;
      }
    }
    if (!endgame) {
      score = boards.map((item, index) => item[(size - 1) - index]).reduce((a, b) => a + b, 0);
      if (score === size || score === -size) {
        positionsWin = Array.from(Array(size).keys()).map(item => ({ i: item, j: (size - 1) - item }));
        endgame = true;
      }
    }
    if (!endgame) {
      const isFullBoard = !boards.some(item => item.some(item => item === 0));
      if (isFullBoard) {
        winner = 'Draw';
        endgame = true;
      }
    }
    if (endgame && score === size) 
      winner = 'X';
    else if (endgame && score === -size)
      winner = 'O';
  
    this.setState({
      winner,
      endgame,
      positionsWin
    });
  }

  render() {
    const { size, boards, turnX, winner, endgame, positionsWin } = this.state;
    const table = [];
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        let className = null;
        if (i === 0 && j === size - 1)
          className='square';
        else if (i === 0)
          className='border-right square';
        else if (j === size - 1)
          className='border-top square';
        else
          className='border-right border-top square';
        row.push(
          <div key={i + '' + j} className={className} style={{ width: `${100/size}%`, height: `${100/size}%` }} onClick={() => !endgame && boards[i][j] === 0 ? this.handleClickBoard(i, j) : null}>
            { boards[i][j] !== 0 && (
              <img className={positionsWin.some(item => item.i === i && item.j === j) ? 'w-50 xo-image xo-image-blink' : 'w-50 xo-image' } src={boards[i][j] === 1 ? X : O} alt="Logo" />
            ) }
          </div>
        );
      }
      table.push(<div key={i} className="row">{row}</div>);
    }

    return (
      <div className="container mt-3">
        <div className="form-group form-inline justify-content-center">
          <label className="mr-3">เลือกขนาด</label>
          <select className="custom-select custom-select-sm" value={size} onChange={this.handleChangeSize}>
            {
              Array.from(Array(14), (_, i) => i + 3).map(item => {
                return <option value={item} key={item}>{item + ' x ' + item}</option>
              })
            }
          </select>
        </div>
        <div className="row align-items-center no-gutters">
          <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3">
            <h3 className="border-4 border-info text-center p-2 mb-0">{endgame ? 'จบเกมส์' : (`รอบผู้เล่น ${turnX ? 'X' : 'O'}`)}</h3>
          </div>
        </div>
        { endgame && (
          <div className="row no-gutters mt-3">
            <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3">
              <div className="alert alert-info mb-0" role="alert">
                <span className="alert-link">{winner !== 'Draw' ? winner : 'เสมอ'}</span> {winner !== 'Draw' ? ' คือผู้ชนะ' : ''}
              </div>
            </div>
          </div>
        ) }
        <div className="container my-3">
          <div className="row">
            <div className="bg-info col-lg-4 offset-lg-4 col-md-6 offset-md-3">
              {table}
            </div>
          </div>
        </div>
        { boards.some(item => item.some(item => item !== 0)) && (
          <div className="text-center pb-3">
            <button type="button" className="btn btn-success text-center" onClick={() => this.handleClickRestartGame()}>เริ่มเกมส์ใหม่</button>
          </div>
        ) }
      </div>
    );
  }
}

export default Game;
