import pause, { getNeighbors, printPuzzle } from "./utils";
import { Node, createSubState, getIndex } from "./node"
import { is_solvable } from "./solvabilityChecker";
import { goalGenerator } from "./goalGenerator";

const { log } = console

function verifyExistance(node, lookFor) {
    for (var i = 0; i < node.length; i++) {
        if (node[i].state.toString() === lookFor.toString()) {
            return (true)
        }
    }
    return false
}
function getRandomInt(start, end) {
    // Add 1 to the range to include the end value
    const range = end - start + 1;
    // Generate a random number between 0 and 1
    const random = Math.random();
    // Scale the random nkumber to the desired range
    const randomNumber = Math.floor(random * range) + start;
    return randomNumber;
}


export class puzzleGen {
    constructor(type, size) {
        this.params = null
        this.currentState = goalGenerator(type, size)
        this.visitedTimes = 0
        this.solved = false
        this.mapSize = this.currentState.length


    }
    getSubStates() {
        const emptyIndex = getIndex(this.currentState, 0)
        var subStates = []
        if (emptyIndex.x > 0)
            subStates.push(createSubState(this.currentState, emptyIndex, "left"))
        if (emptyIndex.x < this.mapSize - 1)
            subStates.push(createSubState(this.currentState, emptyIndex, "right"))
        if (emptyIndex.y < this.mapSize - 1) {
            subStates.push(createSubState(this.currentState, emptyIndex, "down"))
        }
        if (emptyIndex.y > 0)
            subStates.push(createSubState(this.currentState, emptyIndex, "up"))
        return (subStates)
    }
    start() {
        var random = getRandomInt(200,2000)
        while (this.visitedTimes < random) {
            const subStates = this.getSubStates();		//generate substates
            this.currentState = subStates[getRandomInt(0, subStates.length - 1)]
            this.visitedTimes += 1
        }
    }

}