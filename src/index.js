import { BloomFilter } from "bloomfilter";
import pause, { getNeighbors, printPuzzle } from "./utils/utils";
import { Node } from "./utils/node"
import { Solver } from "./utils/solver"
import { traceBack } from "./utils/traceBack"

const { log } = console


const EMPTY_TILE = 0;
function count_inversions(puzzle, solved, size) {
	let res = 0

	for (let i = 0; i < (size ** 2); i++) {
		for (let j = i + 1; j < (size ** 2); j++) {
			const [vi, vj] = [puzzle[i], puzzle[j]]
			if (solved.indexOf(vi) > solved.indexOf(vj))
				res++;
		}
	}
	return res;
}

function is_solvable(puzzle, solved, size) {
	solved = [].concat.apply([], solved).map(n => parseInt(n));
	puzzle = [].concat.apply([], puzzle).map(n => parseInt(n));
	const inversions = count_inversions(puzzle, solved, size),
		puzzle_zero_row = Math.floor(puzzle.indexOf(EMPTY_TILE) / size),
		puzzle_zero_column = puzzle.indexOf(EMPTY_TILE) % size,
		solved_zero_row = Math.floor(solved.indexOf(EMPTY_TILE) / size),
		solved_zero_column = solved.indexOf(EMPTY_TILE) % size,
		taxicab = Math.abs(puzzle_zero_row - solved_zero_row) + Math.abs(puzzle_zero_column - solved_zero_column)

	if (taxicab % 2 == 0 && inversions % 2 == 0)
		return true
	if (taxicab % 2 == 1 && inversions % 2 == 1)
		return true
	return false
}
function goalGenerator(size) {
	var flatGoal = []
	var arr2D = []
	for (var i = 0; i < size * size; i++) {
		flatGoal.push(i)
	}
	for (var i = 0; i < size; i++) {
		arr2D.push(flatGoal.slice(i * size, (i + 1) * size))
	}
	return arr2D
}
function create2DArray(size) {
	const arr = new Array(size);
	for (let i = 0; i < size; i++) {
	  arr[i] = new Array(size).fill(0);
	}
	return arr;
  }
function snail(size){
	var goal = create2DArray(size)
	goal[parseInt(size/2)][parseInt(size/2)] = 0
	var colInc = 1
	var rowInc = 1
	var col = 0
	var row = 0
	var step = 0
	while (steps < size * size){
		while(col < size && !goal[row][col]){
			goal[row][col] = step
			col += colInc
			step++
		}
		
		colInc *= -1

	}
	log(mold)
}
async function main() {
	const initState = [[4, 6, 2],
					   [1, 5, 8], 
					   [7, 3, 0]]

					   
					   // const initState = [ [ 1,  5,  2,  3],
					   // 					[ 4,  6,  0,  7], 
					   // 					[ 8,  9, 10, 11],
					   // 					[ 12, 13, 14, 15]]

	snail(4)
					   exit()
	const goal = goalGenerator(initState.length)

	// heuristics list: manhattan, misplaced.
	const node = new Node(initState, null, 0, goal, "manhattan")

	if (!is_solvable(initState, goal, initState.length)) {
		log(goal)
		console.log("not solvable")
		exit()
	}
	const solver = new Solver(node)
	solver.start()
	log("out completly")
	traceBack(solver.currentState)
	
	// node.getSubStates()
	// const bloomFilter = new BloomFilter(32 * 1024 * 40000, 32);
}
main()


