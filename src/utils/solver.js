import pause, { getNeighbors, printPuzzle } from "./utils";
import { Node } from "./node"

const {log} = console

function verifyExistance(node, lookFor) {
	for (var i = 0; i < node.length; i++) {
		if (node[i].state.toString() === lookFor.toString()) {
			return (true)
		}
	}
	return false
}

export class Solver {
    constructor(firstState){
        this.currentState = null
        this.visited = new Set();
        this.openList = [firstState]

    }
    start(){
        while (this.openList.length > 0) {
            this.openList.sort((a, b) => a.score - a.score)   // sort the open states acording to score after each loop iteration this results in always following the closest possible path
            this.currentState = this.openList.shift();			// save the first state with the lowest score and pop it from the open states list
            log("\n\n")
            printPuzzle(this.currentState.state, this.currentState.score, this.currentState.gscore)
            log("subStates")
            if (this.currentState.isGoal(this.currentState.goal)) {			// check if the current state equals the goal state
                log("found it");
                break
            }
            const subStates = this.currentState.getSubStates();		//generate substates
            console.log(subStates)
            for (const subState of subStates) {					//add each substate to open states list if it doesnt exist in the visited list and doesnt already exist in the open states
                
                if (this.visited .has(subState.toString())) {
                    continue;
                }
                if (!verifyExistance(this.openList, subState)) {
                    this.openList.push(new Node(subState, this.currentState, this.currentState.gscore + 1, this.currentState.goal));
                }
                
            }
            this.visited .add(this.currentState.state.toString());   // since the current state is not the goal we add it to the visited list
       
            log("\n\n")
        }
    }
}