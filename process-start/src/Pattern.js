import React, { Component } from 'react';
import './Pattern.css'
import { CopyUtils } from './utils/CopyUtils';


class Pattern extends Component {

    constructor(props) {
        super(props);
        this.updatePatternStyle(props)
    }

    componentWillUpdate(nextProps) {
        console.log("startPoint")
        console.log(nextProps.pattern.startPoint)
        console.log("endPoint")
        console.log(nextProps.pattern.endPoint)
        if (nextProps.pattern.startPoint.X !== this.props.pattern.startPoint.X ||
            nextProps.pattern.startPoint.Y !== this.props.pattern.startPoint.Y ||
            nextProps.pattern.endPoint.X !== this.props.pattern.endPoint.X ||
            nextProps.pattern.endPoint.Y !== this.props.pattern.endPoint.Y) {
            console.log(3)
            console.log(nextProps.pattern.endPoint.Y)

            this.updatePatternStyle(nextProps)
        }
    }



    updatePatternStyle(props) {
        let pattern = new CopyUtils().copy(props.pattern)
        pattern.patternStyle = {
            left: Math.min(parseInt(props.pattern.startPoint.X), parseInt(props.pattern.endPoint.X)) + "px",
            top: Math.min(parseInt(props.pattern.startPoint.Y), parseInt(props.pattern.endPoint.Y)) + "px",
            width: Math.abs(parseInt(props.pattern.startPoint.X) - parseInt(props.pattern.endPoint.X)) + "px",
            height: Math.abs(parseInt(props.pattern.startPoint.Y) - parseInt(props.pattern.endPoint.Y)) + "px",
        }
        // pattern.patternStyle.left = Math.min(parseInt(props.pattern.startPoint.X), parseInt(props.pattern.endPoint.X)) + "px"
        // pattern.patternStyle.top = Math.min(parseInt(props.pattern.startPoint.Y), parseInt(props.pattern.endPoint.Y)) + "px"
        // pattern.patternStyle.width = Math.abs(parseInt(props.pattern.startPoint.X) - parseInt(props.pattern.endPoint.X)) + "px"
        // pattern.patternStyle.height = Math.abs(parseInt(props.pattern.startPoint.Y) - parseInt(props.pattern.endPoint.Y)) + "px"
        console.log(pattern.patternStyle)
        props.modifyPattern(pattern)
    }

    initShapeStyle(patternStyle) {
        let style = new CopyUtils().copy(patternStyle)
        style.left = 0 + "px"
        style.top = 0 + "px"
        return style
    }

    render() {
        let patternShapeStyle = this.initShapeStyle(this.props.pattern.patternStyle)
        return (
            <div
                className="Pattern"
                style={this.props.pattern.patternStyle}
                onClick={(e) => this.props.setSelectPattern(1)}
                onMouseOver={(e) => this.props.setSelectPattern(1)}>
                <canvas className="Pattern-Shape" style={patternShapeStyle} />
            </div>
        );
    }
}

export default Pattern;
