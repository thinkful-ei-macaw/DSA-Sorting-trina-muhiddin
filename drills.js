const {LinkedList, display} = require('./linkedList');

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




*///BubbleSort

function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

function bubbleSort(array) {
    let swaps = 0;
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            swap(array, i, i + 1);
            swaps++;
        }
    }

    if (swaps > 0) {
        return bubbleSort(array);
    }
    return array;
};

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
  //console.log(merge(left, right, array));
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
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}

function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end-1, j);
  return j;
}

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

//quickSort([3, 9, 1, 14, 17, 24, 22, 20])

// quickSort([14, 17, 13, 15, 19, 10, 3, 16, 9, 12]); 

// 3. Implementing quicksort

// 6. Bucket sort  O(n)
// for non-negative                                                    
function bucketSort(array, lowest, highest) { // [2, 5, 24, 15, 1, 7, 42, 30]
  // O(n) complexity
  let n = Math.sqrt(array.length)
  let bucket = [];
  for(let i = 0, j=0; i < array.length; i++) { 
    bucket[j].push(array[i]) // [undefined, udefined, 2, ...undefined, 42]
    if (i == n-1) {
      j++
    }
  }
  for(let k = 0; k < bucket.length; k++) { 
    bucket[array[k]] = array[k]; 
  }


  return bucket.filter(e => e !== undefined);
}

// 7. Sort in place

function shuffleRandomly(array) {
  for (let i = 0; i<array.length; i++) {
    let randomIndex = Math.floor(Math.random() * array.length);
    let temp = array[i]
    array[i] = array[randomIndex]
    array[randomIndex] = temp
  }
  return array;
}


// 8. Sorting Books

function sortBooks(books) {
  return bubbleSort(books)
}

function main() {
  let dataString = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5';
  const data = dataString.split(' ').map((el) => Number(el));
  // console.log('Quick sort:', quickSort(data));
  // console.log('Merge Sort:', mergeSort(data));

  const SLL = new LinkedList();
  SLL.insertLast(24);
  SLL.insertLast(5);
  SLL.insertLast(21);
  SLL.insertLast(50);
  SLL.insertLast(13);

  //console.log(display(SLL));
  // console.log(mergeSort(display(SLL)));
  //console.log(bucketSort([2, 24, 0, 1, 7, 42, 30], 1, 42));

  //console.log(shuffleRandomly([2, 24, 0, 1, 7, 42, 30]))

  let books = ['apple', 'zebra', 'muffins', 'kangaroo']
  console.log(sortBooks(books))
}

main();