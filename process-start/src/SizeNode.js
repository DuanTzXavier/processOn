import React, { Component } from 'react';
import './SizeNode.css'
import { CopyUtils } from './utils/CopyUtils';


class SizeNode extends Component {
    halfNodeWidth = 3

    initStyle() {
        if(typeof(this.props.pattern) === 'undefined'){
            return
          }
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
                    left: parseInt(this.props.pattern.patternStyle.width) - this.halfNodeWidth + "px",
                    top: - this.halfNodeWidth + "px",
                    cursor:"ne-resize"
                }
                break;
            case 3:
                style = {
                    left: - this.halfNodeWidth + "px",
                    top: parseInt(this.props.pattern.patternStyle.height) - this.halfNodeWidth + "px",
                    cursor:"sw-resize",
                }
                break;
            case 4:
                style = {
                    left: parseInt(this.props.pattern.patternStyle.width) - this.halfNodeWidth + "px",
                    top: parseInt(this.props.pattern.patternStyle.height) - this.halfNodeWidth + "px",
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
        let style = new CopyUtils().copy(this.props.pattern.patternStyle)

        const fromX = clickEvent.clientX - parseInt(style.left);
        const fromY = clickEvent.clientY - parseInt(style.top);

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
                    X: moveEvent.clientX - this.state.fromX + parseInt(this.state.width) + "px",
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
                    Y: moveEvent.clientY - this.state.fromY + parseInt(this.state.height) + "px",
                }
                break;
            case 4:
                pattern.startPoint = {
                    X: this.state.left + "px",
                    Y: this.state.top + "px",
                }
                pattern.endPoint = {
                    X: moveEvent.clientX - this.state.fromX + parseInt(this.state.width) + "px",
                    Y: moveEvent.clientY - this.state.fromY + parseInt(this.state.height) + "px",
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

        this.props.modifyPatterns([pattern])

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
