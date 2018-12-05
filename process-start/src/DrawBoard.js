import React, { Component } from 'react';
import Pattern from './Pattern';
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
    var pattern = {
      patternStyle: {
        width: "200px",
        height: "200px",
        left: "200px",
        top: "200px",
      },
    }
    return (
      <div className="Draw-Board">
        <Pattern
          pattern={pattern}
          addElement={(element) => this.addElement(element)}
        />
        {this.state.elements}
      </div>
    );
  }
}

export default DrawBoard;
