"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
var mergesort_1 = require("./mergesort");
var Tree = /** @class */ (function () {
    function Tree() {
    }
    Tree.prototype._removeDuplicates = function (sortedArr) {
        var previous = null;
        for (var i = 0; i < sortedArr.length; i++) {
            if (sortedArr[i] === previous) {
                sortedArr.splice(i, 1);
                i--;
            }
            else {
                previous = sortedArr[i];
            }
        }
        return sortedArr;
    };
    Tree.prototype.buildTree = function (arr) {
        var sortedArr = (0, mergesort_1.mergeSort)(arr);
        this._removeDuplicates(sortedArr);
        return sortedArr;
    };
    return Tree;
}());
exports.Tree = Tree;
