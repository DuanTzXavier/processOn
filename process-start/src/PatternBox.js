import React, { Component } from 'react';
import './PatternBox.css'
import { ViewUtils } from './utils/ViewUtils';
import { ShaoeDrawingUtils } from './utils/ShapeDrawingUtils';

class PatternBox extends Component {

    _LINE_WIDTH = 5

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div
                className="Pattern-Box"
                onClick={(e) => this.handleOnClick(e)}
                onMouseOver={(e) => this.handleOnMouseOver(e)}>
                <canvas className="Pattern-Box-Shape" id={this.props.styleName} />
            </div>
        );
    }

    handleOnMouseOver(e) {
        console.log(2)
    }

    handleOnClick(e) {
        var pattern = {
            isSelectedCanShow: false,
            isNodeControlPatternShow: false,
            uniqueKey: new ViewUtils().getUnicodeID(10),
            startPoint: {
                X: "200px",
                Y: "200px",
            },
            endPoint: {
                X: "401px",
                Y: "402px",
            },
            patternStyle: {
                width: "200px",
                height: "200px",
                left: "200px",
                top: "200px",
            },
        }

        this.props.modifyPatterns([pattern])
    }

    componentDidMount() {
        this.initShape()
    }

    initShape() {
        let canvas = document.getElementById(this.props.styleName)
        new ShaoeDrawingUtils().drawShape(this.props.styleName, canvas, this._LINE_WIDTH)
    }
}

export default PatternBox;
