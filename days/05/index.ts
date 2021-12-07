import * as fs from 'fs';
import * as path from 'path';

function readData(): string[] {
  const filePath = path.join(__dirname.replace('_build', 'days'), 'data.txt');
  const file = fs.readFileSync(filePath,'utf8').split('\n');
  return file
}

const lines = readData()

function splitLineCommand(line: string): [number, number, number, number] {
  const [from, to] = line.split(' -> ');
  const [x1, y1] = from.split(',');
  const [x2, y2] = to.split(',');
  return [+x1, +y1, +x2, +y2] 
}

function getStepDirection(a: number, b: number) {
  if (a < b) {
    return (b-a)-(Math.abs(b-a)-1)
  }
  else if (a > b) {
    return (b-a)+(Math.abs(b-a)-1)
  }
  return 0
}

function getNumberOfSteps(a: number, b: number) {
  return (Math.abs(b-a))
}

function initializeOrIncrementMap(map: Map<string, number>, key: string) {
  const value = map.get(key)
  if (value) {
    map.set(key, value + 1)
  }
  else {
    map.set(key, 1)
  }
  return map
}

function drawLines(lines: string[]) {
  let map = new Map<string, number>();
  lines.forEach((line) => {
    let [x1, y1, x2, y2] = splitLineCommand(line);
    let key = `${x1},${y1}`
    if (x1 === x2) {
      let stepDir = getStepDirection(y1,y2)
      let nSteps = getNumberOfSteps(y1,y2)
      for (let i = 1; i < nSteps+2; i++) {
        map = initializeOrIncrementMap(map, key);
        key = `${x1},${y1+i*stepDir}`;
      }
    }
    else if (y1 === y2) {
      let stepDir = getStepDirection(x1,x2)
      let nSteps = getNumberOfSteps(x1,x2)
      for (let i = 1; i < nSteps+2; i++) {
        map = initializeOrIncrementMap(map, key);
        key = `${x1+i*stepDir},${y1}`;
      }
    }
    else if (x1 !== x2 && y1 !== y2) {
      let stepDirX = getStepDirection(x1,x2)
      let stepDirY = getStepDirection(y1,y2)
      let nSteps = getNumberOfSteps(y1,y2)
      for (let i = 1; i < nSteps+2; i++) {
        map = initializeOrIncrementMap(map, key);
        key = `${x1+i*stepDirX},${y1+i*stepDirY}`;
      }
      // console.log(x1, y1, x2, y2, stepDirX, stepDirY, nSteps)
    }
  })
  return map
} 

const map = drawLines(lines)

function getPeaksFromMap(map: Map<string, number>): number {
  return Array.from(map.values()).filter(x => x >= 2).length
}

const nPeaks = getPeaksFromMap(map)

// console.log(map)
console.log(nPeaks)
