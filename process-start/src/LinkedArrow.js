import React, { Component } from 'react';
import './LinkedArrow.css'

class LinkedArrow extends Component {

    harfArrowWidth = 7

    shouldBeIncreas = 50

    mount = false
    state = {

    }

    render() {
        // build div style


        if (!this.mount) {
            this.calculatStyle(this.props.bindLink)
        }

        return (
            <div
                className="Linked-Arrow"
                style={this.style}>

                <canvas id={this.props.bindLink.uniqueKey} onMouseMove={(e) => this.handleOnMouseMove(e)} onClick={(e) => this.handleOnClick(e)} style={this.state.canvasStyle} />

            </div>
        );
    }

    calculatStyle(bindLink) {
        let startFrom = bindLink.startFrom
        let endTo = bindLink.endTo
        let fromPosition = 0
        if (typeof (startFrom) !== 'undefined') {
            fromPosition = startFrom.split("_")[1]
        }

        let toPosition = 0
        if (typeof (endTo) !== 'undefined') {
            toPosition = endTo.split("_")[1]
        }

        let left = Math.min(bindLink.startPoint.X, bindLink.endPoint.X) - this.harfArrowWidth - (toPosition === "2" && fromPosition === "2" ? this.shouldBeIncreas : 0) + "px"
        let top = Math.min(bindLink.startPoint.Y, bindLink.endPoint.Y) - this.harfArrowWidth - (toPosition === "1" && fromPosition === "1" ? this.shouldBeIncreas : 0) + "px"

        let width = Math.abs(bindLink.startPoint.X - bindLink.endPoint.X) + this.harfArrowWidth * 2 + "px"
        let height = Math.abs(bindLink.startPoint.Y - bindLink.endPoint.Y) + this.harfArrowWidth * 2 + "px"
        this.style = {
            left: left,
            top: top,
            width: width,
            height: height,
        }
    }

    handleOnMouseMove = (event) => {
        if (this.isOnCanvas(event)) {
            this.setState({
                canvasStyle: {
                    cursor: "wait",
                }
            })
        } else {
            this.setState({
                canvasStyle: {
                    cursor: "default",
                }
            })
        }
    }

    handleOnClick = (event) => {
        let bindLink = this.props.bindLink
        bindLink.isSelect = true
        this.props.modifyBindLinks([bindLink])
    }

    isOnCanvas(event) {
        if (event.currentTarget.tagName !== "CANVAS") {
            return false
        }

        let ctx = event.currentTarget.getContext('2d')
        let e = window.event || event;
        return ctx.isPointInPath(e.offsetX, e.offsetY)
    }

    componentDidMount() {
        this.mount = true
        this.initArrow(this.props.bindLink)
    }

    componentWillUpdate(props) {
        this.calculatStyle(props.bindLink)
        this.initArrow(props.bindLink)
    }

    

    initArrow(bindLink) {
        const canvas = document.getElementById(bindLink.uniqueKey)

        let startFrom = bindLink.startFrom
        let endTo = bindLink.endTo

        // let fromKey = ""
        let fromPosition = 0
        if (typeof (startFrom) !== 'undefined') {
            // fromKey = startFrom.split("_")[0]
            fromPosition = startFrom.split("_")[1] - 1
        }

        let toKey = ""
        let toPosition = 0
        if (typeof (endTo) !== 'undefined') {
            toKey = endTo.split("_")[0]
            toPosition = endTo.split("_")[1] - 1
        }

        //TODO find the logic please
        const isVertical = fromPosition === 0 || fromPosition === 3

        if (toKey === "" || (fromPosition + toPosition) === 3) {
            this.drawDirectLine(bindLink, canvas, isVertical)
        } else if (fromPosition === toPosition) {
            this.drawSamePositionLine(bindLink, canvas, fromPosition)
        } else {
            this.drawCrossLine(bindLink, canvas, isVertical)
        }

    }

    initStartPosition(bindLink) {
        let startX = bindLink.startPoint.X;
        let startY = bindLink.startPoint.Y;
        let endX = bindLink.endPoint.X;
        let endY = bindLink.endPoint.Y;
        return (startX < endX ? 0 : 1) | (startY < endY ? 0 : 2)
    }

