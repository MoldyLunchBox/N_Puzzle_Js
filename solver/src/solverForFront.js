import { Node } from "./utils/node"
import { Solver } from "./utils/solver"
import { traceBack } from "./utils/traceBack"
import { goalGenerator } from "./utils/goalGenerator";

const { log } = console





export async function solverForFront(parameters, puzzle) {

    var initState = puzzle

    const goal = goalGenerator(parameters.goalType, initState.length)
    // heuristics list: manhattan, misplaced.
    const node = new Node(initState, null, goal, parameters)
    //prepare a solver instance
    const solver = new Solver(node, parameters)
    // attempt to solvet he possible
    solver.start()
    // if the puzzle was solved, trace back the steps to print it
    if (solver.solved)
        return traceBack(solver.currentState, solver, parameters)
    return null

}


