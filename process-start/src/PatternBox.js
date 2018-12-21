import React, { Component } from 'react';
import './PatternBox.css'

class Pattern extends Component {

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
                onMouseOver={(e)=> this.handleOnMouseOver(e)}>


            </div>
        );
    }

    handleOnMouseOver(e){
    }

    handleOnClick(e){

    }
}

export default Pattern;
