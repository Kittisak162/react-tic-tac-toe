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
    endgame: false
  }

  handleChangeSize = event => {
    const size = parseInt(event.target.value);
    this.setState({
      size,
      boards: Array(size).fill().map(() => Array(size).fill(0)),
      turnX: true,
      winner: null,
      endgame: false
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
      endgame: false
    });
  }

  onHideModalShowWinner = () => {
    const { size } = this.state;
    this.setState({
      boards: Array(size).fill().map(() => Array(size).fill(0)),
      turnX: true,
      winner: null,
      endgame: false
    });
  }

  checkWinner = () => {
    const { size, boards } = this.state;
    let { winner, endgame } = this.state;
    let scores = [];
    for (let i = 0; i < size; i++) {
      scores.push(boards[i].reduce((a, b) => a + b, 0));
      scores.push(boards.map(item => item[i]).reduce((a, b) => a + b, 0));
    }
    scores.push(boards.map((item, index) => item[index]).reduce((a, b) => a + b, 0));
    scores.push(boards.map((item, index) => item[(size - 1) - index]).reduce((a, b) => a + b, 0));
    if (scores.find(item => item === size)) {
      winner = 'X';
      endgame = true;
    } else if (scores.find(item => item === -size)) {
      winner = 'O';
      endgame = true;
    }
    if (!endgame) {
      const isFullBoard = !boards.some(item => item.some(item => item === 0));
      if (isFullBoard) {
        winner = 'Draw';
        endgame = true;
      }
    }
    this.setState({
      winner,
      endgame
    });
  }

  render() {
    const { size, boards, turnX, winner, endgame } = this.state;
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
              <img className="w-50 xo-image" src={boards[i][j] === 1 ? X : O} alt="Logo" />
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
          <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3">
            <h3 className="border-4 border-info text-center p-2 mb-0">{endgame ? 'จบเกมส์' : (`ถึงตา ${turnX ? 'X' : 'O'}`)}</h3>
          </div>
          { boards.some(item => item.some(item => item !== 0)) && (
            <div className="col-lg-4 col-md-3 d-flex justify-content-center justify-content-lg-end justify-content-md-end justify-content-sm-center mt-2 mt-sm-2 mt-md-0 mt-lg-0">
              <button type="button" className="btn btn-success text-right" onClick={() => this.handleClickRestartGame()}>เริ่มเกมส์ใหม่</button>
            </div>
          ) }
        </div>
        { endgame && (
          <div class="alert alert-info mt-3" role="alert">
            <span className="alert-link">{winner !== 'Draw' ? winner : 'เสมอ'}</span> {winner !== 'Draw' ? ' คือผู้ชนะ' : ''}
          </div>
        ) }
        <div className="container card bg-info my-3">
          {table}
        </div>
      </div>
    );
  }
}

export default Game;
