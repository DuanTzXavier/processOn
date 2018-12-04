import React, { Component } from 'react';
import LinkedNode from './LinkedNode';
import SizeNode from './SizeNode';
import './Pattern.css'


class Pattern extends Component {
    constructor() {
        super();
        this.state = {
            elements: []
        }
    }

    render() {
        let topStyle = {
            left : "103px",
            top: "0px"
        }
        let leftStyle = {
            left : "0px",
            top: "103px"
        }
        let bottomStyle = {
            left : "103px",
            top: "200px"
        }
        let rightStyle = {
            left : "200px",
            top: "103px"
        }

        let firstStyle = {
            left : "0px",
            top: "0px"
        }
        let secondStyle = {
            left : "200px",
            top: "0px"
        }
        let thirdStyle = {
            left : "0px",
            top: "200px"
        }
        let fourthStyle = {
            left : "200px",
            top: "200px"
        }
        return (
            <div className="Pattern">
                <canvas className="Pattern-Shape" />
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
                <SizeNode style={firstStyle}/>

                <SizeNode style={secondStyle}/>

                <SizeNode style={thirdStyle}/>

                <SizeNode style={fourthStyle}/>
            </div>
        );
    }
}

export default Pattern;
