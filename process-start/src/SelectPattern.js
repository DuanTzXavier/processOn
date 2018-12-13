import React, { Component } from 'react';
import './SelectPattern.css'
import LinkedNode from './LinkedNode';
import SizeNode from './SizeNode';
import { CopyUtils } from './utils/CopyUtils';


class SelectPattern extends Component {
    render() {
        let style = new CopyUtils().copy(this.props.pattern.patternStyle)
        style.visibility = this.props.pattern.isSelectedCanShow ? "visible" : "collapse"
        
        return (
            <div id="SelectPattern" className="Select-Pattern" style={style} onMouseDown={(e) => this.onMouseDown(e)}>
                <LinkedNode
                    parentStyle={this.props.pattern.patternStyle}
                    styleType={"top"}
                    patternKey={this.props.pattern.uniqueKey}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    modifyBindLinks={(key, bindLink) => this.props.modifyBindLinks(key, bindLink)}
                    addElement={this.props.addElement}
                />
                <LinkedNode
                    parentStyle={this.props.pattern.patternStyle}
                    styleType={"left"}
                    patternKey={this.props.pattern.uniqueKey}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    modifyBindLinks={(key, bindLink) => this.props.modifyBindLinks(key, bindLink)}
                    addElement={this.props.addElement}
                />
                <LinkedNode
                    parentStyle={this.props.pattern.patternStyle}
                    styleType={"bottom"}
                    patternKey={this.props.pattern.uniqueKey}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    modifyBindLinks={(key, bindLink) => this.props.modifyBindLinks(key, bindLink)}
                    addElement={this.props.addElement}
                />
                <LinkedNode
                    parentStyle={this.props.pattern.patternStyle}
                    styleType={"right"}
                    patternKey={this.props.pattern.uniqueKey}
                    links={this.props.links}
                    addBindLink={(newBindLink) => this.props.addBindLink(newBindLink)}
                    modifyBindLinks={(key, bindLink) => this.props.modifyBindLinks(key, bindLink)}
                    addElement={this.props.addElement}
                />
                <SizeNode
                    pattern={this.props.pattern}
                    modifyPattern={this.props.modifyPattern}
                    parentStyle={this.props.pattern.patternStyle}
                    styleType={1} />

                <SizeNode
                    pattern={this.props.pattern}
                    modifyPattern={this.props.modifyPattern}
                    parentStyle={this.props.pattern.patternStyle}
                    styleType={2} />

                <SizeNode
                    pattern={this.props.pattern}
                    modifyPattern={this.props.modifyPattern}
                    parentStyle={this.props.pattern.patternStyle}
                    styleType={3} />

                <SizeNode
                    pattern={this.props.pattern}
                    modifyPattern={this.props.modifyPattern}
                    parentStyle={this.props.pattern.patternStyle}
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
