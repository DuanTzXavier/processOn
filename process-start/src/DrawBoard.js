import React, { Component } from 'react';
import LinkedNode from './LinkedNode';
import './DrawBoard.css'

class DrawBoard extends Component {
  constructor() {
    super();
    this.state = {
      elements: []
    }
  }

  addElement(element){
    const elements = this.state.elements;
    this.setState({
      elements: elements.concat(
        element
      )
    })
  }

  render() {
    return (
      <div className="Draw-Board">
        <LinkedNode
          addElement={(element) => this.addElement(element)}
        />
        {this.state.elements}
      </div>
    );
  }
}

export default DrawBoard;
