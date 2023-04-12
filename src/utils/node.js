

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
    const size = state.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (state[i][j] == target) return { y: i, x: j };
        }
    }
}
export class Node {
    constructor(state, parent, gscore) {
        this.state = state
        this.gscore = gscore
        this.parent = parent
        this.mapSize = state.length
        this.subStates = []
        this.hash = this.state.map(e => e.join('.')).join('.')
    }
    getSubStates() {
        const emptyIndex = getIndex(this.state, '0')
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
    score(state, goal) {
        // var i = 0;
        // var j = 0;
        var score = 0;
        // var d1, d2 = 0
        // var goalTarget = {}
        // for (i = 0; i < state.length; i++) {
        //     for (j = 0; j < state.length; j++) {
        //         goalTarget = getIndex(goal, state[i][j])
        //         d1 = Math.abs(i - goalTarget.x)
        //         d2 = Math.abs(j - goalTarget.y)
        //         score += d1 + d2
        //     }
        // }
        const size = state.length;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                // current tile in the loop
                const currentTile = state[i][j];
                // find the index of same tile value but in the goal puzzle
                const tileInGoal = getIndex(goal, currentTile);
                // find the tile that match the current i,j value in goal puzzle
                const mirrorInGoal = goal[i][j];

                // dont apply the equation on the empty TILE
                if (currentTile != "0")
                    try {
                        // the distance between the X value of current tile and its equivalent in the goal puzzle
                        let d1 = Math.abs(i - tileInGoal.y);
                        // the distance between the Y value of current tile and its equivalent in the goal puzzle
                        let d2 = Math.abs(j - tileInGoal.x);


                        // calc manhattan score
                        score += d1 + d2;
                    } catch (err) { }
            }
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