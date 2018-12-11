import React, { Component } from 'react';
import Pattern from './Pattern';
import './DrawBoard.css'
import Test from './Test';
import SelectPattern from './SelectPattern';
import { CopyUtils } from './utils/CopyUtils';


class DrawBoard extends Component {
  constructor() {
    super();
    var pattern = {
      isSelectedCanShow: true,
      patternStyle: {
        width: "300px",
        height: "300px",
        left: "200px",
        top: "200px",
      },
    }
    this.state = {
      elements: [],
      h1: "1",
      pattern: pattern,
    }
  }

  addElement = (element) => {
    const elements = this.state.elements;
    this.setState({
      elements: elements.concat(
        element
      )
    })
  }

  render() {
    return (
      <div className="Draw-Board" onClick={(e) => this.dismissSelectPattern(e)}>
        <Pattern
          pattern={this.state.pattern}
          setSelectPattern={(pattern) => this.setSelectPattern(pattern)} />
        {this.state.elements}
        <SelectPattern
          pattern={this.state.pattern}
          modifyPosition={this.modifyPosition}
          x={this.state.x}
          addElement={this.addElement} />

        <Test h1={this.state.h1} />

      </div>
    );
  }

  dismissSelectPattern(e) {
    if (e.target.getAttribute("class") !== "Draw-Board") {
      return
    }

    let pattern = new CopyUtils().copy(this.state.pattern)
    pattern.isSelectedCanShow = false
    this.setState({
      h1: "2",
      pattern: pattern,
    })
  }

  setSelectPattern = (patternX) => {
    let pattern = new CopyUtils().copy(this.state.pattern)
    pattern.isSelectedCanShow = true
    this.setState({
      pattern: pattern,
    })
  }

  modifyPosition = (left, top) => {
    let pattern = new CopyUtils().copy(this.state.pattern)
    pattern.patternStyle.left = left
    pattern.patternStyle.top = top

    this.setState({
      pattern: pattern
    })
  }
}

export default DrawBoard;
