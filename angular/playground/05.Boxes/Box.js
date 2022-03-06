"use strict";
exports.__esModule = true;
exports.Box = void 0;
var Box = /** @class */ (function () {
    function Box() {
        this.elements = [];
    }
    Box.prototype.add = function (element) {
        this.elements.unshift(element);
    };
    Box.prototype.remove = function () {
        return this.elements.shift();
    };
    Box.prototype.count = function () {
        return this.elements.length;
    };
    return Box;
}());
exports.Box = Box;
