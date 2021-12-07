import * as fs from 'fs';
import * as path from 'path';
import * as math from 'mathjs';

function readData() {
  const filePath = path.join(__dirname.replace('_build', 'days'), 'data.txt');
  const file = fs.readFileSync(filePath,'utf8').split(',').map(Number);
  return file
}

const data = readData()
const max = math.max(data) as number
const min = math.min(data) as number

let totalFuelMin = 1e9
for (let i=min; i<=max; i++) {
  const diff = math.subtract(data, i) as number[]
  const diffAbs = math.abs(diff) as number[]
  const totalFuel = math.sum(diffAbs) as number
  if (totalFuel < totalFuelMin) {
    totalFuelMin = totalFuel
  }
}
console.log(totalFuelMin)

// Part 2
function calculateSeries(n: number, mem: number[]): [number, number[]] {
  if (n === 0) {
    mem[0] = 0
    return [0, mem]
  }
  else if (n === 1) {
    mem[1] = 1
    return [1, mem]
  }
  const [nPrev, memPrev] = calculateSeries(n-1, mem)
  memPrev[n] = nPrev + n
  return [nPrev + n, memPrev]
}
const maxDiff = max - min
const [, series] = calculateSeries(maxDiff, Array<number>(maxDiff).fill(0))
console.log(series)

totalFuelMin = 1e9
for (let i=min; i<=max; i++) {
  const diff = math.subtract(data, i) as number[]
  const diffAbs = math.abs(diff) as number[]
  let totalFuel = 0
  for (let iDiffAbs of diffAbs) {
    totalFuel += series[iDiffAbs]
  }
  if (totalFuel < totalFuelMin) {
    totalFuelMin = totalFuel
  }
}
console.log(data)
console.log(totalFuelMin)
