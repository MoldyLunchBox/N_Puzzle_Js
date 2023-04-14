import { manhattan, misplaced } from "./heuristics";


function duplicateArray(arr) {
    return arr.map(function (row) {
        return row.slice();
    });
}
function createSubState(state, emptyIndex, direction) {
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
function getIndex(state, target) {
    const size = state.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (state[i][j] == target) return { y: i, x: j };
        }
    }
}
export class Node {
    constructor(state, parent, gscore, goal, heuristic) {
        this.state = state
        this.gscore = gscore
        this.parent = parent
        this.mapSize = state.length
        this.subStates = []
        this.goal = goal
        this.score = this.score(this.state, this.goal, heuristic)
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
    score(state, goal, heuristic) {
        return misplaced(state, goal)
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