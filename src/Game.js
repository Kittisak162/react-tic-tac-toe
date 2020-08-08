import React, { Component } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
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
    const board = [];
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
      board.push(<div key={i} className="row">{row}</div>);
    }

    return (
      <div className="container mt-3">
        <Modal show={endgame} centered onHide={() => this.onHideModalShowWinner()}>
          <ModalBody>
            <div>
                <h1 className="display-1">{winner}</h1>
                <h2>คือผู้ชนะ</h2>
            </div>
          </ModalBody>
        </Modal>
        <div>
          <h2 className="text-center">เลือกขนาด</h2>
          <select className="form-control" value={size} onChange={this.handleChangeSize}>
            {
              Array.from(Array(14), (_, i) => i + 3).map(item => {
                return <option value={item} key={item}>{item + ' x ' + item}</option>
              })
            }
          </select>
          <h5 className="text-center my-3">{endgame ? 'จบเกมส์' : (`ถึงตา ${turnX ? 'X' : 'O'}`)}</h5>
          <div className="container my-3">{board}</div>
          <div className="d-flex justify-content-center">
            <button type="button" class="btn btn-primary my-2" onClick={() => this.handleClickRestartGame()}>เริ่มเกมส์ใหม่</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
