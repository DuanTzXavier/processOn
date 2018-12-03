import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './LinkedNode.css'

class LinkedNode extends Component {

  test(e) {
    console.log(e.target)
  }

  render() {
    return (
      <div id="LinkedNode" className="Linked-Node" onClick={(e) => this.test(e)}>

      </div>
    );
  }
}

export default LinkedNode;
