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

	private _buildTree(sortedArr: number[], parent: Node | null): Node {
		const len = sortedArr.length;
		let newNode: Node | null = new Node();

		if (len <= 1) {
			if (sortedArr[0] || sortedArr[0] === 0) newNode.value = sortedArr[0];
			else newNode = null;
			if (newNode) {
				newNode.parent = parent;
				newNode.leftNode = null;
				newNode.rightNode = null;
			}
		} else {
			const mid = Math.floor(len / 2);
			newNode.value = sortedArr[mid];
			newNode.parent = parent;
			const leftArr = sortedArr.slice(0, mid);
			const rightArr = sortedArr.slice(mid + 1, len);
			newNode.leftNode = this._buildTree(leftArr, newNode);
			newNode.rightNode = this._buildTree(rightArr, newNode);
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

		this._root = this._buildTree(sortedArr, null);
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
					node.parent = currentNode;
					done = true;
				} else currentNode = currentNode.leftNode as Node;
			} else if (currentNode.value < node.value) {
				if (!currentNode.rightNode) {
					currentNode.rightNode = node;
					node.parent = currentNode;
					done = true;
				} else currentNode = currentNode.rightNode;
			} else if (currentNode.value === node.value) done = true;
		}
	}

	private _find(value: number, node: Node): Node | null {
		if (!node.value && node.value !== 0) return null;
		if (node.value === value) return node;
		else if (node.value > value) {
			if (node.leftNode) return this._find(value, node.leftNode);
		} else if (node.value < value) {
			if (node.rightNode) return this._find(value, node.rightNode);
		}
		return null;
	}

	find(value: number) {
		return this._find(value, this._root);
	}

	delete(value: number) {
		const node = this.find(value);
		if (!node) return;

		if (!node.leftNode && !node.rightNode) {
			if (!node.parent) return;
			if (node.parent.leftNode?.value === value) node.parent.leftNode = null;
			else node.parent.rightNode = null;
			return;
		}

		if (node.leftNode && !node.rightNode) {
			if (!node.parent) {
				this._root = node.leftNode;
				node.leftNode.parent = null;
				return;
			}
			if (node.parent.leftNode?.value === value) {
				node.parent.leftNode = node.leftNode;
				node.leftNode.parent = node.parent;
			} else {
				node.parent.rightNode = node.leftNode;
				node.leftNode.parent = node.parent;
			}
			return;
		}

		if (!node.leftNode && node.rightNode) {
			if (!node.parent) {
				this._root = node;
				node.parent = null;
				return;
			}
			if (node.parent.leftNode?.value === value) {
				node.parent.leftNode = node.rightNode;
				node.rightNode.parent = node.parent;
			} else {
				node.parent.rightNode = node.rightNode;
				node.rightNode.parent = node.parent;
			}
			return;
		}

		let substitute = node.rightNode as Node;
		while (substitute.leftNode) {
			substitute = substitute.leftNode;
		}
		node.value = substitute.value;
		if ((substitute.parent as Node).leftNode?.value === substitute.value) {
			(substitute.parent as Node).leftNode = null;
		} else (substitute.parent as Node).rightNode = null;
	}

	get root() {
		return this._root;
	}
}
