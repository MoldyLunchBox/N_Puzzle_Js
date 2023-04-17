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
		puzzleSource: "file", // options: "auto" , "file"   
		puzzleSize: 3,
		greedy: true,
		uniform: false   

	}
	if (parameters.puzzleSource == "file")
		var initState = await loadInput("./src/file.txt")
		else {
			
			var generator = new puzzleGen(parameters.goalType, parameters.puzzleSize)
			generator.start()
			initState = generator.currentState
		}
		log(initState)
	if (initState) {

		const goal = goalGenerator(parameters.goalType, initState.length)
		// heuristics list: manhattan, misplaced.
		const node = new Node(initState, null,  goal, parameters)

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


