"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LinkedArrow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Point = require("./Point.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkedArrow = exports.LinkedArrow = function () {
    function LinkedArrow(canvas, startPoint, endPoint) {
        _classCallCheck(this, LinkedArrow);

        this.canvas = canvas;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    _createClass(LinkedArrow, [{
        key: "drawArrow",
        value: function drawArrow() {
            var left = Math.min(this.startPoint.x, this.endPoint.x);
            var top = Math.min(this.startPoint.y, this.endPoint.y);

            var width = Math.abs(this.startPoint.x, this.endPoint.x);
            var height = Math.abs(this.startPoint.y, this.endPoint.y);

            var rootElement = document.createElement("div");
            rootElement.style = "position: absolute;left: " + left + "px;top: " + top + "px;width:" + width + "px;height:" + height + " px";
            rootElement.id = new Date().valueOf();
            rootElement.__startPositionX = left;
            rootElement.__startPositionY = top;
            //init原件背景
            var backgd = document.createElement("canvas");
            backgd.height = height;
            backgd.width = width;
            backgd.style = "position:absolute";
            drawCanvasLine(backgd, true);

            //组装所有布局
            this.canvas.appendChild(rootElement);
            rootElement.appendChild(backgd);
            rootElement.onclick = function (e) {
                // addContourForElement(rootElement.id)
            };

            console.log(height);
        }
    }], [{
        key: "getArrowWidth",
        value: function getArrowWidth() {
            return 20;
        }
    }]);

    return LinkedArrow;
}();

var startPoint = new _Point.Point(1, 2);
var endPoint = new _Point.Point(4, 5);
var canvas = document.createElement("canvas");
var drawer = new LinkedArrow(canvas, startPoint, endPoint);
drawer.drawArrow();
console.log(endPoint.x);