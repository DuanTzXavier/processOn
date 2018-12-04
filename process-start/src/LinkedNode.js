import React, { Component } from 'react';
import LinkedArrow from './LinkedArrow';
import { ViewUtils } from './utils/ViewUtils'
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
      startPoint:{
        X: 153,
        Y: 156,
      },
      endPoint:{
        X:153,
        Y:156,
      },
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

  addLinkedArrow(e) {
    const key = new ViewUtils().getUnicodeID(10)
    this.props.addElement(
      <LinkedArrow
        key={key}
        startPoint={this.state.startPoint}
        endPoint={this.state.endPoint}
        reactCallback={(func,that) => this.saveCallBackFun(func, that)}
      />
    )
    

    this.setState({
      isActive: true,
    })

    document.onmousemove = e => this.setMoveLocationX(e)

    document.onmouseup = () => this.setStateFalse()
  }

  saveCallBackFun(func, that){
    this.setState({
      callback: func,
      that: that
    })
  }

  setMoveLocationX(e){
    if (!this.state.isActive) {
      return
    }
    const clickEvent = window.event || e;
    var point = {
      X: clickEvent.clientX,
      Y: clickEvent.clientY,
    }
    this.setState({
      endPoint:point,
    })

    var props = {
      startPoint: this.state.startPoint,
      endPoint:point
    }

    this.state.callback(props, this.state.that)
  }
}

export default LinkedNode;
