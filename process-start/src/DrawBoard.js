import React, { Component } from 'react';
import Pattern from './Pattern';
import './DrawBoard.css'
import Test from './Test';
import SelectPattern from './SelectPattern';
import { CopyUtils } from './utils/CopyUtils';
import LinkedArrow from './LinkedArrow';
import { ViewUtils } from './utils/ViewUtils'
import NodeControlPattern from './NodeControlPattern';

class DrawBoard extends Component {
  constructor() {
    super();
    var pattern = {
      isSelectedCanShow: false,
      isNodeControlPatternShow: false,
      uniqueKey: new ViewUtils().getUnicodeID(10),
      startPoint: {
        X: "200px",
        Y: "200px",
      },
      endPoint: {
        X: "401px",
        Y: "402px",
      },
      patternStyle: {
        width: "200px",
        height: "200px",
        left: "200px",
        top: "200px",
      },
    }

    var pattern2 = {
      isSelectedCanShow: false,
      isNodeControlPatternShow: false,
      uniqueKey: new ViewUtils().getUnicodeID(10),
      startPoint: {
        X: "700px",
        Y: "300px",
      },
      endPoint: {
        X: "901px",
        Y: "502px",
      },
      patternStyle: {
        width: "200px",
        height: "200px",
        left: "700px",
        top: "300px",
      },
    }
    this.state = {
      elements: [],
      h1: "1",
      pattern: pattern,
      nodeControlPattern:pattern,
      patterns: [pattern, pattern2],
      tests: [1, 2],
      links: [],
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
    let elements = []

    let links = this.state.links
    for (let index in links) {
      let element = React.createElement(LinkedArrow, {
        "key": index.uniqueKey,
        "bindLink": links[index],
        "onRef": this.onRef,
      })
      elements = elements.concat(element)
    }

    let patterns = this.state.patterns
    for (let index in patterns) {
      let element = React.createElement(Pattern, {
        "key": index,
        "pattern": patterns[index],
        "modifyPattern": this.modifyPattern,
        "setSelectPattern": this.setSelectPattern,
        "setNodeControlPattern":this.setNodeControlPattern,
      })
      elements = elements.concat(element)
    }
    elements = elements.concat(this.state.elements)
    return (
      <div className="Draw-Board" onClick={(e) => this.handleClick(e)}>
        {/* <Pattern
          pattern={this.state.pattern}
          modifyPattern={this.modifyPattern}
          setSelectPattern={(pattern) => this.setSelectPattern(pattern)} /> */}
        {elements}

        <SelectPattern
          pattern={this.state.pattern}
          modifyPattern={this.modifyPattern}
          addElement={this.addElement}
          links={this.state.links}
          addBindLink={(newBindLink) => this.addBindLink(newBindLink)}
          modifyBindLinks={(key, bindLink) => this.modifyBindLinks(key, bindLink)} />

        <NodeControlPattern
          pattern={this.state.nodeControlPattern}
          addElement={this.addElement}
          modifyPattern={this.modifyPattern}
          links={this.state.links}
          addBindLink={(newBindLink) => this.addBindLink(newBindLink)}
          modifyBindLinks={(key, bindLink) => this.modifyBindLinks(key, bindLink)}
          dismissNodeControlPattern={this.dismissNodeControlPattern}
          setSelectPattern={(pattern) => this.setSelectPattern(pattern)} />

        <Test h1={this.state.h1} />

      </div>
    );
  }

  handleClick(e) {
    if (e.target.getAttribute("class") !== "Draw-Board") {
      return
    }
    this.dismissSelectPattern()
  }

  addBindLink = (newBindLink) => {
    let links = this.state.links
    this.setState({
      links: links.concat(newBindLink)
    })
  }

  modifyBindLinks = (key, bindLink) => {
    let links = this.state.links
    for (let index in links) {
      if (links[index].uniqueKey === key) {
        links[index] = bindLink
        break
      }
    }
    this.setState({
      links: links
    })
  }

  onRef = (ref) => {
    this.child = ref
  }


  dismissSelectPattern = () => {

    let pattern = new CopyUtils().copy(this.state.pattern)
    pattern.isSelectedCanShow = false
    this.setState({
      h1: "2",
      pattern: pattern,
    })
  }

  setNodeControlPattern = (patternX) => {
    let patterns = this.state.patterns
    for (let index in patterns) {
      if (patternX.uniqueKey === patterns[index].uniqueKey) {

      }
    }
    let pattern = new CopyUtils().copy(patternX)

    if(!pattern.isSelectedCanShow){
      pattern.isNodeControlPatternShow = true
    }
    this.setState({
      nodeControlPattern: pattern,
    })
  }

  setSelectPattern = (patternX) => {
    let patterns = new CopyUtils().copy(this.state.patterns)
    for (let index in patterns) {
      if (patternX.uniqueKey !== patterns[index].uniqueKey) {
        patterns[index].isSelectedCanShow = false
      }
    }
    let pattern = new CopyUtils().copy(patternX)

    pattern.isSelectedCanShow = true
    pattern.isNodeControlPatternShow = false
    this.setState({
      pattern: pattern,
      patterns:patterns,
    })
  }
  
  dismissNodeControlPattern = (patternX) => {
    let patterns = this.state.patterns
    for (let index in patterns) {
      if (patternX.uniqueKey === patterns[index].uniqueKey) {

      }
    }
    let pattern = new CopyUtils().copy(patternX)

    pattern.isNodeControlPatternShow = false
    this.setState({
      nodeControlPattern: pattern,
    })
  }

  modifyPattern = (pattern) => {
    let patterns = new CopyUtils().copy(this.state.patterns)
    for (let index in patterns) {
      if (pattern.uniqueKey === patterns[index].uniqueKey) {
        patterns[index] = pattern
      }
    }

    // pattern.isSelectedCanShow = true
    // pattern.isNodeControlPatternShow = false
    this.setState({
      pattern: pattern,
      nodeControlPattern: pattern,
      patterns:patterns,
    })
    
    if (pattern.uniqueKey === this.state.pattern.uniqueKey) {
      this.setState({
        pattern: pattern
      })
    }
  }
}

export default DrawBoard;
