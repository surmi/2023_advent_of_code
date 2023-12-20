const fs = require('fs');

function run1star(inPath) {
    console.log('Day 1*');
    let data = undefined;
    try {
        data = fs.readFileSync(inPath, 'utf-8');
        
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

function toNum(str){
    if(str.length == 1){
        return parseInt(str);
    }
    else {
        switch (str) {
            case 'one':
                return 1;
                break;
            case 'two':
                return 2;
                break;
            case 'three':
                return 3;
                break;
            case 'four':
                return 4;
                break;
            case 'five':
                return 5;
                break;
            case 'six':
                return 6;
                break;
            case 'seven':
                return 7;
                break;
            case 'eight':
                return 8;
                break;
            case 'nine':
                return 9;
                break;
        }
    }
}

function run2star(inPath) {
    console.log('Day 1**');
    let data = undefined;
    try {
        data = fs.readFileSync(inPath, 'utf-8');
        
    } catch (err) {
        console.error(err);
    }
    const lines = data.split('\n');
    let ans = 0;
    const re = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;

    for (let i=0; i<lines.length; ++i){
        if (lines[i].length > 0){
            const res = [...lines[i].matchAll(re)]; 
            const first = toNum(res[0][1]);
            const last = toNum(res[res.length-1][1]);
            ans += first*10 + last;
        }
    }

    console.log(ans)
}

module.exports = {run1star, run2star};

