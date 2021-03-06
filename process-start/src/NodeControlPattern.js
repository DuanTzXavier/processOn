import React, { Component } from 'react';
import './NodeControlPattern.css'
import LinkedNode from './LinkedNode';
import { CopyUtils } from './utils/CopyUtils';


class NodeControlPattern extends Component {

    halfNodeWidth = 3
    isUnmount = false
    state = {
        isMoved: false,
    }

    render() {
        let style
        if (typeof (this.props.pattern) === 'undefined') {
            style = {
                visibility: "collapse",
            }
        } else {
            style = new CopyUtils().copy(this.props.pattern.patternStyle)
            style.visibility = this.props.pattern.isNodeControlPatternShow ? "visible" : "collapse"
        }

        return (
            <div
                className="Node-Control-Pattern"
                style={style}
                onMouseDown={(e) => this.onMouseDown(e)}
                onMouseLeave={(e) => this.handleOnMouseLeave(e)}
                onMouseMove={(e) => this.handleOnMouseMove(e)}
                onClick={(e) => this.handleOnClick(e)}>

                <LinkedNode
                    key={"LinkedNode" + 1}
                    pattern={this.props.pattern}
                    styleType={1}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    getBindedState={this.props.getBindedState}
                    getPatternByKey={this.props.getPatternByKey}
                    modifyBindLinks={(bindLinks) => this.props.modifyBindLinks(bindLinks)}
                />
                <LinkedNode
                    key={"LinkedNode" + 2}
                    pattern={this.props.pattern}
                    styleType={2}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    getBindedState={this.props.getBindedState}
                    getPatternByKey={this.props.getPatternByKey}
                    modifyBindLinks={(bindLinks) => this.props.modifyBindLinks(bindLinks)}
                />
                <LinkedNode
                    key={"LinkedNode" + 3}
                    pattern={this.props.pattern}
                    styleType={3}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    getBindedState={this.props.getBindedState}
                    getPatternByKey={this.props.getPatternByKey}
                    modifyBindLinks={(bindLinks) => this.props.modifyBindLinks(bindLinks)}
                />
                <LinkedNode
                    key={"LinkedNode" + 4}
                    pattern={this.props.pattern}
                    styleType={4}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    getBindedState={this.props.getBindedState}
                    getPatternByKey={this.props.getPatternByKey}
                    modifyBindLinks={(bindLinks) => this.props.modifyBindLinks(bindLinks)}
                />
            </div>
        );
    }

    handleOnClick(e) {
        if (e.target.getAttribute("class") === "Node-Control-Pattern" && this.state.isMoved) {
            return
        }

        this.props.setSelectPattern(this.props.pattern)
    }

    onMouseDown(e) {
        if (e.target.getAttribute("class") !== "Node-Control-Pattern") {
            return
        }
        const clickEvent = window.event || e;
        const fromX = clickEvent.clientX - parseInt(this.props.pattern.patternStyle.left);
        const fromY = clickEvent.clientY - parseInt(this.props.pattern.patternStyle.top);
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

        let pattern = new CopyUtils().copy(this.props.pattern)
        pattern.patternStyle.left = moveEvent.clientX - this.state.fromX + "px"
        pattern.patternStyle.top = moveEvent.clientY - this.state.fromY + "px"
        pattern.isSelectedCanShow = false
        this.props.modifyPatterns([pattern])
        this.setState({
            isMoved: true,
        })
    }

    componentWillUnmount(){
        this.isUnmount = true
    }

    setStateFalse() {
        if(this.isUnmount){
            return
        }
        this.setState({
            isActive: false
        })
    }

    handleOnMouseMove(event) {
        const e = window.event || event;

        if (e.target.getAttribute("class") !== "Node-Control-Pattern") {
            return
        }

        let mousePosition = {
            X: e.offsetX,
            Y: e.offsetY,
        }

        let centerPosition = {
            X: parseInt(this.props.pattern.patternStyle.width) / 2,
            Y: parseInt(this.props.pattern.patternStyle.height) / 2,
        }

        let transX = parseInt(this.props.pattern.patternStyle.width) - mousePosition.X

        let patternTan = centerPosition.X / centerPosition.Y
        let mouseTan = mousePosition.X / mousePosition.Y
        let mouseCot = transX / mousePosition.Y

        let position = patternTan > mouseTan ? 1 : 0
        position |= patternTan > mouseCot ? 2 : 0

        let bindedState = {
            patternKey: this.props.pattern.uniqueKey,
            position: position + 1,
            percentPosition: 50,
        }
        this.props.setBindedState(bindedState)
    }

    handleOnMouseLeave(e) {
        this.props.dismissNodeControlPattern(this.props.pattern)
        let bindedState = {
            patternKey: "",
            position: 0,
            percentPosition: 0,
        }
        this.props.setBindedState(bindedState)
    }
}

export default NodeControlPattern;
