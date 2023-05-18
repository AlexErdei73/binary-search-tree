"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSort = void 0;
function merge(sortedLeftArr, sortedRightArr) {
    var i = 0;
    var j = 0;
    var sortedArr = [];
    while (sortedLeftArr[i] || sortedRightArr[j]) {
        var leftEl = sortedLeftArr[i];
        var rightEl = sortedRightArr[j];
        if (!leftEl) {
            sortedArr.push(rightEl);
            j++;
        }
        if (!rightEl) {
            sortedArr.push(leftEl);
            i++;
        }
        if (leftEl && rightEl) {
            if (leftEl < rightEl) {
                sortedArr.push(leftEl);
                i++;
            }
            else {
                sortedArr.push(rightEl);
                j++;
            }
        }
    }
    return sortedArr;
}
function mergeSort(arr) {
    var n = arr.length;
    if (n <= 1)
        return arr;
    var m = Math.floor(n / 2);
    var leftArr = arr.slice(0, m);
    var rightArr = arr.slice(m, n);
    var sortedLeftArr = mergeSort(leftArr);
    var sortedRightArr = mergeSort(rightArr);
    return merge(sortedLeftArr, sortedRightArr);
}
exports.mergeSort = mergeSort;
