import React, { Component } from 'react';
import './SelectPattern.css'
import LinkedNode from './LinkedNode';
import SizeNode from './SizeNode';


class SelectPattern extends Component {
    halfNodeWidth = 3

    constructor(props) {
        super(props);
        this.state = {
            pattern: props.pattern,
            style: this.props.pattern.patternStyle,
        }
    }


    render() {
        return (
            <div className="Select-Pattern" style={this.state.style} onMouseDown={(e) => this.onMouseDown(e)}>
                <LinkedNode
                    parentStyle={this.state.style}
                    styleType={"top"}
                    addElement={this.props.addElement}
                />
                <LinkedNode
                    parentStyle={this.state.style}
                    styleType={"left"}
                    addElement={this.props.addElement}
                />
                <LinkedNode
                    parentStyle={this.state.style}
                    styleType={"bottom"}
                    addElement={this.props.addElement}
                />
                <LinkedNode
                    parentStyle={this.state.style}
                    styleType={"right"}
                    addElement={this.props.addElement}
                />
                <SizeNode
                    parentStyle={this.state.style}
                    styleType={1} />

                <SizeNode
                    parentStyle={this.state.style}
                    styleType={2} />

                <SizeNode
                    parentStyle={this.state.style}
                    styleType={3} />

                <SizeNode
                    parentStyle={this.state.style}
                    styleType={4} />
            </div>
        );
    }

    onMouseDown(e) {
        const clickEvent = window.event || e;
        const fromX = clickEvent.clientX - parseInt(this.state.style.left);
        const fromY = clickEvent.clientY - parseInt(this.state.style.top);
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
        const moveEvent = window.event || event;

        var style = {
            left: moveEvent.clientX - this.state.fromX + "px",
            top: moveEvent.clientY - this.state.fromY + "px",
        }

        this.props.modifyPosition(this.props.that, style.left, style.top)

        this.setState({
            style: style,
            isMoved: true,
        })
    }

    setStateFalse() {
        this.setState({
            isActive: false
        })
    }
}

export default SelectPattern;
