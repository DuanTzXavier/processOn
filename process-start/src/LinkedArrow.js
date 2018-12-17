import React, { Component } from 'react';
import './LinkedArrow.css'

class LinkedArrow extends Component {

    harfArrowWidth = 7

    state = {

    }

    constructor(props) {
        super(props);
        this.initArrow = this.initArrow.bind(this)
    }

    updateProps(bindLink) {
        bindLink.that.setState({
            bindLink: bindLink,
        });
    }

    render() {
        // build div style
        let left = Math.min(this.props.bindLink.startPoint.X, this.props.bindLink.endPoint.X) - this.harfArrowWidth + "px"
        let top = Math.min(this.props.bindLink.startPoint.Y, this.props.bindLink.endPoint.Y) - this.harfArrowWidth + "px"

        let width = Math.abs(this.props.bindLink.startPoint.X - this.props.bindLink.endPoint.X) + this.harfArrowWidth * 2 + "px"
        let height = Math.abs(this.props.bindLink.startPoint.Y - this.props.bindLink.endPoint.Y) + this.harfArrowWidth * 2 + "px"

        var style = {
            left: left,
            top: top,
            width: width,
            height: height,
        }
        return (
            <div
                className="Linked-Arrow"
                style={style}>

                <canvas id={this.props.bindLink.uniqueKey} onMouseMove={(e)=>this.handleOnMouseMove(e)} style={this.state.canvasStyle} />

            </div>
        );
    }

    handleOnMouseMove = (event) => {
        let e = event || window.event;
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        let x = e.pageX || e.clientX + scrollX;
        let y = e.pageY || e.clientY + scrollY;
        let left = Math.min(this.props.bindLink.startPoint.X, this.props.bindLink.endPoint.X) - this.harfArrowWidth
        let top = Math.min(this.props.bindLink.startPoint.Y, this.props.bindLink.endPoint.Y) - this.harfArrowWidth
        x -= left
        y -= top
        let ctx = e.currentTarget.getContext('2d')

        if(ctx.isPointInPath(x, y)){
            this.setState({
                canvasStyle:{
                    cursor: "wait",
                }
            })
        }else{
            this.setState({
                canvasStyle:{
                    cursor: "default",
                }
            })

            // e.currentTarget.style += "cursor: default;"
        }
    }

    componentDidMount() {
        this.initArrow()
    }

    componentWillUpdate() {
        this.initArrow()

    }

    initArrow() {
        const canvas = document.getElementById(this.props.bindLink.uniqueKey)

        let startFrom = this.props.bindLink.startFrom
        let endTo = this.props.bindLink.endTo

        let fromKey = ""
        let fromPosition = 0
        if (typeof (startFrom) !== 'undefined') {
            fromKey = startFrom.split("_")[0]
            fromPosition = startFrom.split("_")[1] - 1
        }

        let toKey = ""
        let toPosition = 0
        if (typeof (endTo) !== 'undefined') {
            toKey = endTo.split("_")[0]
            toPosition = endTo.split("_")[1] - 1
        }

        const isVertical = fromPosition & 2 === 0

        if (toKey === "" || (fromPosition + toPosition) === 3) {
            this.drawDirectLine(canvas, isVertical)
        } else if (fromPosition === toPosition) {
            this.drawSamePositionLine(canvas, isVertical)
        } else {
            this.drawCrossLine(canvas, isVertical)
        }

    }

    drawSamePositionLine(canvas, isVertical) {
        //initParams
        let width = Math.abs(this.props.bindLink.startPoint.X - this.props.bindLink.endPoint.X) + this.harfArrowWidth * 2
        let height = Math.abs(this.props.bindLink.startPoint.Y - this.props.bindLink.endPoint.Y) + this.harfArrowWidth * 2

        canvas.width = width
        canvas.height = height

        let startX = this.props.bindLink.startPoint.X;
        let startY = this.props.bindLink.startPoint.Y;
        let endX = this.props.bindLink.endPoint.X;
        let endY = this.props.bindLink.endPoint.Y;
        let startPosition = (startX < endX ? 0 : 1) | (startY < endY ? 0 : 2)
        let endPosition = startPosition ^ 3

        let haw = this.harfArrowWidth

        //获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = canvas.getContext("2d");
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

        ctx.moveTo(points[0].x, points[0].y)
        points.forEach((value, _) => {
            ctx.lineTo(value.x, value.y)
        })

        //沿着坐标点顺序的路径绘制直线
        ctx.stroke();
        //关闭当前的绘制路径
        ctx.closePath();
    }

    drawCrossLine(canvas, isVertical) {
        //initParams
        let width = Math.abs(this.props.bindLink.startPoint.X - this.props.bindLink.endPoint.X) + this.harfArrowWidth * 2
        let height = Math.abs(this.props.bindLink.startPoint.Y - this.props.bindLink.endPoint.Y) + this.harfArrowWidth * 2

        canvas.width = width
        canvas.height = height

        let startX = this.props.bindLink.startPoint.X;
        let startY = this.props.bindLink.startPoint.Y;
        let endX = this.props.bindLink.endPoint.X;
        let endY = this.props.bindLink.endPoint.Y;
        let startPosition = (startX < endX ? 0 : 1) | (startY < endY ? 0 : 2)
        let endPosition = startPosition ^ 3

        let haw = this.harfArrowWidth

        //获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = canvas.getContext("2d");
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

        ctx.moveTo(points[0].x, points[0].y)
        points.forEach((value, _) => {
            ctx.lineTo(value.x, value.y)
        })

        //沿着坐标点顺序的路径绘制直线
        ctx.stroke();
        //关闭当前的绘制路径
        ctx.closePath();
    }

    drawDirectLine(canvas, isVertical) {
        //initParams
        let width = Math.abs(this.props.bindLink.startPoint.X - this.props.bindLink.endPoint.X) + this.harfArrowWidth * 2
        let height = Math.abs(this.props.bindLink.startPoint.Y - this.props.bindLink.endPoint.Y) + this.harfArrowWidth * 2

        canvas.width = width
        canvas.height = height

        let startX = this.props.bindLink.startPoint.X;
        let startY = this.props.bindLink.startPoint.Y;
        let endX = this.props.bindLink.endPoint.X;
        let endY = this.props.bindLink.endPoint.Y;
        let startPosition = (startX < endX ? 0 : 1) | (startY < endY ? 0 : 2)
        let endPosition = startPosition ^ 3

        let haw = this.harfArrowWidth

        //获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = canvas.getContext("2d");

        ctx.lineWidth = 2

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

        ctx.moveTo(points[0].x, points[0].y)
        points.forEach((value, _) => {
            ctx.lineTo(value.x, value.y)
        })

        //沿着坐标点顺序的路径绘制直线
        ctx.stroke();
        //关闭当前的绘制路径
        ctx.closePath();
    }
}

export default LinkedArrow;
