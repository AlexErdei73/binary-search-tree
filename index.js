"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tree_1 = require("./tree");
var arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
var tree = new tree_1.Tree();
console.log(tree.buildTree(arr));
