/*
1. Understanding merge sort
Given the following list of numbers 21, 1, 26, 45, 29, 28, 2, 9, 
16, 49, 39, 27, 43, 34, 46, 40    length-> 16

What is the resulting list that will be sorted after 3 recursive
 calls to mergeSort?
What is the resulting list that will be sorted after 16 recursive
 calls to mergesort?
What are the first 2 lists to be merged?
Which two lists would be merged on the 7th merge?

*/
//mergeSort([21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40]);
function mergeSort(array) {   // 1, 21  26, 45  28, 29  2, 9      16, 49  27, 39 34, 43 40, 46
  if (array.length <= 1) {     
    return array;
  }

  const middle = Math.floor(array.length / 2);  // 9  // 45  // 1  // 21

  let left = array.slice(0, middle); // 21, 1, 26, 45, 29, 28, 2, 9   // 21, 1, 26, 45,  // 21, 1
  //console.log(left);
  let right = array.slice(middle, array.length); // 16, 49, 39, 27, 43, 34, 46, 40
  //console.log(right);
  left = mergeSort(left); // 21
  right = mergeSort(right);  // 1
  console.log(merge(left, right, array));
  return merge(left, right, array); // 1, 21
}

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

/*
➜  node drills.js
[ 1, 21 ]
[ 26, 45 ]
[ 1, 21, 26, 45 ]
[ 28, 29 ]
[ 2, 9 ]
[ 2, 9, 28, 29 ]
[
   1,  2,  9, 21,
  26, 28, 29, 45
]
[ 16, 49 ]
[ 27, 39 ]
[ 16, 27, 39, 49 ]
[ 34, 43 ]
[ 40, 46 ]
[ 34, 40, 43, 46 ]
[
  16, 27, 34, 39,
  40, 43, 46, 49
]
[
   1,  2,  9, 16, 21, 26,
  27, 28, 29, 34, 39, 40,
  43, 45, 46, 49
]
*/


// 2. Understanding quicksort

//(a.)
//After the first partition step has been completed, 
//the contents of the array is in the following order:
// 3 9 1 14 17 24 22 20

//----> The pivot could have been either 14 or 17 because
//they're both larger that the first few numbers in the array.


function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
      return array;
  }
  const middle = partition(array, start, end);
  console.log('middle:', middle)
  array = quickSort(array, start, middle);
  console.log('array fist half', array)
  array = quickSort(array, middle + 1, end);
  console.log('array second half', array)
  return array;
};

function partition(array, start, end) {
  const pivot = array[end - 1];
  console.log('pivot', pivot)
  let j = start;
  for (let i = start; i < end - 1; i++) {
      if (array[i] <= pivot) {
          swap(array, i, j);
          j++;
      }
  }
  swap(array, end-1, j);
  return j;
};

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
};

//quickSort([3, 9, 1, 14, 17, 24, 22, 20])

quickSort([14, 17, 13, 15, 19, 10, 3, 16, 9, 12]) 