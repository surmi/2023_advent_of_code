import { readFileSync } from "fs";

const srcInd = 1;
const destInd = 0;
const rngInd = 2;

function parseNums(s: string): number[]{
    return s.trim().split(' ').map((toConv) => parseInt(toConv)).filter((num)=>!isNaN(num));
}

function mapCat(s: string, input: string[], start: number): number[][]{
    let data = [];
    for (let i = start; i < input.length; ++i){
        if (input[i].includes(s)){
            i++;
            for (i; i <input.length; ++i){
                if (input[i] === ''){
                    break;
                }
                data.push(parseNums(input[i]));
            }
            break;
        }
    }
    return data.sort((a, b)=>b[1]-a[1]);
}

function useMap(source:number, selMap: number[][]){
    for (let line of selMap){
        if (source >= line[srcInd] && source <= (line[srcInd]+line[rngInd]-1)){
            return source-line[srcInd]+line[destInd];
        }
    }
    return source;
}

export function run1star(inPath: string){
    console.log("Day 5*");

    let lines = readFileSync(inPath, 'utf-8').split('\n');
    
    let start = 2;
    let seeds = parseNums(lines[0]);
    const seed2soil = mapCat("seed-to-soil", lines, start);
    start += seed2soil.length-1;
    const soil2fert = mapCat("soil-to-fertilizer", lines, start);
    start += soil2fert.length-1;
    const fert2water = mapCat("fertilizer-to-water", lines, start);
    start += fert2water.length-1;
    const water2light = mapCat("water-to-light", lines, start);
    start += water2light.length-1;
    const light2temp = mapCat("light-to-temperature", lines, start);
    start += light2temp.length-1;
    const temp2humid = mapCat("temperature-to-humidity", lines, start);
    start += temp2humid.length-1;
    const humid2loc = mapCat("humidity-to-location", lines, start);
    start += humid2loc.length-1;

    const res = seeds.map((seed) =>{
        let ans = useMap(seed, seed2soil);
        ans = useMap(ans, soil2fert);
        ans = useMap(ans, fert2water);
        ans = useMap(ans, water2light);
        ans = useMap(ans, light2temp);
        ans = useMap(ans, temp2humid);
        ans = useMap(ans, humid2loc);
        return ans;
    })

    console.log(Math.min(...res));
}

export function run2star(inPath: string){
    console.log("Day 5**");

    let lines = readFileSync(inPath, 'utf-8').split('\n');
    // console.log(lines[0]);
}