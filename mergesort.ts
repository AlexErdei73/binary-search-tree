function merge(sortedLeftArr: number[], sortedRightArr: number[]) {
  let i = 0;
  let j = 0;
  const sortedArr: number[] = [];
  while (sortedLeftArr[i] || sortedRightArr[j]) {
    const leftEl = sortedLeftArr[i];
    const rightEl = sortedRightArr[j];
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
      } else {
        sortedArr.push(rightEl);
        j++;
      }
    }
  }

  return sortedArr;
}

export function mergeSort(arr: number[]): number[] {
  const n = arr.length;
  if (n <= 1) return arr;

  const m = Math.floor(n / 2);

  const leftArr = arr.slice(0, m);
  const rightArr = arr.slice(m, n);

  const sortedLeftArr = mergeSort(leftArr);
  const sortedRightArr = mergeSort(rightArr);

  return merge(sortedLeftArr, sortedRightArr);
}
