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

export function verifyPuzzle(puzzle) {
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

