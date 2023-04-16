import { Node } from "./utils/node"
import { Solver } from "./utils/solver"
import { traceBack } from "./utils/traceBack"
import { goalGenerator } from "./utils/goalGenerator";
import loadInput from "./utils/readFile_parse";
import { puzzleGen } from "./utils/puzzleGenerator";

const { log } = console





async function main() {
	const parameters = {
		goalType: "zfirst",  // snail, zfirst
		heuristics: [ // manhattan, euclidean, misplaced
			"manhattan",
		],
		puzzleSource: "auto", // options: "auto" , "file"   
		puzzleSize: 3   
	}
	if (parameters.puzzleSource == "file")
		var initState = await loadInput("./src/file.txt")
	else {

		var generator = new puzzleGen("zfirst", parameters.puzzleSize)
		generator.start()
		initState = generator.currentState
	}
	if (initState) {

		const goal = goalGenerator(parameters.goalType, initState.length)
		// heuristics list: manhattan, misplaced.
		const node = new Node(initState, null, 0, goal, parameters.heuristics)

		//prepare a solver instance
		const solver = new Solver(node, parameters)
		// attempt to solvet he possible
		solver.start()
		// if the puzzle was solved, trace back the steps to print it
		if (solver.solved)
			traceBack(solver.currentState, solver)
	}
	else
		console.log("bad file parsing")

	// const bloomFilter = new BloomFilter(32 * 1024 * 40000, 32);
}
main()


