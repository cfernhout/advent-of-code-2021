import * as fs from 'fs';
import * as path from 'path';

function countIncreasingDepth(input: Array<number>) {
  var prevDepth = undefined;
  var counter = 0;
  for (var depth of input){
    // Deal with the first measurement
    if (prevDepth === undefined) {
      prevDepth = depth;
      continue;
    }
    // Count if depth is increasing
    if (depth > prevDepth) {
      counter += 1;
    }
    prevDepth = depth;
  }
  return counter
}

function countIncreasingDepthWindow(input: Array<number>) {
  var prevDepthWindow = 0;
  var counter = 0;
  for (var i in input){
    // Deal with the first (4) measurement
    if (+i < 3) {
      if (+i === 2) {
        prevDepthWindow = input[i] + input[+i-1] + input[+i-2]
      }
      continue;
    }
    // Count if depth is increasing
    var newDepthWindow = input[i] + input[+i-1] + input[+i-2]
    if (newDepthWindow > prevDepthWindow) {
      counter += 1;
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
