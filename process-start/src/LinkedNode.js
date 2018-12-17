import React, { Component } from 'react';
import { ViewUtils } from './utils/ViewUtils'
import './LinkedNode.css'

class LinkedNode extends Component {

  halfNodeWidth = 3
  state = {
    style: {}
  }

  initStyle(props) {
    if (typeof (props.pattern) === 'undefined') {
      return
    }

    let style = {}
    switch (props.styleType) {
      case 1:
        style = {
          left: parseInt(props.pattern.patternStyle.width) / 2 + "px",
          top: - this.halfNodeWidth + "px",
        }
        break;
      case 2:
        style = {
          left: - this.halfNodeWidth + "px",
          top: parseInt(props.pattern.patternStyle.height) / 2 + "px",
        }
        break;
      case 3:
        style = {
          left: parseInt(props.pattern.patternStyle.width) - this.halfNodeWidth + "px",
          top: parseInt(props.pattern.patternStyle.height) / 2 + "px",
        }
        break;
      case 4:
        style = {
          left: parseInt(props.pattern.patternStyle.width) / 2 + "px",
          top: parseInt(props.pattern.patternStyle.height) - this.halfNodeWidth + "px",
        }
        break;
      default:
        style = {
          left: parseInt(props.pattern.patternStyle.width) / 2 + "px",
          top: - this.halfNodeWidth + "px",
        }
        break
    }

    return style;
  }

  componentWillUpdate(nextProps) {
    if (typeof (nextProps.pattern) === 'undefined') {
      return
    }

    let style = this.initStyle(nextProps)

    let copiedLinks = this.props.links
    let startPoint = {
      X: parseInt(nextProps.pattern.patternStyle.left) + parseInt(style.left) + 3,
      Y: parseInt(nextProps.pattern.patternStyle.top) + parseInt(style.top) + 3,
    }

    let bindLinkKey = nextProps.pattern.uniqueKey + "_" + nextProps.styleType

    copiedLinks.forEach(function (element, _, __) {
      if (bindLinkKey === element.startFrom && (element.startPoint.X !== startPoint.X || element.startPoint.Y !== startPoint.Y)) {
        element.startPoint = startPoint
      }

      if (bindLinkKey === element.endTo && (element.endPoint.X !== startPoint.X || element.endPoint.Y !== startPoint.Y)) {
        element.endPoint = startPoint
      }
    })

    if (style.left !== this.state.style.left || style.top !== this.state.style.top) {
      this.setState({
        style: style
      })
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

    // //初始化Element
    this.initLinkElement(key)

    document.onmousemove = e => this.modifyEndPoint(e, [key])

    document.onmouseup = () => this.endModifyPoint([key])
  }

  initLinkElement(key) {
    let point = {
      X: parseInt(this.props.pattern.patternStyle.left) + parseInt(this.state.style.left) + this.halfNodeWidth,
      Y: parseInt(this.props.pattern.patternStyle.top) + parseInt(this.state.style.top) + this.halfNodeWidth,
    }

    let bindLink = {
      uniqueKey: key,
      startPoint: point,
      endPoint: point,
      isActive: true,
      startFrom: this.props.pattern.uniqueKey + "_" + this.props.styleType,
    }

    this.setState({
      bindLink: bindLink
    })

    this.props.addBindLink(bindLink)
  }

  modifyEndPoint(event, keys) {

    const e = window.event || event;

    let bindLink = this.state.bindLink

    if (!bindLink.isActive) {
      return
    }

    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    let x = e.pageX || e.clientX + scrollX;
    let y = e.pageY || e.clientY + scrollY;

    var endPoint = {
      X: x,
      Y: y,
    }
    bindLink.endPoint = endPoint

    let bindedState = this.props.getBindedState()

    if (bindedState.patternKey !== bindLink.startFrom.split("_")[0]) {
      let bindedPattern = this.props.getPatternByKey(bindedState.patternKey)
      if (typeof (bindedPattern) !== 'undefined') {
        let fakeProps = {}
        fakeProps.pattern = bindedPattern
        fakeProps.styleType = bindedState.position
        let style = this.initStyle(fakeProps)
        let point = {
          X: parseInt(bindedPattern.patternStyle.left) + parseInt(style.left) + this.halfNodeWidth,
          Y: parseInt(bindedPattern.patternStyle.top) + parseInt(style.top) + this.halfNodeWidth,
        }
        bindLink.endPoint = point
        bindLink.endTo = bindedPattern.uniqueKey + "_" + fakeProps.styleType
      }
    }

    this.props.modifyBindLinks(bindLink)
  }

  endModifyPoint(keys) {
    let bindLink = this.state.bindLink
    bindLink.isActive = false
    this.props.modifyBindLinks(bindLink)
  }

}



export default LinkedNode;
