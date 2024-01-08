import { readFileSync } from "fs";

export function run1star(inPath: string){
    console.log("Day 4*");

    let lines = readFileSync(inPath, 'utf-8').split('\n');
    console.log(lines[0]);
}

export function run2star(inPath: string){
    console.log("Day 4**");

    let lines = readFileSync(inPath, 'utf-8').split('\n');
    console.log(lines[0]);
}