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
  var horPosition = 0
  var verPosition = 0
  for (var command of data) {
    var [direction, magnitude] = parseData(command)
    if (direction === 'up') {
      verPosition -= Number(magnitude)
    }
    if (direction === 'down') {
      verPosition += Number(magnitude)
    }
    if (direction === 'forward') {
      horPosition += Number(magnitude)
    }
  }
  return horPosition * verPosition
}

console.log(getPosition(readData()))
// console.log(parseData('up 3'))
