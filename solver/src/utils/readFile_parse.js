import fs from "fs";
import { parse } from "path";
import { goalGenerator } from "./goalGenerator";

function isNum(string) {
  if (!string.length)
    return null
  for (var i = 0; i < string.length; i++) {
    if ((string[i] < '0' || string[i] > '9') && string[i] != ' ')
      return null
  }
  return true
}

function correctPuzzle(puzzle) {
  const goal = goalGenerator("zfirst", puzzle.length)

  const flatGoal = goal.flat();
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle.length; j++) {
      if (flatGoal.indexOf(puzzle[i][j]) > -1)
        flatGoal.splice(flatGoal.indexOf(puzzle[i][j]), 1);

    }
  }
  if (flatGoal.length)
    return false
  return true
}

function stringToNumbers(string) {
  // making sure the string concists only of spaces and numbers
  if (!isNum(string))
    return null
  var arr = string.split(/ +/).map((e) => parseInt(e))
  return arr
}

export function parsePuzzle(file) {
  var puzzle = []
  if (file.length < 6)
    return null
  // first line must be a comment and second line must be the puzzle size
  if (file[0].trim()[0] != '#' || !isNum(file[1]))
    return null
  const size = parseInt(file[1].trim())
  for (var i = 2; i < file.length; i++) {
    const comment = file[i].indexOf("#")
    // converting each line into an array of numbers
    var intArray = stringToNumbers(file[i].slice(0, comment != -1 ? comment : file[i].length).trim())
    if (!intArray)
      break
    // adding each array of numbers to the 2 dimmensional array
    puzzle.push(intArray)
  }
  // size must be correct
  if (size != puzzle.length)
    return null
  // puzzle numbers must be uniaue and acording to the puzzle size
  if (!correctPuzzle(puzzle))
    return null
  return puzzle
}
function loadInput(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        console.log(err)
        reject(err);
      } else resolve(parsePuzzle(data.toString().split("\n")));
    });
  });
}

export default loadInput