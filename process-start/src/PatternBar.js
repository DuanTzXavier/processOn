import React, { Component } from 'react';
import './PatternBar.css'


class PatternBar extends Component {
    state = {

    }

    render() {
        return (
            <div className="Pattern-Bar">

                <h3 >基础图形</h3>

                <div  className="InLineRow">
                    <div className="InLineItem">
                        <canvas></canvas>
                    </div>
                    <div className="InLineItem">1</div>
                    <div className="InLineItem">1</div>
                </div>

                <div  className="InLineRow">
                    <div className="InLineItem">1</div>
                    <div className="InLineItem">1</div>
                    <div className="InLineItem">1</div>
                </div>

                <div  className="InLineRow">
                    <div className="InLineItem">1</div>
                    <div className="InLineItem">1</div>
                    <div className="InLineItem">1</div>
                </div>

                <div  className="InLineRow">
                    <div className="InLineItem">1</div>
                    <div className="InLineItem">1</div>
                    <div className="InLineItem">1</div>
                </div>
            </div>
        );
    }
}

export default PatternBar;