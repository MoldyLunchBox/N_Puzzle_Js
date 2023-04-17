import heuristics, { euclidean, manhattan, misplaced } from "./heuristics";


function duplicateArray(arr) {
    return arr.map(function (row) {
        return row.slice();
    });
}
export function createSubState(state, emptyIndex, direction) {
    const newState = duplicateArray(state)
    switch (direction) {
        case 'left':
            newState[emptyIndex.y][emptyIndex.x] = newState[emptyIndex.y][emptyIndex.x - 1]
            newState[emptyIndex.y][emptyIndex.x - 1] = 0
            return newState
        case 'right':
            newState[emptyIndex.y][emptyIndex.x] = newState[emptyIndex.y][emptyIndex.x + 1]
            newState[emptyIndex.y][emptyIndex.x + 1] = 0
            return newState
        case 'down':
            newState[emptyIndex.y][emptyIndex.x] = newState[emptyIndex.y + 1][emptyIndex.x]
            newState[emptyIndex.y + 1][emptyIndex.x] = 0
            return newState
        case 'up':
            newState[emptyIndex.y][emptyIndex.x] = newState[emptyIndex.y - 1][emptyIndex.x]
            newState[emptyIndex.y - 1][emptyIndex.x] = 0
            return newState
    }
}
export function getIndex(state, target) {
    const size = state.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (state[i][j] == target) return { y: i, x: j };
        }
    }
}
function gscore(){

}
export class Node {
    constructor(state, parent, goal, params) {
        this.state = state
        this.gscore = 0
        if (!params.greedy)
            this.gscore = (parent == null) ? 0 : (parent.gscore + 1);
        this.parent = parent
        this.mapSize = state.length
        this.subStates = []
        this.goal = goal
        this.hscore = params.uniform ? 0 :  this.score(this.state, this.goal, params.heuristics)
        this.score = this.hscore + this.gscore
        this.hash = this.state.map(e => e.join('.')).join('.')
    }
    getSubStates() {
        const emptyIndex = getIndex(this.state, 0)
        if (emptyIndex.x > 0)
            this.subStates.push(createSubState(this.state, emptyIndex, "left"))
        if (emptyIndex.x < this.mapSize - 1)
            this.subStates.push(createSubState(this.state, emptyIndex, "right"))
        if (emptyIndex.y < this.mapSize - 1) {
            this.subStates.push(createSubState(this.state, emptyIndex, "down"))
        }
        if (emptyIndex.y > 0)
            this.subStates.push(createSubState(this.state, emptyIndex, "up"))
        return (this.subStates)
    }
    score(state, goal, heuristics) {
        var score = 0
        for (var heuristic of heuristics){

            if (heuristic == "euclidean")
            score += euclidean(state, goal)
            if (heuristic == "misplaced")
            score += misplaced(state, goal)
            if (heuristic == "manhattan")
            score += manhattan(state, goal)

        }
            return score

    }

    isGoal(goal) {
        const stateHash = this.state.toString()
        const goalHash = goal.toString()
        return (stateHash === goalHash)
    }
    hash(state) {
        return (state.map(e => e.join('.')).join('.'))
    }

}