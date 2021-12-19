import * as fs from 'fs';
import * as path from 'path';

function countIncreasingDepth(input: Array<number>) {
  let prevDepth = undefined;
  let counter = 0;
  for (let depth of input){
    // Deal with the first measurement
    if (!prevDepth) {
      prevDepth = depth;
      continue;
    }
    // Count if depth is increasing
    if (depth > prevDepth) {
      counter++;
    }
    prevDepth = depth;
  }
  return counter
}

function countIncreasingDepthWindow(input: Array<number>) {
  let prevDepthWindow = 0;
  let counter = 0;
  for (let i in input){
    // Deal with the first (4) measurement
    if (+i < 3) {
      if (+i === 2) {
        prevDepthWindow = input[i] + input[+i-1] + input[+i-2]
      }
      continue;
    }
    // Count if depth is increasing
    let newDepthWindow = input[i] + input[+i-1] + input[+i-2]
    if (newDepthWindow > prevDepthWindow) {
      counter++;
    }
    prevDepthWindow = newDepthWindow;
  }
  return counter
}

function readData() {
  const filePath = path.join(__dirname.replace('_build', 'days'), 'data.txt');
  const file = fs.readFileSync(filePath,'utf8').split('\n').map(Number);
  return file
}

console.log(countIncreasingDepth(readData()))
console.log(countIncreasingDepthWindow(readData()))
