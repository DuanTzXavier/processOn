import React, { Component } from 'react';
import Pattern from './Pattern';
import './DrawBoard.css'
import Test from './Test';
import SelectPattern from './SelectPattern';
import { CopyUtils } from './utils/CopyUtils';
import LinkedArrow from './LinkedArrow';
import { ViewUtils } from './utils/ViewUtils'

class DrawBoard extends Component {
  constructor() {
    super();
    var pattern = {
      isSelectedCanShow: true,
      uniqueKey: new ViewUtils().getUnicodeID(10),
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

    let links = this.state.links
    for (let index in links) {
      let element = React.createElement(LinkedArrow, {
        "key": index,
        "bindLink": links[index],
        "onRef": this.onRef,
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
          modifyPattern={this.modifyPattern}
          x={this.state.x}
          addElement={this.addElement}
          links={this.state.links}
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

  setSelectPattern = (patternX) => {
    let pattern = new CopyUtils().copy(this.state.pattern)
    pattern.isSelectedCanShow = true
    this.setState({
      pattern: pattern,
    })
  }

  modifyPattern = (pattern) => {
    if(pattern.uniqueKey === this.state.pattern.uniqueKey){
      this.setState({
        pattern: pattern
      })
    }    
  }
}

export default DrawBoard;
