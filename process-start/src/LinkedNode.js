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
      startPoint: {
        X: 153,
        Y: 156,
      },
      endPoint: {
        X: 153,
        Y: 156,
      },
      bindLinks: new Map()
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
    //初始化Element
    let element = this.initLinkElement(key)
    console.log(element)
    //将Element添加到UI树中
    this.props.addElement(element)

    document.onmousemove = e => this.modifyEndPoint(e, [key])

    document.onmouseup = () => this.endModifyPoint([key])
  }

  initLinkElement(key) {

    const bindLinks = new Map(this.state.bindLinks)
    let point = {
      X: 153,
      Y: 156,
    }
    let reactCallback = function (func, that) {
      this.callback = func
      this.that = that
      this.isInited = true
      this.isActive = true
      console.log("reactCallback")
      console.log(this)
    }

    let bindLink = {
      uniqueKey: key,
      startPoint: point,
      endPoint: point,
      reactCallback: reactCallback,
      isInited: false,
      isActive: false,
    }
    bindLinks[bindLink.uniqueKey] = bindLink
    console.log(bindLinks[bindLink.uniqueKey])
    this.setState({
      bindLinks: bindLinks
    })

    console.log(this)

    return <LinkedArrow key={bindLink.uniqueKey} bindLink={bindLink} />;
  }

  modifyEndPoint(e, keys) {
    const moveEvent = window.event || e;

    let copiedLinks = this.state.bindLinks
    keys.forEach(function (key, _) {
      if (typeof (copiedLinks[key].isActive) != undefined && copiedLinks[key].isActive) {
        let activeLink = copiedLinks[key]
        var endPoint = {
          X: moveEvent.clientX,
          Y: moveEvent.clientY,
        }
        activeLink.endPoint = endPoint
        activeLink.callback(activeLink)
      } 
    })
  }

  endModifyPoint(keys) {
    console.log("endModifyPoint")
    console.log(this.state.bindLinks)

    let copiedLinks = this.state.bindLinks

    keys.forEach(function (key, index) {
      copiedLinks[key].isActive = false
    })
  }

}



export default LinkedNode;
