import { readFileSync } from "fs";

export function run1star(inPath:string){
    console.log("Day 3*");

    let lines;
    try {
        lines = readFileSync(inPath, 'utf-8').split('\n');

        console.log(lines.length)
    }
    catch (err) {
        console.log(err);
    }
}

export function run2star(inPath:string){
    console.log("Day 3**");
}