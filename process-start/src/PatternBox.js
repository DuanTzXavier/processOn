import React, { Component } from 'react';
import './PatternBox.css'

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
        console.log(1)
    }
}

export default PatternBox;
