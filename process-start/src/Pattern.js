import React, { Component } from 'react';
import './Pattern.css'
import { CopyUtils } from './utils/CopyUtils';
import SelectPattern from './SelectPattern';
import { ViewUtils } from './utils/ViewUtils';


class Pattern extends Component {
    render() {
        let patternShapeStyle = new CopyUtils().copy(this.props.pattern.patternStyle)
        patternShapeStyle.left = 0 + "px"
        patternShapeStyle.top = 0 + "px"
        return (
            <div className="Pattern" style={this.props.pattern.patternStyle} onClick={(e) => this.selectPattern(e)} >
                <canvas className="Pattern-Shape" style={patternShapeStyle} />
            </div>
        );
    }

    selectPattern(e) {
        this.addSelectPattern()
    }

    addSelectPattern() {
        let key = new ViewUtils().getUnicodeID(10)

        this.props.setSelectPattern(1)
    }
}

export default Pattern;
