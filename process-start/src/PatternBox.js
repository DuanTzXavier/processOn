import React, { Component } from 'react';
import './PatternBox.css'
import { ViewUtils } from './utils/ViewUtils';

class PatternBox extends Component {

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
                onMouseOver={(e)=> this.handleOnMouseOver(e)}>1</div>
        );
    }

    handleOnMouseOver(e){
        console.log(2)
    }

    handleOnClick(e){
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
        console.log(1)
    }
}

export default PatternBox;
