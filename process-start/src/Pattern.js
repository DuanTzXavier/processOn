import React, { Component } from 'react';
import './Pattern.css'
import { CopyUtils } from './utils/CopyUtils';


class Pattern extends Component {

    constructor(props) {
        super(props);
        this.updatePatternStyle(props)
    }

    componentWillUpdate(nextProps) {
        if (nextProps.pattern.startPoint.X !== this.props.pattern.startPoint.X ||
            nextProps.pattern.startPoint.Y !== this.props.pattern.startPoint.Y ||
            nextProps.pattern.endPoint.X !== this.props.pattern.endPoint.X ||
            nextProps.pattern.endPoint.Y !== this.props.pattern.endPoint.Y) {
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
        props.modifyPatterns([pattern])
    }

    initShapeStyle(patternStyle) {
        let style = new CopyUtils().copy(patternStyle)
        style.left = 0 + "px"
        style.top = 0 + "px"
        return style
    }

    render() {
        let patternShapeStyle = this.initShapeStyle(this.props.pattern.patternStyle)

        let textStyle = {
            width:patternShapeStyle.width,
            height:patternShapeStyle.height,
        }
        return (
            <div
                className="Pattern"
                style={this.props.pattern.patternStyle}
                onClick={(e) => this.props.setSelectPattern(this.props.pattern)}
                onMouseOver={(e)=> this.handleOnMouseOver(e)}>
                <canvas className="Pattern-Shape" style={patternShapeStyle} />

                <div  id={this.props.pattern.uniqueKey + "input"} className="Pattern-Text" style={textStyle} contentEditable="true"></div>

            </div>
        );
    }

    handleOnMouseOver(e){
        this.props.setNodeControlPattern(this.props.pattern)
    }
}

export default Pattern;
