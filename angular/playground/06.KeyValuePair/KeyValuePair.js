"use strict";
exports.__esModule = true;
exports.KeyValuePair = void 0;
var KeyValuePair = /** @class */ (function () {
    function KeyValuePair() {
    }
    KeyValuePair.prototype.setKeyValuePair = function (key, value) {
        this.key = key;
        this.value = value;
    };
    KeyValuePair.prototype.display = function () {
        console.log("key = ".concat(this.key, ", value = ").concat(this.value));
    };
    return KeyValuePair;
}());
exports.KeyValuePair = KeyValuePair;
