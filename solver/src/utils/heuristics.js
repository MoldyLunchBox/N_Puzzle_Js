
function getIndex(state, target) {
    const size = state.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (state[i][j] == target)
                return { y: i, x: j };
        }
    }
}

export function manhattan(state, goal) {
    let x, y = 0
    let score = 0;
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state.length; j++) {
            if (state[i][j] != 0) {
                const goalTarget = getIndex(goal, state[i][j])
                y = Math.abs(i - goalTarget.y)
                x = Math.abs(j - goalTarget.x)
                score += x + y
            }
        }
    }

    return score
}

export function misplaced(state, goal) {
    const flatState = state.flat()
    const flatGoal = goal.flat()
    let differences = 0
    for (let i = 0; i < flatState.length; i++) {
        if (flatGoal[i] != flatState[i])
            differences++
    }
    return differences
}

export function euclidean(state, goal) {
    let d = 0
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state.length; j++) {
            let Tile = state[i][j]
            let goalTile = getIndex(goal, Tile)
            let d1 = (goalTile.y - i) ** 2
            let d2 = (goalTile.x - j) ** 2
            d += Math.sqrt(d1 + d2)

        }
    }
    return d
}

export default {
    misplaced: misplaced,
    manhattan: manhattan,
};