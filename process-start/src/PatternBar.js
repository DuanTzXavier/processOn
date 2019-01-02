import React, { Component } from 'react';
import './PatternBar.css'
import PatternBox from './PatternBox';


class PatternBar extends Component {
    state = {

    }

    render() {
        return (
            <div className="Pattern-Bar">

                <h3 >基础图形</h3>

                <div  className="InLineRow">
                    <div className="InLineItem">
                        <PatternBox modifyPatterns={this.props.modifyPatterns}/>
                    </div>
                    <div className="InLineItem"><PatternBox modifyPatterns={this.props.modifyPatterns}/></div>
                    <div className="InLineItem"><PatternBox modifyPatterns={this.props.modifyPatterns}/></div>
                </div>

                {/* <div  className="InLineRow">
                    <div className="InLineItem"><PatternBox/></div>
                    <div className="InLineItem"><PatternBox/></div>
                    <div className="InLineItem"><PatternBox/></div>
                </div>

                <div  className="InLineRow">
                    <div className="InLineItem"><PatternBox/></div>
                    <div className="InLineItem"><PatternBox/></div>
                    <div className="InLineItem"><PatternBox/></div>
                </div>

                <div  className="InLineRow">
                    <div className="InLineItem"><PatternBox/></div>
                    <div className="InLineItem"><PatternBox/></div>
                    <div className="InLineItem"><PatternBox/></div>
                </div> */}
            </div>
        );
    }
}

export default PatternBar;