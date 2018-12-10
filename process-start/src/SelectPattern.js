import React, { Component } from 'react';
import './SelectPattern.css'
import LinkedNode from './LinkedNode';
import SizeNode from './SizeNode';
import { CopyUtils } from './utils/CopyUtils';


class SelectPattern extends Component {
    halfNodeWidth = 3

    constructor(props) {
        super(props);
        this.state = {
            pattern: props.pattern,
            x: props.x,
            style: props.pattern.patternStyle,
        }
    }


    render() {
        let dom = null
        if (true) {
            dom = (
                <div id="SelectPattern" className="Select-Pattern" onMouseDown={(e) => this.onMouseDown(e)}>
                    <LinkedNode
                        parentStyle={this.state.style}
                        styleType={"top"}
                        addElement={this.props.addElement}
                    />
                    <h1>{this.state.x}</h1>
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
            )
        }
        return dom;
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

    shouldComponentUpdate(nextProps, nextState, nextContext){

        console.log(nextProps)
        return true
    }

    static getDerivedStateFromProps(props, state) {

        console.log(props.x)

        console.log(state)
        // Any time the current user changes,
        // Reset any parts of state that are tied to that user.
        // In this simple example, that's just the email.
        return null;
    }

    setMoveLocation(event) {
        if (!this.state.isActive) {
            return
        }
        const moveEvent = window.event || event;
        let style = new CopyUtils().copy(this.state.style)

        style.left = moveEvent.clientX - this.state.fromX + "px"
        style.top = moveEvent.clientY - this.state.fromY + "px"

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
