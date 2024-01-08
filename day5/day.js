"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run2star = exports.run1star = void 0;
const fs_1 = require("fs");
function run1star(inPath) {
    console.log("Day 4*");
    let lines = (0, fs_1.readFileSync)(inPath, 'utf-8').split('\n');
    console.log(lines[0]);
}
exports.run1star = run1star;
function run2star(inPath) {
    console.log("Day 4**");
    let lines = (0, fs_1.readFileSync)(inPath, 'utf-8').split('\n');
    console.log(lines[0]);
}
exports.run2star = run2star;
