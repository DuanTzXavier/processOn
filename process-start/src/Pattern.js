import React, { Component } from 'react';
import './Pattern.css'
import { CopyUtils } from './utils/CopyUtils';


class Pattern extends Component {
    render() {
        let patternShapeStyle = new CopyUtils().copy(this.props.pattern.patternStyle)
        patternShapeStyle.left = 0 + "px"
        patternShapeStyle.top = 0 + "px"
        return (
            <div
                className="Pattern"
                style={this.props.pattern.patternStyle}
                onClick={(e) => this.props.setSelectPattern(1)}
                onMouseOver={(e) => this.props.setSelectPattern(1)}>
                <canvas className="Pattern-Shape" style={patternShapeStyle} />
            </div>
        );
    }
}

export default Pattern;
