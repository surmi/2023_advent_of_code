const process = require('node:process');
const fs = require('fs');

console.log("Advent of Code 2023")

let daysDir = new Array();
fs.readdirSync('.').forEach(file => {
    if (file.includes('day')) {
        daysDir.push(file);
    }
})
daysDir.sort()

if (process.argv.length == 2) {
    const recent = daysDir[daysDir.length-1];
    const d = require(`./${recent}/day`);
    d.run1star('./day2/input.txt');
    d.run2star('./day2/input.txt');
}