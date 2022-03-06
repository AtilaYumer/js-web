"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Melolemonmelon = exports.Airmelon = exports.Earthmelon = exports.Firemelon = exports.WaterMelon = void 0;
var Melon_1 = require("./Melon");
var WaterMelon = /** @class */ (function (_super) {
    __extends(WaterMelon, _super);
    function WaterMelon(weight, melonSort) {
        return _super.call(this, weight, melonSort) || this;
    }
    WaterMelon.prototype.getType = function () {
        return "Water";
    };
    WaterMelon.prototype.toString = function () {
        return _super.prototype.toString.call(this);
    };
    return WaterMelon;
}(Melon_1.Melon));
exports.WaterMelon = WaterMelon;
var Firemelon = /** @class */ (function (_super) {
    __extends(Firemelon, _super);
    function Firemelon(weight, melonSort) {
        return _super.call(this, weight, melonSort) || this;
    }
    Firemelon.prototype.getType = function () {
        return "Fire";
    };
    Firemelon.prototype.toString = function () {
        return _super.prototype.toString.call(this);
    };
    return Firemelon;
}(Melon_1.Melon));
exports.Firemelon = Firemelon;
var Earthmelon = /** @class */ (function (_super) {
    __extends(Earthmelon, _super);
    function Earthmelon(weight, melonSort) {
        return _super.call(this, weight, melonSort) || this;
    }
    Earthmelon.prototype.getType = function () {
        return "Earth";
    };
    Earthmelon.prototype.toString = function () {
        return _super.prototype.toString.call(this);
    };
    return Earthmelon;
}(Melon_1.Melon));
exports.Earthmelon = Earthmelon;
var Airmelon = /** @class */ (function (_super) {
    __extends(Airmelon, _super);
    function Airmelon(weight, melonSort) {
        return _super.call(this, weight, melonSort) || this;
    }
    Airmelon.prototype.getType = function () {
        return "Air";
    };
    Airmelon.prototype.toString = function () {
        return _super.prototype.toString.call(this);
    };
    return Airmelon;
}(Melon_1.Melon));
exports.Airmelon = Airmelon;
var Melolemonmelon = /** @class */ (function (_super) {
    __extends(Melolemonmelon, _super);
    function Melolemonmelon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.elemenets = ['Fire', 'Earth', 'Air', 'Water'];
        return _this;
    }
    Melolemonmelon.prototype.morph = function () {
        var element = this.elemenets.shift();
        this.elemenets.push(element);
        return element;
    };
    Melolemonmelon.prototype.toString = function () {
        return _super.prototype.toString.call(this);
    };
    return Melolemonmelon;
}(WaterMelon));
exports.Melolemonmelon = Melolemonmelon;
