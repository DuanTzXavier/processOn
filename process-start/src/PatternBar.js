import React, { Component } from 'react';
import './PatternBar.css'
import Pattern from './Pattern';


class PatternBar extends Component {
    state={

    }
    
    render() {
        return (
            <div className="Pattern-Bar">

                {/* <Pattern/> */}
                
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

export default PatternBar;