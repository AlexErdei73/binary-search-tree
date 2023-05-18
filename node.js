"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
var Node = /** @class */ (function () {
    function Node(value, leftNode, rightNode) {
        this._value = value || null;
        this._leftNode = leftNode || null;
        this._rightNode = rightNode || null;
    }
    Object.defineProperty(Node.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (data) {
            this._value = data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "leftNode", {
        get: function () {
            return this._leftNode;
        },
        set: function (node) {
            this._leftNode = node;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "rightNode", {
        get: function () {
            return this._rightNode;
        },
        set: function (node) {
            this._rightNode = node;
        },
        enumerable: false,
        configurable: true
    });
    return Node;
}());
exports.Node = Node;
