import React, { Component } from 'react';
import './SizeNode.css'
import { CopyUtils } from './utils/CopyUtils';


class SizeNode extends Component {
    halfNodeWidth = 3

    initStyle() {
        let style = {}
        switch (this.props.styleType) {
            case 1:
                style = {
                    left: - this.halfNodeWidth + "px",
                    top: - this.halfNodeWidth + "px",
                    cursor:"nw-resize",
                }
                break;
            case 2:
                style = {
                    left: parseInt(this.props.parentStyle.width) - this.halfNodeWidth + "px",
                    top: - this.halfNodeWidth + "px",
                    cursor:"ne-resize"
                }
                break;
            case 3:
                style = {
                    left: - this.halfNodeWidth + "px",
                    top: parseInt(this.props.parentStyle.height) - this.halfNodeWidth + "px",
                    cursor:"sw-resize",
                }
                break;
            case 4:
                style = {
                    left: parseInt(this.props.parentStyle.width) - this.halfNodeWidth + "px",
                    top: parseInt(this.props.parentStyle.height) - this.halfNodeWidth + "px",
                    cursor:"se-resize",
                }
                break;
            default:
                style = {
                    left: - this.halfNodeWidth + "px",
                    top: - this.halfNodeWidth + "px",

                }
                break;
        }

        return style;
    }

    render() {
        let style = this.initStyle()

        return (
            <div className="Size-Node" style={style} onMouseDown={(e) => this.onMouseDown(e)}>

            </div>
        );
    }

    onMouseDown(e) {
        if (e.target.getAttribute("class") !== "Size-Node") {
            return
        }
        const clickEvent = window.event || e;
        const fromX = clickEvent.clientX - parseInt(this.props.pattern.patternStyle.left);
        const fromY = clickEvent.clientY - parseInt(this.props.pattern.patternStyle.top);

        let style = new CopyUtils().copy(this.props.pattern.patternStyle)
        this.setState({
            isActive: true,
            isMoved: false,
            fromX: fromX,
            fromY: fromY,
            width: parseInt(style.width),
            height: parseInt(style.height),
            left: parseInt(style.left),
            top: parseInt(style.top),
        })



        document.onmousemove = e => this.setMoveLocation(e)

        document.onmouseup = () => this.setStateFalse()
    }

    setMoveLocation(event) {

        if (!this.state.isActive) {
            return
        }
        console.log(event)

        const moveEvent = window.event || event;

        let pattern = new CopyUtils().copy(this.props.pattern)

        switch (this.props.styleType) {
            case 1:
                pattern.startPoint = {
                    X: this.state.left + this.state.width + "px",
                    Y: this.state.top + this.state.height + "px",
                }
                pattern.endPoint = {
                    X: moveEvent.clientX - this.state.fromX + "px",
                    Y: moveEvent.clientY - this.state.fromY + "px",
                }
                break;
            case 2:
                pattern.startPoint = {
                    X: this.state.left + "px",
                    Y: this.state.top + this.state.height + "px",
                }
                pattern.endPoint = {
                    X: moveEvent.clientX - this.state.fromX + parseInt(this.props.pattern.patternStyle.left) + "px",
                    Y: moveEvent.clientY - this.state.fromY + "px",
                }
                break;
            case 3:
                pattern.startPoint = {
                    X: this.state.left + this.state.width + "px",
                    Y: this.state.top + "px",
                }
                pattern.endPoint = {
                    X: moveEvent.clientX - this.state.fromX + "px",
                    Y: moveEvent.clientY - this.state.fromY + parseInt(this.props.pattern.patternStyle.top) + "px",
                }
                break;
            case 4:
                pattern.startPoint = {
                    X: this.state.left + "px",
                    Y: this.state.top + "px",
                }
                pattern.endPoint = {
                    X: moveEvent.clientX - this.state.fromX + parseInt(this.props.pattern.patternStyle.left) + "px",
                    Y: moveEvent.clientY - this.state.fromY + parseInt(this.props.pattern.patternStyle.top) + "px",
                }
                break;
            default:
                pattern.startPoint = {
                    X: this.state.left + this.state.width + "px",
                    Y: this.state.top + this.state.height + "px",
                }
                pattern.endPoint = {
                    X: moveEvent.clientX - this.state.fromX + "px",
                    Y: moveEvent.clientY - this.state.fromY + "px",
                }
                break;
        }

        this.props.modifyPattern(pattern)

        this.setState({
            isMoved: true,
        })
    }

    setStateFalse() {
        this.setState({
            isActive: false
        })
    }
}

export default SizeNode;
