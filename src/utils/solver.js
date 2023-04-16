import pause, { getNeighbors, printPuzzle } from "./utils";
import { Node } from "./node"
import { is_solvable } from "./solvabilityChecker";

const { log } = console

function verifyExistance(node, lookFor) {
    for (var i = 0; i < node.length; i++) {
        if (node[i].state.toString() === lookFor.toString()) {
            return (true)
        }
    }
    return false
}

export class Solver {
    constructor(firstState, params) {
        this.params = params
        this.currentState = null
        this.visited = new Set();
        this.openList = [firstState]
        this.visitedTimes = 0
        this.solved = false


    }
    start() {
        if (!is_solvable(this.openList[0].state, this.openList[0].goal, this.openList[0].state.length)) {
            console.log("not solvable")
        }
        else {
            var loading = "loading"
            while (this.openList.length > 0) {
                console.clear()
                console.log(loading)
                // sort the open states acording to score after each loop iteration this results in always following the closest possible path
                if (this.visitedTimes % 200 == 0)
                    loading += "."
                if (this.visitedTimes % 800 == 0)
                    loading = "loading"
                this.openList.sort((a, b) => a.score - b.score)
                
                // save the first state with the lowest score and pop it from the open states list
                this.currentState = this.openList.shift();

                //printPuzzle(this.currentState.state, this.currentState.score, this.currentState.gscore)

                // check if the current state equals the goal state
                if (this.currentState.isGoal(this.currentState.goal)) {
                    log("found it");
                    this.solved = true
                    break
                }
                const subStates = this.currentState.getSubStates();		//generate substates

                //add each substate to open states list if it doesnt exist in the visited list and doesnt already exist in the open states
                for (const subState of subStates) {

                    if (this.visited.has(subState.toString())) {
                        continue;
                    }
                    if (!verifyExistance(this.openList, subState)) {
                        this.openList.push(new Node(subState, this.currentState, this.currentState.gscore + 1, this.currentState.goal, this.params.heuristics));
                    }
                }
                // since the current state is not the goal we add it to the visited list
                this.visited.add(this.currentState.state.toString());
                this.visitedTimes += 1
            }
        }
    }
}