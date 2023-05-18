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

  buildTree(arr: number[]) {
    const sortedArr = mergeSort(arr);
    return this._removeDuplicates(sortedArr);
  }
}
