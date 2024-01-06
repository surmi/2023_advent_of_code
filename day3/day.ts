import { readFileSync } from "fs";

interface Box{
    x0: number;
    x1: number;
}

function hitBoxSum(x0:number, x1:number, val:number, boxes:Box[]): number{
    let sum = 0;
    for (let b of boxes) {
        if (b.x0 > x1) {
            break;
        }
        else if (x0<=b.x1 && b.x0 <=x1){
            sum += val;
        }
    }
    return sum;
}

export function run1star(inPath:string){
    console.log("Day 3*");

    let lines = readFileSync(inPath, 'utf-8').split('\n');
    lines.pop();

    let reNums = /\d+/g; // regex for numbers
    let reSymb = /[^\d\.]/g;
    // let reSymb = /[^\d\.]/gd; // only for '.indices'
    let symBoxes = lines.map((line, i) => {
        //map special signs
        let boxes: Box[] = [];
        let ans;
        while (null !== (ans = reSymb.exec(line))){
            boxes.push({
                x0:ans.index-1,
                // x1:(ans.indices?.at(0)?.at(1))||0, // this method uses feature from ES2021
                x1:ans.index+1
            })
        }
        return boxes;
    })

    let res = lines.map((line, i) =>{
        // map numbers
        let lineSum = 0;
        let prevBoxes = symBoxes[i-1];
        let curBoxes = symBoxes[i];
        let nextBoxes = symBoxes[i+1];

        let toCheck = [];
        if (prevBoxes !== undefined) {
            toCheck.push(prevBoxes);
        }
        toCheck.push(curBoxes);
        if (nextBoxes !== undefined) {
            toCheck.push(nextBoxes);
        }

        let ans;
        while (null !== (ans = reNums.exec(line))){
            let x0 = ans.index;
            let x1 = x0+ans[0].length-1;
            for (let boxes of toCheck){
                lineSum += hitBoxSum(x0, x1, parseInt(ans[0]), boxes);
            }
        }
        return lineSum
    })
    .reduce((acc, cur) => acc + cur);
    console.log(res);
}

interface Num{
    x0:number;
    x1:number;
    val:number;
}
function hitNum(x0:number, x1:number, nums:Num[]): number[]{
    let hitNums:number[] = [];
    for (let n of nums) {
        if (n.x0 > x1) {
            break;
        }
        else if (x0<=n.x1 && n.x0 <=x1){
            hitNums.push(n.val);
        }
    }
    return hitNums;
}

export function run2star(inPath:string){
    console.log("Day 3**");

    let lines = readFileSync(inPath, 'utf-8').split('\n');
    lines.pop();

    // Find all numbers
    let reNums = /\d+/g; // regex for numbers
    let reStar = /\*/g; // regex for *
    let nums = lines.map((line) =>{
        let numArr:Num[] = [];
        let matched;
        while (null !== (matched = reNums.exec(line))){
            numArr.push({
                x0:matched.index,
                x1:matched.index+matched[0].length-1,
                val:parseInt(matched[0])
            })
        }
        return numArr;
    })
    // Find * and check if its box is hit by exactly two numbers; if yes, then multiply both numbers and add to the sum
    let res = lines.map((line, i)=>{
        let lineSum = 0;
        let prevNums = nums[i-1];
        let curNums = nums[i];
        let nextNums = nums[i+1];

        let toCheck = [];
        if (prevNums !== undefined){
            toCheck.push(prevNums);
        }
        toCheck.push(curNums);
        if (nextNums !== undefined){
            toCheck.push(nextNums);
        }

        let matched;
        while (null !== (matched = reStar.exec(line))){
            let x0 = matched.index-1;
            let x1 = matched.index+1;

            let numsPerStar:number[] = [];
            for (let n of toCheck) {
                numsPerStar.push(...hitNum(x0, x1, n));
            }
            numsPerStar.flat();
            if (numsPerStar.length === 2){
                lineSum += numsPerStar[0]*numsPerStar[1];
            }
        }
        return lineSum;
    }).reduce((acc, cur) => acc + cur);
    console.log(res);
}