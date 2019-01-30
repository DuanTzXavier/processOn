import React, { Component } from 'react';
import './Pattern.css'
import { CopyUtils } from './utils/CopyUtils';
import { ShaoeDrawingUtils } from './utils/ShapeDrawingUtils';


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

    componentDidUpdate() {
        this.drawShape()
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
            width: patternShapeStyle.width,
            height: patternShapeStyle.height,
        }
        return (
            <div
                className="Pattern"
                style={this.props.pattern.patternStyle}
                onClick={(e) => this.props.setSelectPattern(this.props.pattern)}
                onMouseOver={(e) => this.handleOnMouseOver(e)}>
                <div id={this.props.pattern.uniqueKey + "input"} className="Pattern-Text" style={textStyle} contentEditable="true" >1231231232131231212</div>

                <div className="Pattern" style={patternShapeStyle}>
                <canvas className="Pattern-Shape" style={patternShapeStyle} id={this.props.pattern.uniqueKey + "shape"} />

                </div>


            </div>
        );
    }

    componentDidMount() {
        this.drawShape()
    }

    handleOnMouseOver(e) {
        this.props.setNodeControlPattern(this.props.pattern)
    }

    drawShape() {
        let canvas = document.getElementById(this.props.pattern.uniqueKey + "shape")
        canvas.width = parseInt(this.props.pattern.patternStyle.width)
        canvas.height = parseInt(this.props.pattern.patternStyle.height)
        new ShaoeDrawingUtils().drawShape(this.props.pattern.styleName, canvas, 2)
    }
}

export default Pattern;
