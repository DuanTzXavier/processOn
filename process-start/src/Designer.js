import React, { Component } from 'react';
import DrawBoard from './DrawBoard';
import PatternBar from './PatternBar';
import { ViewUtils } from './utils/ViewUtils';
import { CopyUtils } from './utils/CopyUtils';


class Designer extends Component {
    constructor() {
        super();
        // var pattern = {
        //     isSelectedCanShow: false,
        //     isNodeControlPatternShow: false,
        //     uniqueKey: new ViewUtils().getUnicodeID(10),
        //     startPoint: {
        //         X: "200px",
        //         Y: "200px",
        //     },
        //     endPoint: {
        //         X: "401px",
        //         Y: "402px",
        //     },
        //     patternStyle: {
        //         width: "200px",
        //         height: "200px",
        //         left: "200px",
        //         top: "200px",
        //     },
        // }

        // var pattern2 = {
        //     isSelectedCanShow: false,
        //     isNodeControlPatternShow: false,
        //     uniqueKey: new ViewUtils().getUnicodeID(10),
        //     startPoint: {
        //         X: "500px",
        //         Y: "100px",
        //     },
        //     endPoint: {
        //         X: "601px",
        //         Y: "202px",
        //     },
        //     patternStyle: {
        //         width: "200px",
        //         height: "200px",
        //         left: "700px",
        //         top: "300px",
        //     },
        // }
        this.state = {
            patterns: [],
        }
    }

    render() {
        return (
            <div>
                <PatternBar modifyPatterns={this.modifyPatterns} />
                <DrawBoard
                    patterns={this.state.patterns}
                    modifyPatterns={this.modifyPatterns}
                    deletePatterns={this.deletePatterns}
                />
            </div>

        );
    }

    modifyPatterns = (modifiedPatterns) => {
        let patterns = new CopyUtils().copy(this.state.patterns)
        for (let indexM in modifiedPatterns) {
            let finded = false
            for (let index in patterns) {
                if (modifiedPatterns[indexM].uniqueKey === patterns[index].uniqueKey) {
                    patterns[index] = modifiedPatterns[indexM]
                    finded = true
                }
            }

            if (!finded) {
                patterns.push(modifiedPatterns[indexM])
            }
        }

        this.setState({
            patterns: patterns,
        })
    }

    deletePatterns = (deletePatterns) => {
        let patterns = new CopyUtils().copy(this.state.patterns)
        for (let indexM in deletePatterns) {
            for (let index in patterns) {
                if (deletePatterns[indexM].uniqueKey === patterns[index].uniqueKey) {
                    patterns.splice(index, 1)
                    break;
                }
            }
        }

        this.setState({
            patterns: patterns,
        })
    }
}

export default Designer;