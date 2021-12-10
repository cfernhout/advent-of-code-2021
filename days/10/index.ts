import * as fs from 'fs'
import { add } from 'mathjs';
import * as path from 'path'

function readData () {
  const filePath = path.join(__dirname.replace('_build', 'days'), 'data.txt');
  const file = fs.readFileSync(filePath,'utf8').split('\n')
  return file
}

function compareNumbers(a: number, b: number) {
  return b - a;
}

export interface IHashStrintString {
  [detail: string]: string
}
const bracketMap: IHashStrintString = {}
bracketMap[")"] = "("
bracketMap["]"] = "["
bracketMap["}"] = "{"
bracketMap[">"] = "<"

export interface IHashStrintNumber {
  [detail: string]: number
}
const bracketClosePointsMap: IHashStrintNumber = {}
bracketClosePointsMap[")"] = 3
bracketClosePointsMap["]"] = 57
bracketClosePointsMap["}"] = 1197
bracketClosePointsMap[">"] = 25137
const bracketAdditionalPointsMap: IHashStrintNumber = {}
bracketAdditionalPointsMap["("] = 1
bracketAdditionalPointsMap["["] = 2
bracketAdditionalPointsMap["{"] = 3
bracketAdditionalPointsMap["<"] = 4

const data = readData()
let illigalBracketSum = 0
let additionalBracket = Array<number>(data.length).fill(0)

for (let i in data) {
  let row = data[i]
  let bracketQueue = []
  let illigalBracketFlag = false
  for (let bracket of row) {
    if ("[({<".includes(bracket)) {
      bracketQueue.push(bracket)
    }
    if ("])}>".includes(bracket)) {
      let latestBracket = bracketQueue.pop()
      if (latestBracket === undefined) {
        console.log("Empty queue", bracket)
        illigalBracketFlag = true
      }
      else if (latestBracket !== bracketMap[bracket]) {
        illigalBracketSum += bracketClosePointsMap[bracket]
        illigalBracketFlag = true
      }
    }
  }
  if (illigalBracketFlag === false) {
    console.log(bracketQueue)
    for (let bracket of bracketQueue.reverse()) {
      additionalBracket[i] = additionalBracket[i] * 5 + bracketAdditionalPointsMap[bracket]
    }
  }
}

function getMiddleScore(additionalBracket: number[]) {
  const additionalBracketFilteredSorted = additionalBracket.filter(x => x > 0).sort(compareNumbers)
  const n = additionalBracketFilteredSorted.length
  const middle = Math.floor(n/2)
  return additionalBracketFilteredSorted[middle]
}

console.log(illigalBracketSum)
console.log(getMiddleScore(additionalBracket))
