const fs = require('fs');

function run1star() {
    console.log('Day 1');
    let data = undefined;
    try {
        data = fs.readFileSync('./day1/input.txt', 'utf-8');
        
    } catch (err) {
        console.error(err);
    }
    const lines = data.split('\n');
    let ans = 0;
    lines.forEach((line) => {
        let num = new Array();
        for (character of line){
            if (character >= '0' && character <= '9') {num.push(parseInt(character));}
        }
        if (num.length >= 1){
            ans += num[0]*10 + num[num.length-1];
        }
    });
    console.log(ans)
}

function run() {
    console.log('Day 1');
    let data = undefined;
    try {
        data = fs.readFileSync('./day1/input.txt', 'utf-8');
        
    } catch (err) {
        console.error(err);
    }
    const lines = data.split('\n');
    let ans = 0;
    lines.forEach((line) => {
        let num = new Array();
        for (character of line){
            if (character >= '0' && character <= '9') {num.push(parseInt(character));}
        }
        if (num.length >= 1){
            ans += num[0]*10 + num[num.length-1];
        }
    });
    console.log(ans)
}

exports.run = run;

