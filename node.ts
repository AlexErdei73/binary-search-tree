export class Node {
  private _value: number;
  private _leftNode: Node | null;
  private _rightNode: Node | null;
  constructor(value?: any, leftNode?: Node, rightNode?: Node) {
    this._value = value || null;
    this._leftNode = leftNode || null;
    this._rightNode = rightNode || null;
  }

  get value() {
    return this._value;
  }

  set value(data) {
    this._value = data;
  }

  get leftNode() {
    return this._leftNode;
  }

  set leftNode(node: Node | null) {
    this._leftNode = node;
  }

  get rightNode() {
    return this._rightNode;
  }

  set rightNode(node: Node | null) {
    this._rightNode = node;
  }
}
