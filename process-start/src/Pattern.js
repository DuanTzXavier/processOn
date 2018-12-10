import React, { Component } from 'react';
import './Pattern.css'
import { CopyUtils } from './utils/CopyUtils';
import SelectPattern from './SelectPattern';
import { ViewUtils } from './utils/ViewUtils';


class Pattern extends Component {
    constructor(props) {
        super(props);
        let patternActStyle = this.props.pattern.patternStyle
        let patternStyle = new CopyUtils().copy(patternActStyle)
        let patternShapeStyle = new CopyUtils().copy(patternActStyle)
        patternShapeStyle.left = 0 + "px"
        patternShapeStyle.top = 0 + "px"

        this.state = {
            pattern: props.pattern,
            style: patternStyle,
            shapeStyle: patternShapeStyle,
            x:1
        }

        this.addSelectPattern()
    }

    render() {
        // this.addSelectPattern()
        return (
            <div className="Pattern" style={this.state.style} onClick={(e) => this.selectPattern(e)} >
                <canvas className="Pattern-Shape" style={this.state.shapeStyle} />
            </div>
        );
    }

    selectPattern(e) {

        this.setState({
            x: 111
        })

        console.log(this.state.x)
        // let select = document.getElementsByClassName("Select-Pattern")
        // console.log(e)
        // if (select.length === 0) {
        //     e.isHandled = true
        //     this.addSelectPattern()
        // }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext){

        console.log(nextProps)
        return true
    }

    addSelectPattern() {
        let key = new ViewUtils().getUnicodeID(10)

        this.props.addElement(
            <SelectPattern
                key={key}
                pattern={this.state.pattern}
                modifyPosition={this.modifyPosition}
                that={this}
                x={this.state.x}
                addElement={this.props.addElement} />
        )
    }

    modifyPosition(that, left, top) {
        let copiedStyle = new CopyUtils().copy(that.state.style)

        copiedStyle.left = left
        copiedStyle.top = top

        that.setState({
            style: copiedStyle
        })
    }
}

export default Pattern;
