import React, { Component } from 'react';
import './NodeControlPattern.css'
import LinkedNode from './LinkedNode';
import { CopyUtils } from './utils/CopyUtils';


class NodeControlPattern extends Component {

    halfNodeWidth = 3

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
            <div className="Node-Control-Pattern" style={style} onMouseDown={(e) => this.onMouseDown(e)} onMouseLeave={(e) => this.props.dismissNodeControlPattern(this.props.pattern)} onClick={(e) => this.handleOnClick(e)}>
                <LinkedNode
                    pattern={this.props.pattern}
                    styleType={"top"}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    modifyBindLinks={(key, bindLink) => this.props.modifyBindLinks(key, bindLink)}
                />
                <LinkedNode
                    pattern={this.props.pattern}
                    styleType={"left"}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    modifyBindLinks={(key, bindLink) => this.props.modifyBindLinks(key, bindLink)}
                />
                <LinkedNode
                    pattern={this.props.pattern}
                    styleType={"bottom"}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    modifyBindLinks={(key, bindLink) => this.props.modifyBindLinks(key, bindLink)}
                />
                <LinkedNode
                    pattern={this.props.pattern}
                    styleType={"right"}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    modifyBindLinks={(key, bindLink) => this.props.modifyBindLinks(key, bindLink)}
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

export default NodeControlPattern;
