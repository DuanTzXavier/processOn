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

  addLinkedNode(){
    const elements = this.state.elements;
    this.setState({
      elements: elements.concat(
        <LinkedNode/>
      )
    })
  }

  render() {
    return (
      <div className="Draw-Board" onClick={(e)=>this.addLinkedNode()}>
        {this.state.elements}
      </div>
    );
  }
}

export default DrawBoard;
