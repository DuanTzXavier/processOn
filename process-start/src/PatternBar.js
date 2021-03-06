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

                <div className="InLineRow">
                    <div className="InLineItem">
                        <PatternBox
                            styleName={"rectangle"}
                            modifyPatterns={this.props.modifyPatterns} />
                    </div>
                    <div className="InLineItem">
                        <PatternBox
                            styleName={"circle_rectangle"}
                            modifyPatterns={this.props.modifyPatterns} />
                    </div>
                    <div className="InLineItem">
                        <PatternBox
                            styleName={"rhomb"}
                            modifyPatterns={this.props.modifyPatterns} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PatternBar;