    drawSamePositionLine(bindLink, canvas, fromPosition) {
        //this is U style Link line
        const isVertical = fromPosition === 0 || fromPosition === 3
        //initParams
        let width = Math.abs(bindLink.startPoint.X - bindLink.endPoint.X) + this.harfArrowWidth * 2
        let height = Math.abs(bindLink.startPoint.Y - bindLink.endPoint.Y) + this.harfArrowWidth * 2

        if (isVertical) {
            height += this.shouldBeIncreas
        } else {
            width += this.shouldBeIncreas
        }

        canvas.width = width
        canvas.height = height

        let startPosition = this.initStartPosition(bindLink)
        let endPosition = startPosition ^ 3

        let haw = this.harfArrowWidth

        //获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = canvas.getContext("2d");
        ctx.lineWidth = 2

        if (bindLink.isSelect) {
            ctx.shadowBlur = 5;
            ctx.shadowColor = "#833";
        }

        let points = []

        switch (fromPosition) {
            case 0:
                points[0] = {
                    x: (startPosition & 1) === 1 ? (width - haw) : haw,
                    y: startPosition < 2 ? haw + this.shouldBeIncreas : height - haw
                }

                points[1] = {
                    x: isVertical ? (startPosition & 1) === 1 ? (width - haw) : haw : width / 2,
                    y: isVertical ? haw : startPosition < 2 ? haw : height - haw,
                }

                points[2] = {
                    x: isVertical ? (startPosition & 1) === 1 ? haw : (width - haw) : width / 2,
                    y: isVertical ? haw : startPosition > 1 ? haw : height - haw,
                }
                points[3] = {
                    x: (endPosition & 1) === 1 ? (width - haw) : haw,
                    y: endPosition < 2 ? haw + this.shouldBeIncreas : height - haw
                }
                break
            case 1:
                points[0] = {
                    x: (startPosition & 1) === 1 ? (width - haw) : haw + this.shouldBeIncreas,
                    y: startPosition < 2 ? haw : height - haw,
                }
                points[1] = {
                    x: isVertical ? (startPosition & 1) === 1 ? (width - haw) : haw : haw,
                    y: isVertical ? height - haw : startPosition < 2 ? haw : height - haw,
                }
                points[2] = {
                    x: isVertical ? (startPosition & 1) === 1 ? haw : (width - haw) : haw,
                    y: isVertical ? haw : startPosition > 1 ? haw : height - haw,
                }

                points[3] = {
                    x: (endPosition & 1) === 1 ? (width - haw) : haw + this.shouldBeIncreas,
                    y: endPosition < 2 ? haw : height - haw
                }
                break
            case 2:
                points[0] = {
                    x: (startPosition & 1) === 1 ? (width - haw - this.shouldBeIncreas) : haw,
                    y: startPosition < 2 ? haw : height - haw,
                }
                points[1] = {
                    x: isVertical ? (startPosition & 1) === 1 ? (width - haw) : width - haw : width - haw,
                    y: isVertical ? height - haw : startPosition < 2 ? haw : height - haw,
                }
                points[2] = {
                    x: isVertical ? (startPosition & 1) === 1 ? haw : (width - haw) : width - haw,
                    y: isVertical ? haw : startPosition > 1 ? haw : height - haw,
                }


                points[3] = {
                    x: (endPosition & 1) === 1 ? (width - haw - this.shouldBeIncreas) : haw,
                    y: endPosition < 2 ? haw : height - haw
                }
                break
            case 3:
                points[0] = {
                    x: (startPosition & 1) === 1 ? (width - haw) : haw,
                    y: startPosition < 2 ? haw : height - haw - this.shouldBeIncreas
                }
                points[1] = {
                    x: isVertical ? (startPosition & 1) === 1 ? (width - haw) : haw : width / 2,
                    y: isVertical ? height - haw : startPosition < 2 ? haw : height - haw,
                }

                points[2] = {
                    x: isVertical ? (startPosition & 1) === 1 ? haw : (width - haw) : width / 2,
                    y: isVertical ? height - haw : startPosition > 1 ? haw : height - haw,
                }
                points[3] = {
                    x: (endPosition & 1) === 1 ? (width - haw) : haw,
                    y: endPosition < 2 ? haw : height - haw - this.shouldBeIncreas
                }
                break
            default:
                break;
        }

        ctx.moveTo(points[0].x, points[0].y)
        points.forEach((value, _) => {
            ctx.lineTo(value.x, value.y)
        })

        //沿着坐标点顺序的路径绘制直线
        ctx.stroke();
        //关闭当前的绘制路径
        ctx.closePath();
    }

