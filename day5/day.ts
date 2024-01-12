import { readFileSync } from "fs";

const srcInd = 1;
const destInd = 0;
const rngInd = 2;
const modInd = 3;

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
                let fullRng = parseNums(input[i]);
                fullRng = [...fullRng, (fullRng[srcInd]-fullRng[destInd])];
                data.push(fullRng);
            }
            break;
        }
    }
    return data.sort((a, b)=>b[1]-a[1]);
}

function useMap(source:number, selMap: number[][]){
    for (let line of selMap){
        if (source >= line[srcInd] && source <= (line[srcInd]+line[rngInd]-1)){
            return source-line[modInd];
            // return source-line[srcInd]+line[destInd];
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

// function useMap2(src:number, checkRng:number[][]){
//     let ans = src;
//     for (let i=0; i<checkRng.length; ++i){
//         if (src >= checkRng[i][srcInd] && src < (checkRng[i][srcInd]+checkRng[i][rngInd])){
//             ans = src - checkRng[i][modInd];
//             break;
//         }
//     }
//     return ans
// }

export function run2star(inPath: string){
    console.log("Day 5**");

    let lines = readFileSync(inPath, 'utf-8').split('\n');

    const seedsLine = lines[0].split(":")[1].trim().split(' ');
    const seeds = [];
    for (let i=0; i< seedsLine.length/2; ++i){
        seeds.push([parseInt(seedsLine[2*i]), parseInt(seedsLine[2*i+1])]);
    }
    // seeds.sort((a,b) => a[0]-b[0])

    let start = 2;
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

    let res = Infinity;
    seeds.forEach((seedRng) =>{
        for (let s=seedRng[0]; s<(seedRng[0]+seedRng[1]);++s){
            const soil = useMap(s, seed2soil);
            const fert = useMap(soil, soil2fert);
            const water = useMap(fert, fert2water);
            const light = useMap(water, water2light);
            const temp = useMap(light, light2temp);
            const humid = useMap(temp, temp2humid);
            const loc = useMap(humid, humid2loc);
            if (loc < res) {
                res = loc;
            }
        }
    })
    console.log(res);
}