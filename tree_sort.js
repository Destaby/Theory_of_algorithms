'use strict';

const output = {};

function mergeSort(unsortedArray) {
  // No need to sort the array if the array only has one element or empty
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }
  // In order to divide the array in half, we need to figure out the middle
  const middle = Math.floor(unsortedArray.length / 2);

  // This is where we will be dividing the array into left and right
  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);

  // Using recursion to combine the left and right
  return merge(
    mergeSort(left), mergeSort(right)
  );
}

// Merge the two arrays: left and right
function merge(left, right) {
  const resultArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // We will concatenate values into the resultArray in order
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++; // move left array cursor
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++; // move right array cursor
    }
  }

  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

class Tree {
  constructor() {
    this.first = null;
    this.last = null;
  }

  put(item) {
    const sortedArr = mergeSort(item);
    const medians = { ourArray: item };
    if (sortedArr.length % 2 === 0) {
      const i = sortedArr.length / 2 - 1;
      medians.firsMedian = sortedArr[i];
      medians.secondMedian = sortedArr[i + 1];
    } else {
      const i = (sortedArr.length - 1) / 2;
      medians.Median = sortedArr[i];
    }
    output[`${item.length}`] = medians;
    const last = this.last;
    const element = { next: null, item };
    if (last) {
      last.next = element;
      this.last = element;
    } else {
      this.first = element;
      this.last = element;
    }
  }

  pick() {
    const element = this.first;
    if (!element) return null;
    if (this.last === element) {
      this.first = null;
      this.last = null;
    } else {
      this.first = element.next;
    }
    return element.item;
  }
}

const tree = new Tree();

function putter(arr) {
  for (let i = 1; i < arr.length; i++) {
    const unsortedArr = arr.slice(0, i);
    tree.put(unsortedArr);
  }
}

const array = [30, 19, 9, 15, 55, 24, 3, 78, 46, 41];

putter(array);

console.log(output);

