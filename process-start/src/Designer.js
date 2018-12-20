import React, { Component } from 'react';
import DrawBoard from './DrawBoard';
import PatternBar from './PatternBar';

class Designer extends Component {
    state = {

    }

    render() {
        return (
            <div>
                <PatternBar/>
                <DrawBoard />
            </div>

        );
    }

    static getDerivedStateFromProps(props, state) {

        // console.log(props)

        // console.log(state)


        // if(props.h1 !== state.h1){
        //     state = props

        //     console.log("1")
        //     return state
        // }


        // Any time the current user changes,
        // Reset any parts of state that are tied to that user.
        // In this simple example, that's just the email.
        return null;
    }
}

export default Designer;