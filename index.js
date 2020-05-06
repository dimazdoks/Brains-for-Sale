const data = require('./data.json');

// *** fuunction attempt *** //
function attempt(available, allowed, preferred) {
    let first_intersection_len = 0;

    let [intersection, difference] = intersectionOfTwoArrays(available, allowed);
    if (intersection.length === 0) return [];
    else first_intersection_len = intersection.length;

    [intersection, difference] = intersectionOfTwoArrays(intersection, preferred);
    let i = 0;

    if (intersection.length < preferred.length && preferred.length <= first_intersection_len) {
        let index = binSearch(intersection, difference[preferred.length - intersection.length - 1]);
        intersection.splice(index, 0, difference[preferred.length - intersection.length - 1]);
    }
    return intersection;
}

function binSearch(arr, el) {
    let start = 0;
    let end = arr.length - 1;

    while (start < end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] < el)
            start = mid + 1;
        else
            end = mid - 1;
    }

    if (arr[start] < el) start++;
    return start;
}

function intersectionOfTwoArrays(arr1, arr2) {
    const len1 = arr1.length;
    const len2 = arr2.length;
    let result = [];
    let other = [];
    let i = 0;
    let j = 0;
    let last_pushed = null;

    while (i < len1 && j < len2) {
        if (arr2[j] === 'any') return [arr1, []];
        else if (arr1[i] === arr2[j]) {
            if (arr2[j] === last_pushed) {
                i++;
                j++;
            } else {
                result.push(arr1[i]);
                last_pushed = arr1[i];
                i++;
                j++;
            }
        } else {
            other.push(arr1[i]);
            if (arr1[i] < arr2[j])
                i++;
            else
                j++;
        }
    }
    return [result, other];
}

// *** testing *** //


function test(data) {
    let i = 1;

    data.forEach(ob => {
        let arr = attempt(ob.available, ob.allowed, ob.preferred);

        if (arr.length === ob.result.length && ob.result.every((el, i) => el === arr[i])) {
            console.log("\x1b[32m", `Test #${i} accepted.`);
        } else {
            console.log("\x1b[31m", `Test #${i} is not accepted!!!`);

            console.log("\x1b[0m Test data: ");
            console.log(ob);

            console.log("\x1b[0m My result: ");
            console.log(arr);
        }
        i++;
    });
}

test(data);