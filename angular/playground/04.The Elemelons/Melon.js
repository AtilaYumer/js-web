"use strict";
exports.__esModule = true;
exports.Melon = void 0;
var Melon = /** @class */ (function () {
    function Melon(weight, melonSort) {
        this.weight = weight;
        this.melonSort = melonSort;
    }
    Melon.prototype.getElementIndex = function () {
        return this.weight * this.melonSort.length;
    };
    Melon.prototype.toString = function () {
        return "Element: ".concat(this.getType(), "\nSort: ").concat(this.melonSort, "\nElement Index: ").concat(this.getElementIndex());
    };
    return Melon;
}());
exports.Melon = Melon;
