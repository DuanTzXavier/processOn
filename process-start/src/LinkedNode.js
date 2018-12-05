import React, { Component } from 'react';
import LinkedArrow from './LinkedArrow';
import { ViewUtils } from './utils/ViewUtils'
import './LinkedNode.css'

class LinkedNode extends Component {

  halfNodeWidth = 3

  constructor(props) {
    super(props);
    let style = this.initStyle()

    parseInt(props.parentStyle.left)
    this.state = {
      isActive: false,
      fromX: 0,
      fromY: 0,
      startPoint: {
        X: parseInt(props.parentStyle.left) + parseInt(style.left) + this.halfNodeWidth,
        Y: parseInt(props.parentStyle.top) + parseInt(style.top) + this.halfNodeWidth,
      },
      bindLinks: new Map(),
      style: style,
    }
  }

  initStyle() {
    let style = {}
    switch (this.props.styleType) {
      case "top":
        style = {
          left: parseInt(this.props.parentStyle.width) / 2 + "px",
          top: - this.halfNodeWidth + "px",
          isVertical: true,
        }
        break;
      case "left":
        style = {
          left: - this.halfNodeWidth + "px",
          top: parseInt(this.props.parentStyle.height) / 2 + "px",
          isVertical: false,
        }
        break;
      case "right":
        style = {
          left: parseInt(this.props.parentStyle.width) - this.halfNodeWidth + "px",
          top: parseInt(this.props.parentStyle.height) / 2 + "px",
          isVertical: false,
        }
        break;
      case "bottom":
        style = {
          left: parseInt(this.props.parentStyle.width) / 2 + "px",
          top: parseInt(this.props.parentStyle.height) - this.halfNodeWidth + "px",
          isVertical: true,
        }
        break;
      default:
        style = {
          left: parseInt(this.props.parentStyle.width) / 2 + "px",
          top: - this.halfNodeWidth + "px",
          isVertical: true,
        }
        break
    }

    return style;
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

    console.log(this)
    //初始化Element
    let element = this.initLinkElement(key)
    //将Element添加到UI树中
    this.props.addElement(element)
    console.log(this.state)
    document.onmousemove = e => this.modifyEndPoint(e, [key])

    document.onmouseup = () => this.endModifyPoint([key])
  }

  initLinkElement(key) {
    const copiedLinks = this.state.bindLinks
    let bindLinks = new Map(copiedLinks)
    console.log(copiedLinks)
    console.log("initLinkElement")
    console.log(bindLinks)
    console.log("initLinkElement1")
    let point = this.state.startPoint
    let reactCallback = function (func, that) {
      this.callback = func
      this.that = that
      this.isInited = true
      this.isActive = true
    }

    let bindLink = {
      uniqueKey: key,
      startPoint: point,
      endPoint: point,
      reactCallback: reactCallback,
      isInited: false,
      isActive: false,
      isVertical: this.state.style.isVertical,
    }
    bindLinks.set(key, bindLink)
    console.log("initLinkElement11")
    console.log(bindLinks.size)
    this.setState({
      bindLinks: bindLinks
    })
    return <LinkedArrow key={bindLink.uniqueKey} bindLink={bindLink} />;
  }

  modifyEndPoint(e, keys) {

    const moveEvent = window.event || e;

    let copiedLinks = this.state.bindLinks
    console.log(copiedLinks)

    keys.forEach(function (key, _) {
      if (typeof (copiedLinks.get(key).isActive) != undefined && copiedLinks.get(key).isActive) {
        let activeLink = copiedLinks.get(key)
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
    let copiedLinks = this.state.bindLinks

    keys.forEach(function (key, _) {
      copiedLinks.get(key).isActive = false
    })
  }

}



export default LinkedNode;
