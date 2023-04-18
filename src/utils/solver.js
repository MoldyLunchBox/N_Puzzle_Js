import pause, { getNeighbors, printPuzzle } from "./utils";
import { Node } from "./node"
import { is_solvable } from "./solvabilityChecker";
const PriorityQueue = require('js-priority-queue');
// import PriorityQueue from "./priorityQueue";

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

            this.openList = new PriorityQueue({
                comparator: (a, b) => a.score - b.score
            });
            this.openList.queue(firstState);
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

        // class Test {
        //     constructor(str, priority) {
        //       this.str = str;
        //       this.priority = priority;
        //     }
        //   }

        //   const test = new PriorityQueue();
        //   test.queue(new Test(test, 1));
        //   test.queue(new Test("yo", 2));

        //   console.log(test.priv.data[1])
        // exit()
        if (!is_solvable(this.currentState.state, this.currentState.goal, this.currentState.state.length)) {
            console.log("not solvable", this.openList[0].goal, this.openList[0].state.length)
        }
        else {
            const start = process.hrtime();

            var load = "loading"
            console.clear()
            console.log("here we go ----------------------------------------------------------------------------------------------------------------------------------------------")
            while (1) {
                if (this.params.dataStructure == "pQueue") {
              

                    const queueSize = this.openList.length
                    this.cSize = queueSize < this.cSize ? this.cSize : queueSize
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
                load = loading(this.visitedTimes, load)

                // check if the current state equals the goal state
                if (this.currentState.isGoal(this.currentState.goal)) {
                    log("found it");
                    this.solved = true
                    break
                }
                const subStates = this.currentState.getSubStates();		//generate substates

                // add each substate to open states list if it doesnt exist in the visited list and doesnt already exist in the open states
                for (const subState of subStates) {

                    if (this.visited.has(subState.toString())) {
                        continue;
                    }
                    if (this.params.dataStructure == "pQueue") {
                        if ((this.params.verifyStateExistence && !verifyExistance(this.openList.priv.data, subState)) || !this.params.verifyStateExistence)
                        this.openList.queue(new Node(subState, this.currentState, this.currentState.goal, this.params));
                    }
                    else if ((!verifyExistance(this.openList, subState)))
                        this.openList.push(new Node(subState, this.currentState, this.currentState.goal, this.params));
                   
                }
                // since the current state is not the goal we add it to the visited list
                this.visited.add(this.currentState.state.toString());
                this.visitedTimes += 1
            }
            this.time = process.hrtime(start);

        }
    }
}