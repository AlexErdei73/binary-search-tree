import { Node } from "./node";
import { mergeSort } from "./mergesort";

export class Tree {
	private _root: Node;

	private _removeDuplicates(sortedArr: number[]) {
		let previous: number | null = null;
		for (let i = 0; i < sortedArr.length; i++) {
			if (sortedArr[i] === previous) {
				sortedArr.splice(i, 1);
				i--;
			} else {
				previous = sortedArr[i];
			}
		}
		return sortedArr;
	}

	private _buildTree(sortedArr: number[]): Node {
		const len = sortedArr.length;
		let newNode: Node | null = new Node();

		if (len <= 1) {
			if (sortedArr[0] || sortedArr[0] === 0) newNode.value = sortedArr[0];
			else newNode = null;
			if (newNode) {
				newNode.leftNode = null;
				newNode.rightNode = null;
			}
		} else {
			const mid = Math.floor(len / 2);
			newNode.value = sortedArr[mid];
			const leftArr = sortedArr.slice(0, mid);
			const rightArr = sortedArr.slice(mid + 1, len);
			newNode.leftNode = this._buildTree(leftArr);
			newNode.rightNode = this._buildTree(rightArr);
		}

		return newNode as Node;
	}

	prettyPrint(node = this._root, prefix = "", isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.rightNode !== null) {
			this.prettyPrint(
				node.rightNode,
				`${prefix}${isLeft ? "│   " : "    "}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
		if (node.leftNode !== null) {
			this.prettyPrint(
				node.leftNode,
				`${prefix}${isLeft ? "    " : "│   "}`,
				true
			);
		}
	}

	buildTree(arr: number[]) {
		const sortedArr = mergeSort(arr);
		this._removeDuplicates(sortedArr);

		this._root = this._buildTree(sortedArr);
		return this._root;
	}

	insert(value: number) {
		const node = new Node(value);
		let currentNode = this._root;
		let done = false;
		while (!done) {
			if (currentNode.value > node.value) {
				if (!currentNode.leftNode) {
					currentNode.leftNode = node;
					done = true;
				} else currentNode = currentNode.leftNode as Node;
			} else if (currentNode.value < node.value) {
				if (!currentNode.rightNode) {
					currentNode.rightNode = node;
					done = true;
				} else currentNode = currentNode.rightNode;
			} else if (currentNode.value === node.value) done = true;
		}
	}

	delete;
}
