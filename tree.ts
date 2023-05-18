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
    const newNode = new Node();

    if (len === 1) {
      newNode.value = sortedArr[0];
      newNode.leftNode = null;
      newNode.rightNode = null;
    } else {
      const mid = Math.floor(len / 2);
      newNode.value = sortedArr[mid];
      const leftArr = sortedArr.slice(0, mid);
      const rightArr = sortedArr.slice(mid + 1, len);
      newNode.leftNode = this._buildTree(leftArr);
      newNode.rightNode = this._buildTree(rightArr);
    }

    return newNode;
  }

  buildTree(arr: number[]) {
    const sortedArr = mergeSort(arr);
    this._removeDuplicates(sortedArr);

    return this._buildTree(sortedArr);
  }
}
