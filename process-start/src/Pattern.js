import React, { Component } from 'react';
import LinkedNode from './LinkedNode';
import SizeNode from './SizeNode';
import './Pattern.css'
import { CopyUtils } from './utils/CopyUtils';


class Pattern extends Component {

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
                <SizeNode
                    parentStyle={patternStyle}
                    styleType={1} />

                <SizeNode
                    parentStyle={patternStyle}
                    styleType={2} />

                <SizeNode
                    parentStyle={patternStyle}
                    styleType={3} />

                <SizeNode
                    parentStyle={patternStyle}
                    styleType={4} />
            </div>
        );
    }
}

export default Pattern;
