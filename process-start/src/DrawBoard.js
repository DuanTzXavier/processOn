import React, { Component } from 'react';
import Pattern from './Pattern';
import './DrawBoard.css'
import Test from './Test';
import SelectPattern from './SelectPattern';
import { CopyUtils } from './utils/CopyUtils';
import LinkedArrow from './LinkedArrow';


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
    let tests = this.state.tests
    for (let index in tests) {
      let element = React.createElement(Test, {
        "key": index,
        "h1": index,
      })
      elements = elements.concat(element)
    }

    let links = this.state.links
    for (let index in links) {
      let element = React.createElement(LinkedArrow, {
        "key": index,
        "bindLink": links[index],
      })
      elements = elements.concat(element)
    }
    elements = elements.concat(this.state.elements)
    return (
      <div className="Draw-Board" onClick={(e) => this.dismissSelectPattern(e)}>
        <Pattern
          pattern={this.state.pattern}
          setSelectPattern={(pattern) => this.setSelectPattern(pattern)} />
        {elements}

        <SelectPattern
          pattern={this.state.pattern}
          modifyPosition={this.modifyPosition}
          x={this.state.x}
          addElement={this.addElement}
          dismissSelectPattern={(() => this.dismissSelectPattern())}
          addBindLink={(newBindLink) => this.addBindLink(newBindLink)}
          modifyBindLinks={(key, bindLink) => this.modifyBindLinks(key, bindLink)} />

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
      links:links.concat(newBindLink)
    })
  }

  modifyBindLinks = (key, bindLink) => {
    let links = this.state.links
    for(let index in links){
      if(links[index].uniqueKey === key){
        links[index] = bindLink
        break
      }
    }
    this.setState({
      links:links
    })
  }

  dismissSelectPattern = () => {

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
