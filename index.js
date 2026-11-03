// Utility function to swap array elements
function swapElements(arr, firstIdx, secondIdx) {
    const temp = arr[firstIdx];
    arr[firstIdx] = arr[secondIdx];
    arr[secondIdx] = temp;
}

// Partition helper using Lomuto algorithm
function partitionArray(arr, low, high, isAscending) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        const condition = isAscending ? arr[j] <= pivot : arr[j] >= pivot;
        if (condition) {
            i++;
            swapElements(arr, i, j);
        }
    }
    swapElements(arr, i + 1, high);
    return i + 1;
}

// Sub-array recursive sorting method
function processQuickSort(arr, low, high, isAscending) {
    if (low < high) {
        const pivotPos = partitionArray(arr, low, high, isAscending);
        processQuickSort(arr, low, pivotPos - 1, isAscending);
        processQuickSort(arr, pivotPos + 1, high, isAscending);
    }
}

// Main QuickSort function accepting array and order flag
function quickSort(arr, isAscending = true) {
    processQuickSort(arr, 0, arr.length - 1, isAscending);
    return arr;
}

// Check array order (returns true if properly sorted, false otherwise)
function isArraySorted(arr, isAscending = true) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (isAscending && arr[i] > arr[i + 1]) return false;
        if (!isAscending && arr[i] < arr[i + 1]) return false;
    }
    return true;
}

// Algorithms from Practical Work #3
function bubbleSort(arr, isAscending = true) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            const check = isAscending ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1];
            if (check) swapElements(arr, j, j + 1);
        }
    }
    return arr;
}

function selectionSort(arr, isAscending = true) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let targetIndex = i;
        for (let j = i + 1; j < len; j++) {
            const check = isAscending ? arr[j] < arr[targetIndex] : arr[j] > arr[targetIndex];
            if (check) targetIndex = j;
        }
        if (targetIndex !== i) swapElements(arr, i, targetIndex);
    }
    return arr;
}

function insertionSort(arr, isAscending = true) {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        const val = arr[i];
        let j = i - 1;
        while (j >= 0 && (isAscending ? arr[j] > val : arr[j] < val)) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = val;
    }
    return arr;
}

// Generate random floating-point dataset
function makeRandomArray(count) {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push((Math.random() - 0.5) * 5000);
    }
    return result;
}

// Benchmark wrapper
function benchmark(sortFunc, data, isAscending) {
    const copy = [...data];
    const t0 = performance.now();
    sortFunc(copy, isAscending);
    const t1 = performance.now();
    const sorted = isArraySorted(copy, isAscending);
    return {
        time: (t1 - t0).toFixed(2),
        sorted: sorted
    };
}

// Execute benchmarks
function main() {
    const arraySizes = [1000, 10000, 100000];

    arraySizes.forEach(size => {
        console.log(`\n=== Array size: ${size} ===`);
        const dataset = makeRandomArray(size);

        const qsAsc = benchmark(quickSort, dataset, true);
        const qsDesc = benchmark(quickSort, dataset, false);

        console.log(`QuickSort (Ascending):  ${qsAsc.time} ms | Verified: ${qsAsc.sorted}`);
        console.log(`QuickSort (Descending): ${qsDesc.time} ms | Verified: ${qsDesc.sorted}`);

        if (size <= 10000) {
            const bs = benchmark(bubbleSort, dataset, true);
            const ss = benchmark(selectionSort, dataset, true);
            const is = benchmark(insertionSort, dataset, true);

            console.log(`BubbleSort:             ${bs.time} ms | Verified: ${bs.sorted}`);
            console.log(`SelectionSort:          ${ss.time} ms | Verified: ${ss.sorted}`);
            console.log(`InsertionSort:          ${is.time} ms | Verified: ${is.sorted}`);
        } else {
            console.log("O(n^2) sorting algorithms skipped for 100,000 items due to performance limitations.");
        }
    });
}

main();
