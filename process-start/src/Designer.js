import React, { Component } from 'react';
import DrawBoard from './DrawBoard';
import PatternBar from './PatternBar';
import { CopyUtils } from './utils/CopyUtils';


class Designer extends Component {
    constructor() {
        super();
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