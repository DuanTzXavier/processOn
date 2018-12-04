import React, { Component } from 'react';
import './NodeControlPattern.css'
import LinkedNode from './LinkedNode';

class NodeControlPattern extends Component {

    render() {
        let topStyle = {
            left: "103px",
            top: "0px"
        }
        let leftStyle = {
            left: "0px",
            top: "103px"
        }
        let bottomStyle = {
            left: "103px",
            top: "200px"
        }
        let rightStyle = {
            left: "200px",
            top: "103px"
        }
        return (
            <div className="Node-Control-Pattern" style={this.props.style}>

                <LinkedNode
                    style={topStyle}
                    addElement={this.props.addElement}
                />
                <LinkedNode
                    style={leftStyle}
                    addElement={this.props.addElement}
                />
                <LinkedNode
                    style={bottomStyle}
                    addElement={this.props.addElement}
                />
                <LinkedNode
                    style={rightStyle}
                    addElement={this.props.addElement}
                />
            </div>
        );
    }
}

export default NodeControlPattern;
