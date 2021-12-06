import * as fs from 'fs';
import * as path from 'path';
import internal = require('stream');
import { isDataView } from 'util/types';

export interface IHashBingoCounter {
  [details: number] : number;
}

export interface IHashBingoCards {
  [details: number] : IHashBingoCounter;
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

function createFlatArray(array: string[][][]) {
  const flatArray : string[][] = [];
  for (let i in array) {
    flatArray.push(array[i].flat(1))
  }
  return flatArray
}
console.log(createFlatArray(array))

function getAllIndexes(arr: any[], val: any) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
  }
  return indexes;
}

function playBingo(flatArray: string[][], numbersDrawn: string[]) : [number[], number[], string[][], string[]] {
  let flatArrayBingoCards: string[][] = JSON.parse(JSON.stringify(flatArray));
  let playersBingoCards : IHashBingoCards = {}
  for (let i of Array.from(Array(flatArray.length).keys())) {
    let myDict : IHashBingoCounter = {}
    for (let i of Array.from(Array(10).keys())) {
      myDict[i] = 0
    }
    playersBingoCards[i] = myDict;
  }
  let playerGotBingoWhen : number[] = [];
  let lastDrawn : string[] = []
  for (let i in flatArray) {
    let flagStop = false;
    
    numbersDrawn.forEach((numberBall, nDrawn) => {
      const indexNumber = flatArray[i].findIndex(x => x === numberBall)
      if (indexNumber != -1  && flagStop == false) {
        const indexCol = indexNumber % 5
        const indexRow = ~~(indexNumber / 5)
        playersBingoCards[i][indexCol] += 1
        playersBingoCards[i][indexRow + 5] +=1
        const index = flatArrayBingoCards[i].findIndex(x => x === numberBall)
        if (index > -1) {
          flatArrayBingoCards[i].splice(index, 1);
        }
        if (playersBingoCards[i][indexCol] > 4 || playersBingoCards[i][indexRow + 5] > 4) {
          flagStop = true;
          playerGotBingoWhen.push(nDrawn)
          lastDrawn.push(numberBall)
        }
      }
    });
  };
  console.log(playerGotBingoWhen)
  const winners = getAllIndexes(playerGotBingoWhen, Math.min.apply(null, playerGotBingoWhen))
  const losers = getAllIndexes(playerGotBingoWhen, Math.max.apply(null, playerGotBingoWhen))
  console.log()
  return [winners, losers, flatArrayBingoCards, lastDrawn]
}

const flatArray = createFlatArray(array);
const [winners, losers, flatArrayBingoCards, lastDrawn] = playBingo(flatArray, numbersDrawn)
const winner = winners[0]
const loser = losers[0]
console.log(flatArrayBingoCards)
let sum = 0
flatArrayBingoCards[winner].forEach((n) => {
  sum += +n
})
console.log(sum * +lastDrawn[winner])
sum = 0
flatArrayBingoCards[loser].forEach((n) => {
  sum += +n
})
console.log(sum * +lastDrawn[loser])


