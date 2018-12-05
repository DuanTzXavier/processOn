import React, { Component } from 'react';
import './LinkedArrow.css'

class LinkedArrow extends Component {

    harfArrowWidth = 7

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            bindLink: this.props.bindLink,
        }
        console.log(this.props.bindLink)
        console.log("reactCallback1")
        this.props.bindLink.reactCallback(this.updateProps, this)
        this.initArrow = this.initArrow.bind(this)
    }

    updateProps(bindLink) {
        bindLink.that.setState({
            bindLink: bindLink,
        });
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
        var style = this.state.style;
        let _obj = JSON.stringify(style),
            objClone = JSON.parse(_obj);

        objClone.left = moveEvent.clientX - this.state.fromX + "px"

        objClone.top = moveEvent.clientY - this.state.fromY + "px"
        this.setState({
            style: objClone
        })
    }

    setStateFalse() {
        this.setState({
            isActive: false
        })
    }

    render() {
        // build div style
        let left = Math.min(this.state.bindLink.startPoint.X, this.state.bindLink.endPoint.X) - this.harfArrowWidth + "px"
        let top = Math.min(this.state.bindLink.startPoint.Y, this.state.bindLink.endPoint.Y) - this.harfArrowWidth + "px"

        let width = Math.abs(this.state.bindLink.startPoint.X - this.state.bindLink.endPoint.X) + this.harfArrowWidth * 2
        let height = Math.abs(this.state.bindLink.startPoint.Y - this.state.bindLink.endPoint.Y) + this.harfArrowWidth * 2

        var style = {
            left: left,
            top: top,
            width: width,
            height: height,
        }
        return (
            <div
                className="Linked-Arrow"
                onMouseDown={(e) => this.onMouseDown(e)}
                style={style}>

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

        //config params
        const isVertical = false

        //initParams
        let width = Math.abs(this.state.bindLink.startPoint.X - this.state.bindLink.endPoint.X) + this.harfArrowWidth * 2
        let height = Math.abs(this.state.bindLink.startPoint.Y - this.state.bindLink.endPoint.Y) + this.harfArrowWidth * 2

        canvas.width = width
        canvas.height = height
        let startX = this.state.bindLink.startPoint.X;
        let startY = this.state.bindLink.startPoint.Y;
        let endX = this.state.bindLink.endPoint.X;
        let endY = this.state.bindLink.endPoint.Y;
        let startPosition = (startX < endX ? 0 : 1) | (startY < endY ? 0 : 2)
        let endPosition = startPosition ^ 3

        let haw = this.harfArrowWidth

        //获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = canvas.getContext("2d");

        let points = []
        console.log("startPosition" + startPosition)
        console.log("endPosition" + endPosition)
        points[0] = {
            x: (startPosition & 1 == 1) ? (canvas.width - haw) : haw,
            y: startPosition < 2 ? haw : canvas.height - haw
        }

        points[1] = {
            x: isVertical ? (startPosition & 1 == 1) ? (canvas.width - haw) : haw : canvas.width / 2,
            y: isVertical ? canvas.height / 2 : startPosition < 2 ? haw : canvas.height - haw,
        }

        points[2] = {
            x: isVertical ? (startPosition & 1 == 1) ? haw : (canvas.width - haw) : canvas.width / 2,
            y: isVertical ? canvas.height / 2 : startPosition > 1 ? haw : canvas.height - haw,
        }

        points[3] = {
            x: (endPosition & 1 == 1) ? (canvas.width - haw) : haw,
            y: endPosition < 2 ? haw : canvas.height - haw
        }

        console.log(points)

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
