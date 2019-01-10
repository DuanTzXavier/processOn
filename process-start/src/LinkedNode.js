import React, { Component } from 'react';
import { ViewUtils } from './utils/ViewUtils'
import './LinkedNode.css'
import { NodeStyleUtils } from './utils/NodeStyleUtils';

class LinkedNode extends Component {

  halfNodeWidth = 3
  state = {
    style: {},
    from: {
      x: 0,
      y: 0,
    }
  }

  componentWillUpdate(nextProps) {
    if (typeof (nextProps.pattern) === 'undefined') {
      return
    }

    let style = new NodeStyleUtils().initStyle(nextProps)

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


  render() {
    return (
      <div
        className="Linked-Node"
        onMouseDown={(e) => this.addLinkedArrow(e)}
        style={this.state.style}>

      </div>
    );
  }

  addLinkedArrow(event) {
    const key = new ViewUtils().getUnicodeID(10)

    // //初始化Element
    this.initLinkElement(key)

    const e = window.event || event;
    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    let x = e.pageX || e.clientX + scrollX;
    let y = e.pageY || e.clientY + scrollY;

    let from = {
      x: x,
      y: y,
    }
    this.setState({
      from: from
    })

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
      isSelect: false,
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
      X: x - this.state.from.x + this.state.bindLink.startPoint.X,
      Y: y - this.state.from.y + this.state.bindLink.startPoint.Y,
    }

    bindLink.endPoint = endPoint

    let bindedState = this.props.getBindedState()

    if (bindedState.patternKey !== bindLink.startFrom.split("_")[0]) {
      let bindedPattern = this.props.getPatternByKey(bindedState.patternKey)
      if (typeof (bindedPattern) !== 'undefined') {
        let fakeProps = {}
        fakeProps.pattern = bindedPattern
        fakeProps.styleType = bindedState.position
        let style =  new NodeStyleUtils().initStyle(fakeProps)
        let point = {
          X: parseInt(bindedPattern.patternStyle.left) + parseInt(style.left) + this.halfNodeWidth,
          Y: parseInt(bindedPattern.patternStyle.top) + parseInt(style.top) + this.halfNodeWidth,
        }
        bindLink.endPoint = point
        bindLink.endTo = bindedPattern.uniqueKey + "_" + fakeProps.styleType
      }
    }

    this.props.modifyBindLinks([bindLink])
  }

  endModifyPoint(keys) {
    let bindLink = this.state.bindLink
    bindLink.isActive = false
    this.props.modifyBindLinks([bindLink])
  }

}



export default LinkedNode;
