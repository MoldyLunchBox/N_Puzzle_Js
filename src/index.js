import { BloomFilter } from "bloomfilter";
import pause, { getNeighbors, printPuzzle } from "./utils/utils";
import { Node } from "./utils/node"
const { log } = console
function arrayEquals(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}
function verifyExistance(node, lookFor) {
	for (var i = 0; i < node.length; i++) {
		if (node[i].state.toString() === lookFor.toString()) {
			return (true)
		}
	}
	return false
}

function isSolvable(puzzleState, goal) {
	// Flatten the puzzle state into a 1-dimensional array
	const flattened = puzzleState.flat();
	// Count the number of inversions
	let inversions = 0;
	for (let i = 0; i < flattened.length - 1; i++) {
		for (let j = i + 1; j < flattened.length; j++) {
			if (flattened[i] > flattened[j] && flattened[i] !== 0 && flattened[j] !== 0) {
				console.log(flattened[i], flattened[j])
				inversions++;
			}
		}
	}
	console.log(inversions)
	exit()
	const blankRowFromBottom = Math.floor(flattened.indexOf(0) / puzzleState[0].length);
	if (puzzleState.length % 2 === 0) {
		return inversions % 2 === blankRowFromBottom % 2;
	} else {
		return inversions % 2 === 0;
	}
}


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
async function main() {
	const initState = [[1, 4, 2],
					   [6, 3, 5], 
					   [0, 7, 8]]

	// const initState = [ [ 1,  5,  2,  3],
	// 					[ 4,  6,  0,  7], 
	// 					[ 8,  9, 10, 11],
	// 					[ 12, 13, 14, 15]]
	const goal = goalGenerator(initState.length)
	// heuristics list: manhattan, misplaced.
	const node = new Node(initState, null, 0, goal, "manhattan")

	if (!is_solvable(initState, goal, initState.length)) {
		log(goal)
		console.log("not solvable")
		exit()
	}
	const visited = new Set();
	const openList = [node];
	console.log(goal.toString())
	var currentState = null
	var i = 0;
	while (openList.length > 0) {
		openList.sort((a, b) => a.score - a.score)   // sort the open states acording to score after each loop iteration this results in always following the closest possible path
		currentState = openList.shift();			// save the first state with the lowest score and pop it from the open states list
		log("\n\n")
		printPuzzle(currentState.state, currentState.score, currentState.gscore)
		log("subStates")
		if (currentState.isGoal(goal)) {			// check if the current state equals the goal state
			log("found it");
			break
		}
		const subStates = currentState.getSubStates();		//generate substates
		console.log(subStates)
		for (const subState of subStates) {					//add each substate to open states list if it doesnt exist in the visited list and doesnt already exist in the open states

			if (visited.has(subState.toString())) {
				continue;
			}
			if (!verifyExistance(openList, subState)) {
				openList.push(new Node(subState, currentState, currentState.gscore + 1, goal));
			}

		}
		visited.add(currentState.state.toString());   // since the current state is not the goal we add it to the visited list
		i++;
		log("\n\n")
	}
	log("out completly")
	var path = currentState
	i = 0
	while (path) {
		printPuzzle(path.state, path.score)
		path = path.parent
		i++
		await pause(2)
	}
	log("steps:", i)
	// node.getSubStates()
	// const bloomFilter = new BloomFilter(32 * 1024 * 40000, 32);
}
main()


