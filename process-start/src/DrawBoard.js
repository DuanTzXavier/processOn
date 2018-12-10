import React, { Component } from 'react';
import Pattern from './Pattern';
import './DrawBoard.css'
import SelectPattern from './SelectPattern';
import Test from './Test';

class DrawBoard extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
      h1:"1"
    }
  }

  addElement(element) {
    const elements = this.state.elements;
    this.setState({
      elements: elements.concat(
        element
      )
    })
  }

  render() {
    var pattern = {
      patternStyle: {
        width: "300px",
        height: "300px",
        left: "200px",
        top: "200px",
      },
    }

    return (
      <div className="Draw-Board" onClick={(e) => this.dismissSelectPattern(e)}>
        {/* <Pattern
          pattern={pattern}
          addElement={(element) => this.addElement(element)}
         
        /> */}
        <Test h1 = {this.state.h1}/>
        {this.state.elements}
      </div>
    );
  }

  dismissSelectPattern(e) {

    this.setState({
      h1:"2"
    })
    // if (e.target.getAttribute("class") !== "Draw-Board") {
    //   return
    // }

    // let elements = this.state.elements
    // for(let element in elements){
    //   if(elements[element].type === SelectPattern){
    //     console.log(elements[element].xxx)
    //     console.log(elements[element])
    //   }
    // }

  
    
    // let elements = this.state.elements
    // elements.splice(0, 1)

    // console.log(elements)
    // this.setState({
    //   elements:elements
    // })

    

    // for (let i = 0; i < elements.length; i++) {

    //   console.log(elements[i].type)
    //   elements.remove(elements[i])

    // }
  }
}

export default DrawBoard;
