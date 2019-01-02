import React, { Component } from 'react';
import Pattern from './Pattern';
import './DrawBoard.css'
import SelectPattern from './SelectPattern';
import { CopyUtils } from './utils/CopyUtils';
import LinkedArrow from './LinkedArrow';
import NodeControlPattern from './NodeControlPattern';

class DrawBoard extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
      h1: "1",
      selectPatternKey: "",
      nodeControlPatternKey: "",
      tests: [1, 2],
      links: [],
      bindedState: {
        patternKey: "",
        position: 1,
        percentPosition: 50,
      },
    }
  }

  render() {
    let elements = []

    let links = this.state.links
    for (let index in links) {
      let element = React.createElement(LinkedArrow, {
        key: links[index].uniqueKey,
        bindLink: links[index],
        getPatternByKey: this.getPatternByKey,
      })
      elements = elements.concat(element)
    }

    let patterns = this.props.patterns
    for (let index in patterns) {
      let element = React.createElement(Pattern, {
        key: index,
        pattern: patterns[index],
        modifyPattern: this.props.modifyPattern,
        setSelectPattern: this.setSelectPattern,
        setNodeControlPattern: this.setNodeControlPattern,
      })
      elements = elements.concat(element)
    }
    elements = elements.concat(this.state.elements)

    let selectPattern = this.getPatternByKey(this.state.selectPatternKey)
    let nodeControlPattern = this.getPatternByKey(this.state.nodeControlPatternKey)
    let s = {
      // width:"75%",
      float:"left",
  }
    return (
      
      <div className="Draw-Board" style={s} onClick={(e) => this.handleClick(e)}>
        <canvas id="myCanvas" className="Draw-Board-BG" />
        {elements}

        <SelectPattern
          pattern={selectPattern}
          modifyPattern={this.props.modifyPattern}
          links={this.state.links}
          addBindLink={(newBindLink) => this.addBindLink(newBindLink)}
          getBindedState={this.getBindedState}
          getPatternByKey={this.getPatternByKey}
          modifyBindLinks={(key, bindLink) => this.modifyBindLinks(key, bindLink)} />

        <NodeControlPattern
          pattern={nodeControlPattern}
          modifyPattern={this.props.modifyPattern}
          links={this.state.links}
          addBindLink={(newBindLink) => this.addBindLink(newBindLink)}
          modifyBindLinks={(key, bindLink) => this.modifyBindLinks(key, bindLink)}
          dismissNodeControlPattern={this.dismissNodeControlPattern}
          setBindedState={this.setBindedState}
          getBindedState={this.getBindedState}
          getPatternByKey={this.getPatternByKey}
          setSelectPattern={(pattern) => this.setSelectPattern(pattern)} />

        {/* <Test h1={this.state.h1} /> */}

      </div>
    );
  }

  componentDidMount() {
    this.drawbg()
  }

  drawbg() {
    let myCanvas = document.getElementById("myCanvas")
    let ctx = myCanvas.getContext('2d')
    myCanvas.width = window.screen.availWidth - 163
    myCanvas.height = window.screen.availHeight
    this.drawGrid(ctx, myCanvas.width, myCanvas.height, '#eeeeee', 20)
  }

  // Draw grid
  drawGrid(ctx, w, h, strokeStyle, step) {
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var x = 0.5; x < w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }

    for (var y = 0.5; y < h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }

    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }


  handleClick(e) {
    if (e.target.getAttribute("class") !== "Draw-Board" && e.target.getAttribute("id") !== "myCanvas") {
      return
    }
    this.dismissSelectPattern()
  }

  addBindLink = (newBindLink) => {
    let links = this.state.links
    this.setState({
      links: links.concat(newBindLink)
    })

    this.dismissSelectPattern()
  }

  modifyBindLinks = (bindLink) => {
    let links = this.state.links
    for (let index in links) {
      if (links[index].uniqueKey === bindLink.uniqueKey) {
        links[index] = bindLink
        break
      }
    }
    this.setState({
      links: links
    })
  }

  dismissSelectPattern = () => {
    let selectPattern = this.getPatternByKey(this.state.selectPatternKey)
    if (typeof (selectPattern) === 'undefined') {
      return
    }
    let pattern = new CopyUtils().copy(selectPattern)
    pattern.isSelectedCanShow = false

    this.props.modifyPattern(pattern)
  }

  setNodeControlPattern = (patternX) => {
    let patterns = []
    let disSelectPattern = this.getPatternByKey(this.state.nodeControlPatternKey)
    if (typeof (disSelectPattern) !== 'undefined') {
      disSelectPattern.isNodeControlPatternShow = false
      patterns = patterns.concat(disSelectPattern)
    }

    let pattern = new CopyUtils().copy(patternX)
    if (!pattern.isSelectedCanShow) {
      pattern.isNodeControlPatternShow = true
    }
    patterns = patterns.concat(pattern)

    this.props.modifyPatterns(patterns)
    this.setState({
      nodeControlPatternKey: patternX.uniqueKey,
    })
  }

  setSelectPattern = (patternX) => {
    let patterns = []
    let disSelectPattern = this.getPatternByKey(this.state.selectPatternKey)
    if (typeof (disSelectPattern) !== 'undefined') {
      disSelectPattern.isSelectedCanShow = false
      patterns = patterns.concat(disSelectPattern)
    }

    let pattern = new CopyUtils().copy(patternX)
    pattern.isSelectedCanShow = true
    pattern.isNodeControlPatternShow = false
    patterns = patterns.concat(pattern)

    this.props.modifyPatterns(patterns)
    this.setState({
      selectPatternKey: patternX.uniqueKey,
    })
  }

  dismissNodeControlPattern = (patternX) => {
    let nodeControlPattern = this.getPatternByKey(this.state.nodeControlPatternKey)
    if (typeof (nodeControlPattern) === 'undefined') {
      return
    }

    let pattern = new CopyUtils().copy(patternX)
    pattern.isNodeControlPatternShow = false
    this.props.modifyPattern(pattern)
  }

  getPatternByKey = (key) => {
    if (typeof (key) === 'undefined' || key === "") {
      return
    }

    let patterns = this.props.patterns
    for (let index in patterns) {
      if (key === patterns[index].uniqueKey) {
        return patterns[index]
      }
    }
  }

  setBindedState = (bindedState) => {
    this.setState({
      bindedState: bindedState
    })
  }

  getBindedState = () => {
    return this.state.bindedState
  }


}

export default DrawBoard;
