import React, { Component } from 'react';
import { ViewUtils } from './utils/ViewUtils'
import './LinkedArrow.css'

class LinkedArrow extends Component {
    constructor() {
        super();
        this.state = {
            isActive: false,
            startX: 0,
            startY: 0,
            fromX: 0,
            fromY: 0,
            style: {
                left: "146px",
                top: "156px",
                width: "16px",
                height: "16px"
            },
        }

        this.initArrow = this.initArrow.bind(this)
    }

    onMouseDown(e) {
        const clickEvent = window.event || e;
        const fromX = clickEvent.clientX - parseInt(this.state.style.left);
        const fromY = clickEvent.clientY - parseInt(this.state.style.top);
        this.setState({
            isActive: true,
            fromX: fromX,
            fromY: fromY,
        })

        document.onmousemove = e => this.setMoveLocation(e)

        document.onmouseup = () => this.setStateFalse()

    }

    setMoveLocation(event) {
        if (!this.state.isActive) {
            return
        }
        const moveEvent = window.event || event;

        var style = {
            left: moveEvent.clientX - this.state.fromX + "px",
            top: moveEvent.clientY - this.state.fromY + "px",
        }

        this.setState({
            style: style
        })
    }

    setStateFalse() {
        this.setState({
            isActive: false
        })
    }

    render() {
        return (
            <div
                className="Linked-Arrow"
                onMouseDown={(e) => this.onMouseDown(e)}
                style={this.state.style}>

                <canvas id="arrow_origin" />

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
        const canvas = document.getElementById("arrow_origin")
        canvas.width = parseInt(this.state.style.width)
        canvas.height = parseInt(this.state.style.height)

        //获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = canvas.getContext("2d");

        const LINE_WIDTH = 7;

        const isVertical = true;

        //如果 canvas 宽度大于 线宽则为折线，否则为直线
        if (canvas.width > LINE_WIDTH) {
            // //折线

            // /**
            //  * 设置参照物
            //  * 若为竖线，则base为高度
            //  * 若为横线，则base为宽度
            //  * 
            //  * reference > base时为单折线，
            //  *  |_______
            //  * 
            //  * base >= reference时为双折线
            //  * | 
            //  * |____
            //  *      |
            //  *      |
            //  */
            // var base = 0
            // var reference = 0
            // if (isVertical) {
            //     base = canvas.height
            //     reference = canvas.width
            // } else {
            //     base = canvas.width
            //     reference = canvas.height
            // }

            // if (base >= reference) {
            //     //双折线
            //     var startPoint = LINE_WIDTH / 2
            //     var halfPoint = base / 2
            //     var endPoint = reference - startPoint
            //     var point = getPointByIsVertical(startPoint, 0, isVertical)
            //     ctx.moveTo(point.x, point.y)

            //     point = getPointByIsVertical(startPoint, halfPoint, isVertical)
            //     ctx.lineTo(point.x, point.y)
            //     ctx.moveTo(point.x, point.y)

            //     point = getPointByIsVertical(endPoint, halfPoint, isVertical)
            //     ctx.lineTo(point.x, point.y)
            //     ctx.moveTo(point.x, point.y)

            //     point = getPointByIsVertical(endPoint, base, isVertical)
            //     ctx.lineTo(point.x, point.y)

            //     var angle = isVertical ? DOWN_ARROW : RIGHT_ARROW;
            //     drawLastArrow(ctx, point, angle)
            // } else {
            //     //单折线
            //     var startPoint = LINE_WIDTH / 2
            //     var halfPoint = base - startPoint
            //     var endPoint = reference
            //     var point = getPointByIsVertical(startPoint, 0, isVertical)
            //     ctx.moveTo(point.x, point.y)

            //     point = getPointByIsVertical(startPoint, halfPoint, isVertical)
            //     ctx.lineTo(point.x, point.y)
            //     ctx.moveTo(point.x, point.y)

            //     point = getPointByIsVertical(endPoint, halfPoint, isVertical)
            //     ctx.lineTo(point.x, point.y)
            //     var angle = isVertical ? RIGHT_ARROW : DOWN_ARROW;
            //     drawLastArrow(ctx, point, angle)
            // }
        } else {
            //直线
            ctx.moveTo(10, 0);
            ctx.lineTo(10, canvas.height);

            // point = getPointByIsVertical(10, canvas.height, isVertical)
            // var angle = isVertical ? DOWN_ARROW : RIGHT_ARROW;
            // drawLastArrow(ctx, point, angle)
        }
        //沿着坐标点顺序的路径绘制直线
        ctx.stroke();
        //关闭当前的绘制路径
        ctx.closePath();
    }
}

export default LinkedArrow;
