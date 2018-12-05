import React, { Component } from 'react';
import './NodeControlPattern.css'
import LinkedNode from './LinkedNode';

class NodeControlPattern extends Component {

    halfNodeWidth = 3

    render() {
        let patternActStyle = this.props.pattern.patternStyle

        let patternStyle = new CopyUtils().copy(patternActStyle)

        let patternShapeStyle = new CopyUtils().copy(patternActStyle)

        patternShapeStyle.left = 0 + "px"
        patternShapeStyle.top = 0 + "px"
        return (
            <div className="Pattern" style={patternStyle}>
                <canvas className="Pattern-Shape" style={patternShapeStyle} />
                <LinkedNode
                    parentStyle={patternStyle}
                    styleType={"top"}
                    addElement={this.props.addElement}
                />
                <LinkedNode
                    parentStyle={patternStyle}
                    styleType={"left"}
                    addElement={this.props.addElement}
                />
                <LinkedNode
                    parentStyle={patternStyle}
                    styleType={"bottom"}
                    addElement={this.props.addElement}
                />
                <LinkedNode
                    parentStyle={patternStyle}
                    styleType={"right"}
                    addElement={this.props.addElement}
                />
            </div>
        );
    }
}

export default NodeControlPattern;