    drawCrossLine(bindLink, canvas, isVertical) {
        //initParams
        let width = Math.abs(bindLink.startPoint.X - bindLink.endPoint.X) + this.harfArrowWidth * 2
        let height = Math.abs(bindLink.startPoint.Y - bindLink.endPoint.Y) + this.harfArrowWidth * 2

        canvas.width = width
        canvas.height = height

        let haw = this.harfArrowWidth

        //获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = canvas.getContext("2d");

        ctx.lineWidth = 2
        ctx.lineJoin = "round";

        if (bindLink.isSelect) {
            ctx.shadowBlur = 5;
            ctx.shadowColor = "#833";
        }

        let points = this.getCrossLinePosition(bindLink, isVertical, haw, width, height)

        ctx.moveTo(points[0].x, points[0].y)
        points.forEach((value, _) => {
            ctx.lineTo(value.x, value.y)
        })

        //沿着坐标点顺序的路径绘制直线
        ctx.stroke();
        //关闭当前的绘制路径
        ctx.closePath();
    }

    getCrossLinePosition(bindLink, isVertical, haw, width, height) {
        let startPosition = this.initStartPosition(bindLink)
        let endPosition = startPosition ^ 3
        let points = []
        points[0] = {
            x: (startPosition & 1) === 1 ? (width - haw) : haw,
            y: startPosition < 2 ? haw : height - haw
        }

        points[1] = {
            x: isVertical ? (startPosition & 1) === 1 ? (width - haw) : haw : (startPosition & 1) !== 1 ? (width - haw) : haw,
            y: isVertical ? (startPosition & 2) !== 2 ? height - haw : haw : (startPosition & 2) === 2 ? height - haw : haw,
        }

        points[2] = {
            x: (endPosition & 1) === 1 ? (width - haw) : haw,
            y: endPosition < 2 ? haw : height - haw
        }

        return points
    }

    drawDirectLine(bindLink, canvas, isVertical) {
        //initParams
        let width = Math.abs(bindLink.startPoint.X - bindLink.endPoint.X) + this.harfArrowWidth * 2
        let height = Math.abs(bindLink.startPoint.Y - bindLink.endPoint.Y) + this.harfArrowWidth * 2

        canvas.width = width
        canvas.height = height

        let haw = this.harfArrowWidth

        //获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = canvas.getContext("2d");

        ctx.lineWidth = 2
        ctx.lineJoin = "round";

        if (bindLink.isSelect) {
            ctx.shadowBlur = 5;
            ctx.shadowColor = "#833";
        }

        let points = this.getDirectLinePosition(bindLink, isVertical, haw, width, height)

        ctx.moveTo(points[0].x, points[0].y)
        points.forEach((value, _) => {
            ctx.lineTo(value.x, value.y)
        })

        //沿着坐标点顺序的路径绘制直线
        ctx.stroke();
        //关闭当前的绘制路径
        ctx.closePath();
    }

    getDirectLinePosition(bindLink, isVertical, haw, width, height) {
        let startPosition = this.initStartPosition(bindLink)
        let endPosition = startPosition ^ 3
        let points = []
        points[0] = {
            x: (startPosition & 1) === 1 ? (width - haw) : haw,
            y: startPosition < 2 ? haw : height - haw
        }

        points[1] = {
            x: isVertical ? (startPosition & 1) === 1 ? (width - haw) : haw : width / 2,
            y: isVertical ? height / 2 : startPosition < 2 ? haw : height - haw,
        }

        points[2] = {
            x: isVertical ? (startPosition & 1) === 1 ? haw : (width - haw) : width / 2,
            y: isVertical ? height / 2 : startPosition > 1 ? haw : height - haw,
        }

        points[3] = {
            x: (endPosition & 1) === 1 ? (width - haw) : haw,
            y: endPosition < 2 ? haw : height - haw
        }

        return points
    }
}

export default LinkedArrow;
