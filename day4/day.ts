import { readFileSync } from "fs";

export function run1star(inPath:string){
    console.log("Day 4*");

    let lines = readFileSync(inPath, 'utf-8').split('\n');
    lines.pop();

    let res = lines.map((line) => {
        let [winNums, drawNums] = line.split(':')[1].split('|') // divide into two strings: wining numbers and drawn numbers
        .map((el) => { // obtain arrays of numbers out of strings
            return el.trim().split(' ')
            .map((ch) => {
                return parseInt(ch);
            })
            .filter((n) => !isNaN(n));
        })
        // check how many of drawn numbers are in the winning numbers
        let noMatched = drawNums.filter((n) => winNums.includes(n)).length-1;
        // return power of 2 or 0 depending on number of matched values
        if (noMatched >= 0){
            return Math.pow(2, noMatched);
        }
        else return 0;
    })
    .reduce((acc, cur) => acc += cur);
    console.log(res);
}

export function run2star(inPath:string){
    console.log("Day 4**");

    let lines = readFileSync(inPath, 'utf-8').split('\n');
    lines.pop();

    let copyArr = new Array(lines.length).fill(1);
    let res = lines.map((line, i) => {
        let [winNums, drawNums] = line.split(':')[1].split('|') // divide into two strings: wining numbers and drawn numbers
        .map((el) => { // obtain arrays of numbers out of strings
            return el.trim().split(' ')
            .map((ch) => {
                return parseInt(ch);
            })
            .filter((n) => !isNaN(n));
        })
        let noMatched = drawNums.filter((n) => winNums.includes(n)).length;
        // console.log(noMatched);
        if (noMatched > 0){
            let thisNoCopies = copyArr[i];
            // add copies to the copyArr
            for (let it = i+1; it<i+noMatched+1; ++it) {
                // console.log(`${it}: ${noMatched}`);
                copyArr[it] = copyArr[it] + thisNoCopies;
                
                // console.log(`${it}: ${copyArr[it]}`);
            }
        }
        return {
            winNums:winNums,
            drawNums:drawNums
        }
    });
    console.log(copyArr.reduce((acc, cur) => acc += cur));
    // console.log(res[0]);
}