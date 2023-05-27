import { Tree } from "./tree";
import { Node } from "./node";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree();
tree.buildTree(arr);
tree.prettyPrint();
console.log(tree.postorder());
console.log(tree.height(tree.find(67) as Node));
tree.insert(320);
console.log(tree.height(tree.find(67) as Node));
