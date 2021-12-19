import {readFile} from "fs/promises";
import * as path from 'path'

async function main() {
  const filePath = path.join(__dirname.replace('_build', 'days'), 'data.txt');
	let input = (await readFile(filePath, "utf8")).trim().split("\n").map(e => e.split("-"));
	let paths: {[key: string]: string[]} = {};
	let visited: {[key: string]: boolean} = {};
	for (let path of input) {
		let [a, b] = path;
		if (!paths[a]) {
			paths[a] = [];
			visited[a] = false;
		}
		paths[a].push(b);
		if (!paths[b]) {
			paths[b] = [];
			visited[b] = false;
		}
		paths[b].push(a);
	}
	console.log("Answser to task 1:", findPossiblePaths(paths, visited, "start", true)[1].length);
  console.log("Answser to task 2:", findPossiblePaths(paths, visited, "start", false)[1].length);
}main();

function findPossiblePaths(paths: {[key: string]: string[]}, visited: {[key: string]: boolean}, current: string, visitedTwice: boolean): [number, string[][]] {
	if (current === "end") {
		return [0, [["end"]]];
	}
	let curVisited: {[key: string]: boolean} = { ...visited }; // ... spread operator  | { ...object } makes copy
	curVisited[current] = true;
	let sum = 0;
	let x:string[][] = [];
  for (let next of paths[current]) {
		if (next.toUpperCase() === next) {
			const cur = findPossiblePaths(paths, curVisited, next, visitedTwice);
			sum += cur[0] + 1;
			x.push(...cur[1].map(e => [current, ...e]));
		} 
    else if (!curVisited[next]) {
      if (next !== "start" && next !== "end") {
        const cur = findPossiblePaths(paths, curVisited, next, visitedTwice);
        sum += cur[0] + 1;
        x.push(...cur[1].map(e => [current, ...e]));
			}
      else {
        const cur = findPossiblePaths(paths, curVisited, next, visitedTwice);
        sum += cur[0] + 1;
        x.push(...cur[1].map(e => [current, ...e]));
      }
    }
    else if (next !== "start" && next !== "end" && !visitedTwice) {
      const cur = findPossiblePaths(paths, curVisited, next, true);
      sum += cur[0] + 1;
      x.push(...cur[1].map(e => [current, ...e]));
    }
	}
	return [sum - 1, x];
}
