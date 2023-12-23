function run1star(inPath){
    console.log('Day 2*');
    let sum = 0;
   
    let lines;
    try {
        lines = require('fs').readFileSync(inPath, 'utf-8').split('\n');
    }
    catch (err){
        console.log(err);
    } 
    let limit = [12, 13, 14];//R G B
    for (let i=0;i<lines.length-1;++i){
        let line = lines[i];
        let rounds = line.split(':')[1].split(';');
        let accept = true;
        for (let j=0;j<rounds.length;++j){
            let rc = rounds[j].split(','); //division into colors per draw
            for(let k=0;k<rc.length;++k){
                let pair = rc[k].trimStart().split(',');
                for (let l=0;l<pair.length;++l){
                    // console.log(pair[l]);
                    if (
                       (pair[l].split(' ')[1] === 'red' && pair[l].split(' ')[0]>limit[0])
                       || (pair[l].split(' ')[1] === 'green' && pair[l].split(' ')[0]>limit[1]) 
                       || (pair[l].split(' ')[1] === 'blue' && pair[l].split(' ')[0]>limit[2]) 
                    ){
                        // console.log('fail');
                        accept = false;
                    }
                }
            }
        }
        if (accept){
            sum += parseInt(line.split(':')[0].split(' ')[1]); 
        }
    }
    console.log(sum);
    
}

function run2star(inPath){
    console.log('Day 2**'); let sum = 0;
    let lines;
    try {
        lines = require('fs').readFileSync(inPath, 'utf-8').split('\n');
    }
    catch (err){
        console.log(err);
    } 
    lines.pop(); // remove empty line at the end of the file
    console.log(lines[0]);
    // Game 1: 19 blue, 12 red; 19 blue, 2 green, 1 red; 13 red, 11 blue
    const result = lines
    .map((line) => {
        let game, content;
        [game, content] = line.split(':');
        let allColors= content.split(';').map((turn) =>{ // ' 19 blue, 12 red', ...
            return turn.split(',').map((draw) => {
                let color, num;
                [num, color] = draw.trimStart().split(' '); 
                return {// 'blue', 19
                    c:color,
                    n:parseInt(num)
                };
            });
        }).flat();
        const maxb = allColors
            .filter((draw) => draw.c === 'blue')
            .sort((a,b) => b.n - a.n)[0].n;
        const maxr = allColors
            .filter((draw) => draw.c === 'red')
            .sort((a,b) => b.n - a.n)[0].n;
        const maxg = allColors
            .filter((draw) => draw.c === 'green')
            .sort((a,b) => b.n - a.n)[0].n;
        
        return maxr*maxg*maxb;
    })
    .reduce((acc, cur) => acc + cur);
    console.log(result);
    
}

module.exports = {run1star, run2star}