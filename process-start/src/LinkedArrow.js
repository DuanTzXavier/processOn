import React, { Component } from 'react';
import './LinkedArrow.css'

class LinkedArrow extends Component {

    harfArrowWidth = 7

    constructor(props) {
        super(props);
        // this.props.bindLink.reactCallback(this.updateProps, this)
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

                <canvas id={this.props.bindLink.uniqueKey} />

            </div>
        );
    }

    componentDidMount() {
        this.initArrow()
    }

    componentDidUpdate() {
        this.initArrow()
    }

    initArrow() {
        const canvas = document.getElementById(this.props.bindLink.uniqueKey)

        //config params
        const isVertical = this.props.bindLink.isVertical

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
        ctx.fillStyle="green";
        ctx.fill();
        let points = []
        points[0] = {
            x: (startPosition & 1) === 1 ? (width - haw) : haw,
            y: startPosition < 2 ? haw : height - haw
        }

        points[1] = {
            x: isVertical ? (startPosition & 1) === 1? (width - haw) : haw : width / 2,
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
