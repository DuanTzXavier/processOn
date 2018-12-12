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
                }
                break;
            case 2:
                style = {
                    left: parseInt(this.props.parentStyle.width) - this.halfNodeWidth + "px",
                    top: - this.halfNodeWidth + "px",
                }
                break;
            case 3:
                style = {
                    left: - this.halfNodeWidth + "px",
                    top: parseInt(this.props.parentStyle.height) - this.halfNodeWidth + "px",
                }
                break;
            case 4:
                style = {
                    left: parseInt(this.props.parentStyle.width) - this.halfNodeWidth + "px",
                    top: parseInt(this.props.parentStyle.height) - this.halfNodeWidth + "px",
                }
                break;
            default:
                style = {
                    left: - this.halfNodeWidth + "px",
                    top: - this.halfNodeWidth + "px",
                }
                break
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
        const fromX = clickEvent.clientX - parseInt(this.props.pattern.patternStyle.width);
        const fromY = clickEvent.clientY - parseInt(this.props.pattern.patternStyle.height);
        this.setState({
            isActive: true,
            isMoved: false,
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
        console.log(1)

        const moveEvent = window.event || event;

        let pattern = new CopyUtils().copy(this.props.pattern)
        pattern.patternStyle.width = moveEvent.clientX - this.state.fromX + "px"
        pattern.patternStyle.height = moveEvent.clientY - this.state.fromY + "px"
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
