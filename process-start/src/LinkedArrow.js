import React, { Component } from 'react';
import './LinkedArrow.css'

class LinkedArrow extends Component {

    harfArrowWidth = 7

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            bindLink: this.props.bindLink,
            style: {
                left: "146px",
                top: "156px",
                width: "10px",
                height: "16px"
            },
        }
        console.log(this.props.bindLink)
        console.log("reactCallback1")
        this.props.bindLink.reactCallback(this.updateProps, this)
        this.initArrow = this.initArrow.bind(this)
    }

    updateProps(bindLink){
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
        canvas.width = parseInt(this.state.style.width)
        canvas.height = parseInt(this.state.style.height)

        //获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = canvas.getContext("2d");

        const LINE_WIDTH = 7;

        const isVertical = true;

        //如果 canvas 宽度大于 线宽则为折线，否则为直线
        if (canvas.width > LINE_WIDTH) {
            ctx.moveTo(10, 0);
            ctx.lineTo(10, canvas.height);
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
