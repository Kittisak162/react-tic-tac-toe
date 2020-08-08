import React, { Component } from 'react';
import { Container, FormControl } from 'react-bootstrap';

class Game extends Component {
  state = {
    size: 3
  }

  handleChangeSize = event => {
    this.setState({ size: event.target.value });
  }


  render() {
    const { size } = this.state;

    const table = [];
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        row.push(<div className="border square" style={{ width: `${100/size}%`, height: `${100/size}%` }}></div>);
      }
    table.push(<div className="row">{row}</div>);
    }

    return (
      <Container className="mt-3">
        <h2 className="text-center">เลือกขนาด</h2>
        <FormControl as="select" size="lg" value={size} onChange={this.handleChangeSize}>
          {
            Array.from(Array(14), (_, i) => i + 3).map(item => {
              return <option value={item} key={item}>{item + ' x ' + item}</option>
            })
          }
        </FormControl>
        <Container className="mt-3" >{table}</Container>
      </Container>
    );
  }
}

export default Game;
