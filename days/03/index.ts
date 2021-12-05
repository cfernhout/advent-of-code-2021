import * as fs from 'fs';
import * as path from 'path';

function readData() {
  const filePath = path.join(__dirname.replace('_build', 'days'), 'data.txt');
  const file = fs.readFileSync(filePath,'utf8').split('\n');
  return file
}

function toBinaryArray(array: Array<number>) {
  return array.map(m => {
    if (m > 0) {
      return 1;
    }
    else if (m < 0) {
      return 0;
    }
    throw new Error("Undecided");
  })
}

function countBinary(data: Array<string>) {
  
  const nBits = data[0].length;
  const length = data.length;
  let counter = Array<number>(nBits).fill(0);
  data.forEach(function (dataPoint) {
    for (let i = 0; i < nBits; i++) {
      let change = (dataPoint[i] === '1') ? 1 : -1;
      counter[i] += change
    }
  })
  const array1 = toBinaryArray(counter);
  const array2 = toBinaryArray(counter.map(x => x * -1));
  return [array1, array2]
}

function convertBinaryArrayToDecimal(binaryArray: Array<number>) {
  binaryArray = binaryArray.reverse();
  let sum = 0;
  for (let i = 0; i < binaryArray.length; i++) {
    sum += binaryArray[i] * 2 ** i;
  }
  return sum
}

const [binary1, binary2] = countBinary(readData());
const gammaRate = convertBinaryArrayToDecimal(binary1);
const epsilonRate = convertBinaryArrayToDecimal(binary2);
// console.log(binary1, binary2);
// console.log(gammaRate);
// console.log(epsilonRate);
// console.log(gammaRate * epsilonRate);

function countBinary1(data: Array<string>, flag: -1 | 1) {
  
  const nBits = data[0].length;
  
  for (let i = 0; i < nBits; i++) {
    console.log(i)
    console.log(data)
    if (data.length <= 1) {
      console.log('break')
      break
    }
    const allItems: Array<number> = []
    let counter = Array<number>(nBits).fill(0);
    for (let j = 0; j < data.length; j++) {
      let change = (data[j][i] === '1') ? 1 * flag : -1 * flag;
      counter[i] += change
      allItems.push(counter[i]);
    }
    console.log(allItems)
    let flagGreater = 0
    if (flag === -1) {
      flagGreater = 1
    }
    let xCommon = (allItems[allItems.length -1] >= flagGreater) ? '1' : '0';
    console.log(xCommon)
    data = data.filter(x => x[i] === xCommon) 
  }
  return data[0]
}

const oxygenGeneratorRating = convertBinaryArrayToDecimal(countBinary1(readData(), 1).split('').map(Number));
const co2ScrubberRating = convertBinaryArrayToDecimal(countBinary1(readData(), -1).split('').map(Number));
console.log(oxygenGeneratorRating, co2ScrubberRating, oxygenGeneratorRating * co2ScrubberRating)
