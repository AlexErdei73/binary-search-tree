import { Tree } from "./tree";
import { Node } from "./node";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree();
tree.buildTree(arr);
tree.prettyPrint();
tree.insert(320);
tree.prettyPrint();
console.log(((tree.find(67) as Node).parent as Node).value);
