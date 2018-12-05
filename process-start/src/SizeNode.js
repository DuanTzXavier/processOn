import React, { Component } from 'react';
import './SizeNode.css'

class SizeNode extends Component {
    halfNodeWidth = 3
    constructor(props) {
        super(props);
        let style = this.initStyle()
    
        parseInt(props.parentStyle.left)
        this.state = {
          style: style,
        }
      }

    initStyle() {
        let style = {}
        switch (this.props.styleType) {
            case 1:
                style = {
                    left: - this.halfNodeWidth + "px",
                    top: - this.halfNodeWidth + "px",
                }
                break;
            case 2:
                style = {
                    left: parseInt(this.props.parentStyle.width) - this.halfNodeWidth + "px",
                    top: - this.halfNodeWidth + "px",
                }
                break;
            case 3:
                style = {
                    left: - this.halfNodeWidth + "px",
                    top: parseInt(this.props.parentStyle.height) - this.halfNodeWidth + "px",
                }
                break;
            case 4:
                style = {
                    left: parseInt(this.props.parentStyle.width) - this.halfNodeWidth + "px",
                    top: parseInt(this.props.parentStyle.height) - this.halfNodeWidth + "px",
                }
                break;
            default:
                style = {
                    left: - this.halfNodeWidth + "px",
                    top: - this.halfNodeWidth + "px",
                }
                break
        }

        return style;
    }



    render() {
        return (
            <div className="Size-Node" style={this.state.style}>

            </div>
        );
    }
}

export default SizeNode;
