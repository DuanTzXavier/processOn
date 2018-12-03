import React, { Component } from 'react';
import LinkedArrow from './LinkedArrow';
import {ViewUtils} from './utils/ViewUtils'
import './LinkedNode.css'

class LinkedNode extends Component {

  constructor() {
    super();
    this.state = {
      isActive: false,
      fromX: 0,
      fromY: 0,
      style: {
        left: "150px",
        top: "150px",
      },
      startX:0,
      startY:0,
    }
  }

  onMouseDown(e) {
    const clickEvent = window.event || e;
    const fromX = clickEvent.clientX - parseInt(this.state.style.left);
    const fromY = clickEvent.clientY - parseInt(this.state.style.top);
    this.setState({
      isActive: true,
      fromX: fromX,
      fromY: fromY,
    })

    document.onmousemove = e => this.setMoveLocation(e)

    document.onmouseup = () => this.setStateFalse()

  }

  setMoveLocation(event) {
    if (!this.state.isActive) {
      return
    }
    const moveEvent = window.event || event;

    var style = {
      left: moveEvent.clientX - this.state.fromX + "px",
      top: moveEvent.clientY - this.state.fromY + "px",
    }

    this.setState({
      style: style
    })
  }

  setStateFalse() {
    this.setState({
      isActive: false
    })
  }


  render() {
    return (
      <div
        className="Linked-Node"
        onMouseDown={(e) => this.addLinkedArrow(e)}
        style={this.state.style}>

      </div>
    );
  }

  addLinkedArrow(e){
    const key = new ViewUtils().getUnicodeID(10)
      this.props.addElement(
        <LinkedArrow key= {key}/>
      )
  }
}

export default LinkedNode;
