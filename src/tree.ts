import { Node } from "./node";
import { mergeSort } from "./mergesort";

interface FindResult {
  node: Node | null;
  parent: Node | null;
}

export class Tree {
  private _root = new Node();

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
        newNode.leftNode = null;
        newNode.rightNode = null;
      }
    } else {
      const mid = Math.floor(len / 2);
      newNode.value = sortedArr[mid];
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

  private _find(value: number, node: Node, parent: Node | null): FindResult {
    const result: FindResult = { node: null, parent: null };
    if (!node.value && node.value !== 0) return result;
    if (node.value === value) {
      result.node = node;
      result.parent = parent;
      return result;
    } else if (node.value > value) {
      if (node.leftNode) return this._find(value, node.leftNode, node);
    } else if (node.value < value) {
      if (node.rightNode) return this._find(value, node.rightNode, node);
    }
    return result;
  }

  find(value: number) {
    return this._find(value, this._root, null).node;
  }

  delete(value: number) {
    const { node, parent } = this._find(value, this._root, null);
    if (!node) return;

    if (!node.leftNode && !node.rightNode) {
      if (!parent) return;
      if (parent.leftNode?.value === value) parent.leftNode = null;
      else parent.rightNode = null;
      return;
    }

    if (node.leftNode && !node.rightNode) {
      if (!parent) {
        this._root = node.leftNode;
        return;
      }
      if (parent.leftNode?.value === value) {
        parent.leftNode = node.leftNode;
      } else {
        parent.rightNode = node.leftNode;
      }
      return;
    }

    if (!node.leftNode && node.rightNode) {
      if (!parent) {
        this._root = node;
        return;
      }
      if (parent.leftNode?.value === value) {
        parent.leftNode = node.rightNode;
      } else {
        parent.rightNode = node.rightNode;
      }
      return;
    }

    let substNode = node.rightNode as Node;
    let substParent = node;
    while (substNode.leftNode) {
      substParent = substNode;
      substNode = substNode.leftNode;
    }
    node.value = substNode.value;
    if (substParent.leftNode?.value === substNode.value)
      substParent.leftNode = null;
    else substParent.rightNode = null;
  }

  levelOrder(callback?: Function) {
    const queue: Node[] = [this._root];
    const result: number[] = [];
    let nextNode: Node;
    while (queue.length > 0) {
      nextNode = queue.shift() as Node;
      if (callback) callback(nextNode);
      else result.push(nextNode.value);
      if (nextNode.leftNode) queue.push(nextNode.leftNode);
      if (nextNode.rightNode) queue.push(nextNode.rightNode);
    }
    if (result.length > 0) return result;
  }

  levelOrderRecursive(
    levelNodes: Node[] = [this._root],
    callback?: Function
  ): number[] | undefined {
    if (levelNodes.length === 0) return;
    const nextLevelNodes: Node[] = [];
    const result: number[] = [];
    levelNodes.forEach((node) => {
      if (node.leftNode) nextLevelNodes.push(node.leftNode);
      if (node.rightNode) nextLevelNodes.push(node.rightNode);
      if (callback) callback(node);
      else result.push(node.value);
    });
    if (callback) this.levelOrderRecursive(nextLevelNodes, callback);
    else {
      const nextLevelResult = this.levelOrderRecursive(
        nextLevelNodes
      ) as number[];
      if (nextLevelResult) return result.concat(nextLevelResult);
      else return result;
    }
  }

  inorder(callback?: Function, node: Node | null = this._root) {
    if (!node) return;

    const result: number[] = [];
    if (callback) {
      this.inorder(callback, node.leftNode);
      callback(node);
      this.inorder(callback, node.rightNode);
    } else {
      this.inorder((node: Node) => result.push(node.value), node.leftNode);
      result.push(node.value);
      this.inorder((node: Node) => result.push(node.value), node.rightNode);
      return result;
    }
  }

  preorder(callback?: Function, node: Node | null = this._root) {
    if (!node) return;

    const result: number[] = [];
    if (callback) {
      callback(node);
      this.preorder(callback, node.leftNode);
      this.preorder(callback, node.rightNode);
    } else {
      result.push(node.value);
      this.preorder((node: Node) => result.push(node.value), node.leftNode);
      this.preorder((node: Node) => result.push(node.value), node.rightNode);
      return result;
    }
  }

  postorder(callback?: Function, node: Node | null = this._root) {
    if (!node) return;

    const result: number[] = [];
    if (callback) {
      this.postorder(callback, node.leftNode);
      this.postorder(callback, node.rightNode);
      callback(node);
    } else {
      this.postorder((node: Node) => result.push(node.value), node.leftNode);
      this.postorder((node: Node) => result.push(node.value), node.rightNode);
      result.push(node.value);
      return result;
    }
  }

  get root() {
    return this._root;
  }
}
