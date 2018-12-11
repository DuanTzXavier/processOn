import React, { Component } from 'react';
import LinkedArrow from './LinkedArrow';
import { ViewUtils } from './utils/ViewUtils'
import './LinkedNode.css'

class LinkedNode extends Component {

  halfNodeWidth = 3

  constructor(props) {
    super(props);
    let style = this.initStyle()
    this.state = {
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

  componentWillUpdate(nextProps) {

    let copiedLinks = this.state.bindLinks
    let startPoint = {
      X: parseInt(nextProps.parentStyle.left) + parseInt(this.state.style.left) + 3,
      Y: parseInt(nextProps.parentStyle.top) + parseInt(this.state.style.top) + 3,
    }


    copiedLinks.forEach(function (element, index, array) {
      if (element.startPoint.X !== startPoint.X || element.startPoint.Y !== startPoint.Y) {
        element.startPoint = startPoint
      }
    })

    // this.setState({
    //   bindLinks:copiedLinks,
    // })
    // state.bindLinks = copiedLinks

    console.log(66)
}

componentWillReceiveProps(nextProps){
  console.log(nextProps)
  console.log("componentWillReceiveProps")
}

  // static getDerivedStateFromProps(props, state) {

  //   let copiedLinks = state.bindLinks
  //   let startPoint = {
  //     X: parseInt(props.parentStyle.left) + parseInt(state.style.left) + 3,
  //     Y: parseInt(props.parentStyle.top) + parseInt(state.style.top) + 3,
  //   }


  //   copiedLinks.forEach(function (element, index, array) {
  //     if (element.startPoint.X !== startPoint.X || element.startPoint.Y !== startPoint.Y) {
  //       element.startPoint = startPoint
  //     }
  //   })
  //   state.bindLinks = copiedLinks
    
  //   return state;
  // }

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
    let style = this.initStyle()
    return (
      <div
        className="Linked-Node"
        onMouseDown={(e) => this.addLinkedArrow(e)}
        style={style}>

      </div>
    );
  }

  addLinkedArrow(e) {
    const key = new ViewUtils().getUnicodeID(10)

    // //初始化Element
    let element = this.initLinkElement(key)
    // //将Element添加到UI树中
    // this.props.addElement(element)
    document.onmousemove = e => this.modifyEndPoint(e, [key])

    document.onmouseup = () => this.endModifyPoint([key])
  }

  initLinkElement(key) {
    const copiedLinks = this.state.bindLinks
    let bindLinks = new Map(copiedLinks)
    let point = {
      X: parseInt(this.props.parentStyle.left) + parseInt(this.state.style.left) + this.halfNodeWidth,
      Y: parseInt(this.props.parentStyle.top) + parseInt(this.state.style.top) + this.halfNodeWidth,
    }
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
    this.setState({
      bindLink: bindLink
    })

    this.props.addBindLink(bindLink)
    // return <LinkedArrow key={bindLink.uniqueKey} bindLink={bindLink} addElement={this.props.parentStyle}/>;
  }

  modifyEndPoint(e, keys) {

    const moveEvent = window.event || e;

    let bindLink = this.state.bindLink

    if(bindLink.isActive){
      var endPoint = {
        X: moveEvent.clientX,
        Y: moveEvent.clientY,
      }
      bindLink.endPoint = endPoint
    }

    
    this.props.modifyBindLinks(bindLink)
    // keys.forEach(function (key, _) {
    //   if (typeof (copiedLinks.get(key).isActive) != undefined && copiedLinks.get(key).isActive) {
    //     let activeLink = copiedLinks.get(key)
    //     var endPoint = {
    //       X: moveEvent.clientX,
    //       Y: moveEvent.clientY,
    //     }
    //     activeLink.endPoint = endPoint
    //     activeLink.callback(activeLink)
    //   }
    // })
  }

  endModifyPoint(keys) {
    let bindLink = this.state.bindLink
    bindLink.isActive = false
    this.props.modifyBindLinks(bindLink)
    // let copiedLinks = this.state.bindLinks

    // keys.forEach(function (key, _) {
    //   copiedLinks.get(key).isActive = false
    // })
  }

}



export default LinkedNode;
