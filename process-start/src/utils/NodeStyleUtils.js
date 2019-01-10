export class NodeStyleUtils {
    halfNodeWidth = 3
    initStyle(props) {
        if (typeof (props.pattern) === 'undefined') {
            return
        }

        let style = {}
        switch (props.styleType) {
            case 1:
                style = {
                    left: parseInt(props.pattern.patternStyle.width) / 2 - this.halfNodeWidth + "px",
                    top: - this.halfNodeWidth + "px",
                }
                break;
            case 2:
                style = {
                    left: - this.halfNodeWidth + "px",
                    top: parseInt(props.pattern.patternStyle.height) / 2 - this.halfNodeWidth + "px",
                }
                break;
            case 3:
                style = {
                    left: parseInt(props.pattern.patternStyle.width) - this.halfNodeWidth + "px",
                    top: parseInt(props.pattern.patternStyle.height) / 2 - this.halfNodeWidth + "px",
                }
                break;
            case 4:
                style = {
                    left: parseInt(props.pattern.patternStyle.width) / 2 - this.halfNodeWidth + "px",
                    top: parseInt(props.pattern.patternStyle.height) - this.halfNodeWidth + "px",
                }
                break;
            default:
                style = {
                    left: parseInt(props.pattern.patternStyle.width) / 2 - this.halfNodeWidth + "px",
                    top: - this.halfNodeWidth + "px",
                }
                break
        }

        return style;
    }
}