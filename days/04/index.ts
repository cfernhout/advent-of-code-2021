import * as fs from 'fs';
import * as path from 'path';
import internal = require('stream');
import { isDataView } from 'util/types';

export interface IHash {
  [details: number] : number;
}

function readData(): [string[], string[][][]] {
  const filePath = path.join(__dirname.replace('_build', 'days'), 'data.txt');
  const file = fs.readFileSync(filePath,'utf8').split('\n\n');
  const numbersDrawn = file[0].split(',')
  let array = [];
  for (let a of file.slice(1,file.length)) {
    let row = [];
    for (let r of a.split('\n')) {
      row.push(r.trim().replace(/  /gi, ' ').split(' '))
    }
    array.push(row);
  }
  return [numbersDrawn, array]
}
const [numbersDrawn, array] = readData()

const flatArray = array[0].flat(1);
const numberBall = "8"
let myDict : IHash = {}
for (let i of Array.from(Array(10).keys())) {
  myDict[i] = 0
}
for (let numberBall of numbersDrawn) {
  const indexNumber = flatArray.findIndex(x => x === numberBall)
  console.log(numberBall, indexNumber)
  if (indexNumber != -1) {
    const indexCol = indexNumber % 5
    const indexRow = ~~(indexNumber / 5)
    myDict[indexCol] += 1
    myDict[indexRow + 5] +=1
    if (myDict[indexCol] > 4 || myDict[indexRow + 5] > 4) {
      break
    }
  }
}

console.log(myDict)
console.log(numbersDrawn)
