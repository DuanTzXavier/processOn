import React, { Component } from 'react';
import './NodeControlPattern.css'
import LinkedNode from './LinkedNode';
import { CopyUtils } from './utils/CopyUtils';


class NodeControlPattern extends Component {

    halfNodeWidth = 3

    render() {
        let style = new CopyUtils().copy(this.props.pattern.patternStyle)
        style.visibility = this.props.pattern.isNodeControlPatternShow ? "visible" : "collapse"
        return (
            <div className="Node-Control-Pattern" style={style} onMouseLeave={(e) => this.props.dismissNodeControlPattern(this.props.pattern)} onClick={(e) => this.handleOnClick(e)}>
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
            </div>
        );
    }

    handleOnClick(e){
        this.props.setSelectPattern(this.props.pattern)
        this.props.dismissNodeControlPattern(this.props.pattern)
    }
}

export default NodeControlPattern;
