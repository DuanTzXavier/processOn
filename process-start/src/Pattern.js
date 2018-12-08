import React, { Component } from 'react';
import './Pattern.css'
import { CopyUtils } from './utils/CopyUtils';


class Pattern extends Component {
    constructor(props) {
        super(props);
        let patternActStyle = this.props.pattern.patternStyle
        let patternStyle = new CopyUtils().copy(patternActStyle)
        let patternShapeStyle = new CopyUtils().copy(patternActStyle)
        patternShapeStyle.left = 0 + "px"
        patternShapeStyle.top = 0 + "px"

        this.state = {
            pattern: props.pattern,
            style: patternStyle,
            shapeStyle: patternShapeStyle,
        }
    }

    render() {
        return (
            <div className="Pattern" style={this.state.style} onClick={(e) => this.selectPattern(e)} onMouseDown={(e) => this.onMouseDown(e)}>
                <canvas className="Pattern-Shape" style={this.state.shapeStyle} />
            </div>
        );
    }

    selectPattern(e) {
        console.log(e)
    }

    onMouseDown(e) {
        const clickEvent = window.event || e;
        const fromX = clickEvent.clientX - parseInt(this.state.style.left);
        const fromY = clickEvent.clientY - parseInt(this.state.style.top);
        this.setState({
            isActive: true,
            fromX: fromX,
            fromY: fromY,
        })

        document.onmousemove = e => this.setMoveLocation(e)

        document.onmouseup = () => this.setStateFalse()

    }

    setMoveLocation(event) {
        if (!this.state.isActive) {
            return
        }
        const moveEvent = window.event || event;

        var style = {
            left: moveEvent.clientX - this.state.fromX + "px",
            top: moveEvent.clientY - this.state.fromY + "px",
        }

        this.setState({
            style: style
        })
    }

    setStateFalse() {
        this.setState({
            isActive: false
        })
    }
}

export default Pattern;
