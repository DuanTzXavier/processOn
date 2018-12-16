import React, { Component } from 'react';
import './SelectPattern.css'
import LinkedNode from './LinkedNode';
import SizeNode from './SizeNode';
import { CopyUtils } from './utils/CopyUtils';


class SelectPattern extends Component {
    render() {
        let style
        if (typeof (this.props.pattern) === 'undefined') {
            style = {
                visibility: "collapse",
            }
        } else {
            style = new CopyUtils().copy(this.props.pattern.patternStyle)
            style.visibility = this.props.pattern.isSelectedCanShow ? "visible" : "collapse"
        }


        return (
            <div id="SelectPattern" className="Select-Pattern" style={style} onMouseDown={(e) => this.onMouseDown(e)}>
                <LinkedNode
                    pattern={this.props.pattern}
                    styleType={1}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    getBindedState={this.props.getBindedState}
                    getPatternByKey={this.props.getPatternByKey}
                    modifyBindLinks={(key, bindLink) => this.props.modifyBindLinks(key, bindLink)}
                />
                <LinkedNode
                    pattern={this.props.pattern}
                    styleType={2}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    getBindedState={this.props.getBindedState}
                    getPatternByKey={this.props.getPatternByKey}
                    modifyBindLinks={(key, bindLink) => this.props.modifyBindLinks(key, bindLink)}
                />
                <LinkedNode
                    pattern={this.props.pattern}
                    styleType={4}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    getBindedState={this.props.getBindedState}
                    getPatternByKey={this.props.getPatternByKey}
                    modifyBindLinks={(key, bindLink) => this.props.modifyBindLinks(key, bindLink)}
                />
                <LinkedNode
                    pattern={this.props.pattern}
                    styleType={3}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    getBindedState={this.props.getBindedState}
                    getPatternByKey={this.props.getPatternByKey}
                    modifyBindLinks={(key, bindLink) => this.props.modifyBindLinks(key, bindLink)}
                />
                <SizeNode
                    pattern={this.props.pattern}
                    modifyPattern={this.props.modifyPattern}
                    styleType={1} />

                <SizeNode
                    pattern={this.props.pattern}
                    modifyPattern={this.props.modifyPattern}
                    styleType={2} />

                <SizeNode
                    pattern={this.props.pattern}
                    modifyPattern={this.props.modifyPattern}
                    styleType={3} />

                <SizeNode
                    pattern={this.props.pattern}
                    modifyPattern={this.props.modifyPattern}
                    styleType={4} />
            </div>
        );
    }



    onMouseDown(e) {
        if (e.target.getAttribute("class") !== "Select-Pattern") {
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

export default SelectPattern;
