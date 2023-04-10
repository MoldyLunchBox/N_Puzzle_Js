

function duplicateArray(arr) {
    return arr.map(function (row) {
        return row.slice();
    });
}
function createSubState(state, emptyIndex, direction) {
    const newState = duplicateArray(state)
    console.log(direction)
    switch (direction) {
        case 'left':
            newState[emptyIndex.y][emptyIndex.x] = newState[emptyIndex.y][emptyIndex.x - 1]
            newState[emptyIndex.y][emptyIndex.x - 1] = '0'
            return newState
        case 'right':
            newState[emptyIndex.y][emptyIndex.x] = newState[emptyIndex.y][emptyIndex.x + 1]
            newState[emptyIndex.y][emptyIndex.x + 1] = '0'
            return newState
        case 'down':
            newState[emptyIndex.y][emptyIndex.x] = newState[emptyIndex.y + 1][emptyIndex.x]
            newState[emptyIndex.y + 1][emptyIndex.x] = '0'
            return newState
        case 'up':
            newState[emptyIndex.y][emptyIndex.x] = newState[emptyIndex.y - 1][emptyIndex.x]
            newState[emptyIndex.y - 1][emptyIndex.x] = '0'
            return newState
    }
}
function getIndex(state, target) {
    let rowIndex = -1;
    let colIndex = -1;

    for (let i = 0; i < state.length; i++) {
        const row = state[i];
        if (row.indexOf(target) !== -1) {
            rowIndex = i;
            colIndex = row.indexOf(target);
            break
        }
    }
    return ({ y: rowIndex, x: colIndex })
}
export class Node {
    constructor(state, parent) {
        this.state = state
        this.parent = parent
        this.mapSize = state.length
        this.subStates = []
        this.hash = this.state.map(e => e.join('.')).join('.')
    }
    getSubStates() {
        const emptyIndex = getIndex(this.state, '0')
        if (emptyIndex.x > 0)
            this.subStates.push(createSubState(this.state, emptyIndex, "left"))
        if (emptyIndex.x < this.mapSize)
            this.subStates.push(createSubState(this.state, emptyIndex, "right"))
        if (emptyIndex.y < this.mapSize)
            this.subStates.push(createSubState(this.state, emptyIndex, "down"))
        if (emptyIndex.y > 0)
            this.subStates.push(createSubState(this.state, emptyIndex, "up"))
    }
    score(state, goal) {
        var i = 0;
        var j = 0;
        var score = 0;
        var d1, d2 = 0
        var goalTarget = {}
        for (i = 0; i < state.length; i++) {
            for (j = 0; j < state.length; j++) {
                goalTarget = getIndex(goal, state[i][j])
                d1 = Math.abs(i - goalTarget.y)
                d2 = Math.abs(j - goalTarget.x)
                score += d1 + d2
            }
        }
        return score

    }
    isGoal(goal) {
        const stateHash = state.toString()
        const goalHash = goal.toString()
        return (stateHash === goalHash)
    }
    hash(state) {
        return (state.map(e => e.join('.')).join('.'))
    }

}