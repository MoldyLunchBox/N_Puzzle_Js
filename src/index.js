import { Node } from "./utils/node"
import { Solver } from "./utils/solver"
import { traceBack } from "./utils/traceBack"
import { goalGenerator } from "./utils/goalGenerator";
import loadInput from "./utils/readFile_parse";

const { log } = console



async function main() {
	const initState = [ [ 2, 4, 3 ], 	
						[ 1, 7, 5 ], 
						[ 8, 0, 6 ] ]

	const parameters = {
		goalType: "snail",  // snail, zfirst, zlast
		heuristics: [ // manhattan, euclidean, misplaced
			"manhattan",
		]
	}

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
		
	// const bloomFilter = new BloomFilter(32 * 1024 * 40000, 32);
}
main()


