import * as fs from 'fs';
import * as path from 'path';

function readData() {
  const filePath = path.join(__dirname.replace('_build', 'days'), 'data.txt');
  const file = fs.readFileSync(filePath,'utf8').split(',').map(Number);
  return file
}

function simulateLaternfish(fishCounterArray: Array<number>, length: number) : [Array<number>, number] {
  
  for (let day=1; day<=256; day++) {
    let nNewFishBorn = 0 
    let nFishAfterBrith = 0 
    for (let i in fishCounterArray) {
      if (+i === 0) {
        nNewFishBorn += fishCounterArray[0]
        nFishAfterBrith += fishCounterArray[0]
        length += fishCounterArray[0]
        fishCounterArray[0] = 0
      }
      else {
        fishCounterArray[+i-1] = fishCounterArray[+i]
      }
    }
    fishCounterArray[8] = nNewFishBorn
    fishCounterArray[6] += nFishAfterBrith
  }
  return [fishCounterArray, length]
}

let fishCounter = new Array<number>(9).fill(0);
const data = readData()
for (let fish of data) {
  fishCounter[fish] ++
}

console.log(fishCounter)
console.log(simulateLaternfish(fishCounter, data.length))
