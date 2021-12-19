import * as fs from 'fs';
import * as path from 'path';

function parseData(command: string) {
  const [direction, magnitude] = command.split(' ')
  return [direction, magnitude]
}

function readData() {
  const filePath = path.join(__dirname.replace('_build', 'days'), 'data.txt');
  const file = fs.readFileSync(filePath,'utf8').split('\n');
  return file
}

function getPosition(data: Array<string>) {
  let horPosition = 0
  let verPosition = 0
  for (let command of data) {
    let [direction, magnitude] = parseData(command)
    let magnitudeInt = Number(magnitude)
    if (direction === 'up') {
      verPosition -= magnitudeInt
    }
    else if (direction === 'down') {
      verPosition += magnitudeInt
    }
    else if (direction === 'forward') {
      horPosition += magnitudeInt
    }
  }
  return horPosition * verPosition
}

function getPositionWithAim(data: Array<string>) {
  let horPosition = 0
  let verPosition = 0
  let aim = 0
  for (let command of data) {
    let [direction, magnitude] = parseData(command)
    let magnitudeInt = Number(magnitude)
    if (direction === 'up') {
      aim -= magnitudeInt
    }
    else if (direction === 'down') {
      aim += magnitudeInt
    }
    else if (direction === 'forward') {
      horPosition += magnitudeInt
      verPosition += aim * magnitudeInt
    }
  }
  return horPosition * verPosition
}

console.log(getPosition(readData()))
console.log(getPositionWithAim(readData()))
