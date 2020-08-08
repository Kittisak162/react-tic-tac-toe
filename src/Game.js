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
    turnX: true
  }

  handleChangeSize = event => {
    const size = parseInt(event.target.value);
    this.setState({
      size,
      boards: Array(size).fill().map(() => Array(size).fill(0))
    });
  }

  handleClickBoard = (i, j) => {
    let { boards, turnX } = this.state;
    boards[i][j] = turnX ? 1 : -1;
    this.setState({
      boards,
      turnX: !turnX
    });
  }

  render() {
    const { size, boards, turnX } = this.state;
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
          <div key={i + '' + j} className={className} style={{ width: `${100/size}%`, height: `${100/size}%` }} onClick={() => boards[i][j] === 0 ? this.handleClickBoard(i, j) : null}>
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
        <h2 className="text-center">เลือกขนาด</h2>
        <select className="form-control" value={size} onChange={this.handleChangeSize}>
          {
            Array.from(Array(14), (_, i) => i + 3).map(item => {
              return <option value={item} key={item}>{item + ' x ' + item}</option>
            })
          }
        </select>
        <h5 className="text-center my-3">{ `ถึงตา ${turnX ? 'X' : 'O'}` }</h5>
        <div className="container my-3">{board}</div>
      </div>
    );
  }
}

export default Game;
