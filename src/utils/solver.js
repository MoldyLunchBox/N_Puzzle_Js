import pause, { getNeighbors, printPuzzle } from "./utils";
import { Node } from "./node"
import { is_solvable } from "./solvabilityChecker";
// const PriorityQueue = require('js-priority-queue');
 import PriorityQueue from "./prio";

const { log } = console

function verifyExistance(node, lookFor) {
    for (var i = 0; i < node.length; i++) {
        if (node[i].state.toString() === lookFor.toString()) {
            return (true)
        }
    }
    return false
}

function checkExistance(queue, lookFor) {
    for (element of queue) {
        console.log(element)
    }
    return false
}
function loading(iteration, load) {
    console.clear()
    if (iteration % 200 == 0)
        load += "."
    if (iteration % 800 == 0)
        load = "loading"
    console.log(load)
    return load
}
export class Solver {
    constructor(firstState, params) {
        this.params = params
        this.visited = new Set();
        if (this.params.dataStructure == "pQueue") {

            this.openList = new PriorityQueue();
            this.openList.enqueue(firstState);
        }
        else
            this.openList = [firstState]
        this.currentState = firstState
        this.visitedTimes = 0
        this.solved = false
        this.time = 0
        this.cSize = 0

    }
    start() {
        if (!is_solvable(this.currentState.state, this.currentState.goal, this.currentState.state.length)) {
            console.log("not solvable", this.openList[0].goal, this.openList[0].state.length)
        }
        else {
            const start = process.hrtime();

            var load = "loading"
            console.clear()
            while (1) {
                if (this.params.dataStructure == "pQueue") {
              
                 
                    this.currentState = this.openList.dequeue();
                }
                else {
                    // sort the open states acording to score after each loop iteration this results in always following the closest possible path
                    this.openList.sort((a, b) => a.score - b.score)
                  
                    const listSize =  this.openList.length
                    // save the first state with the lowest score and pop it from the open states list
                    this.currentState = this.openList.shift();
                    this.cSize = listSize < this.cSize ? this.cSize : listSize

                }
                
                // just a loading message
                // load = loading(this.visitedTimes, load)
                
                // check if the current state equals the goal state
                if (this.currentState.isGoal(this.currentState.goal)) {
                    log("found it");
                    this.solved = true
                    break
                }
                // since the current state is not the goal we add it to the visited list
                this.visited.add(this.currentState.state.toString());
                const subStates = this.currentState.getSubStates();		//generate substates

                // add each substate to open states list if it doesnt exist in the visited list and doesnt already exist in the open states
                for (const subState of subStates) {

                    if (this.visited.has(subState.toString())) {
                        continue;
                    }
                    const node = new Node(subState, this.currentState, this.currentState.goal, this.params)
                    if (this.params.dataStructure == "pQueue") {
                        
                        this.openList.enqueue(node);
                    }
                    else
                        this.openList.push(new Node(subState, this.currentState, this.currentState.goal, this.params));
                }
                this.visitedTimes += 1
            }
            this.time = process.hrtime(start);
            if (this.params.dataStructure == "pQueue")
                this.cSize = this.openList.maxOpen

        }
    }
}