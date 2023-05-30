import { Tree } from "./tree";

function randomNumbers(
	maxNumberOfElements: number,
	highestNumber: number
): number[] {
	const result: number[] = [];
	const numberOfElements = Math.floor(Math.random() * maxNumberOfElements + 1);
	for (let i = 0; i < numberOfElements; i++) {
		result.push(Math.floor(Math.random() * highestNumber + 1));
	}
	return result;
}

function printTraversals() {
	console.log("Preorder traversal: ", tree.preorder());
	console.log("Inorder traversal: ", tree.inorder());
	console.log("Postorder traversal: ", tree.postorder());
}

function addNumbers(numberOfItems: number, lowest: number, highest: number) {
	for (let i = 0; i < numberOfItems; i++) {
		tree.insert(Math.floor(Math.random() * (highest - lowest) + lowest));
	}
}

const arr = randomNumbers(30, 100);
const tree = new Tree();
tree.buildTree(arr);
tree.prettyPrint();
console.log(`Is tree balanced: ${tree.isBalanced()}`);
printTraversals();
addNumbers(5, 101, 200);
tree.prettyPrint();
console.log(`Is tree balanced: ${tree.isBalanced()}`);
tree.rebalance();
tree.prettyPrint();
console.log(`Is tree balanced: ${tree.isBalanced()}`);
printTraversals();
