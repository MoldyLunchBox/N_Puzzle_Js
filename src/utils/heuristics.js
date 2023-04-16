
function getIndex(state, target) {
    const size = state.length;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (state[i][j] == target) 
                return { y: i, x: j };
        }
    }
}

export function manhattan(state, goal){
    var x, y = 0
    var score = 0;
    var goalTarget = {}
        for (var i = 0; i < state.length; i++) {
            for (var j = 0; j < state.length; j++) {
                if (state[i][j] != 0){
                    goalTarget = getIndex(goal, state[i][j])
                    x = Math.abs(i - goalTarget.y)
                    y = Math.abs(j - goalTarget.x)
                    score += x + y
                }
            }
        }
    
    return score
}

export function misplaced(state, goal){
    const flatState = state.flat()
    const flatGoal = goal.flat()
    var differences = 0
    for (var i = 0; i < flatState.length; i++){
        if (flatGoal[i] != flatState[i])
            differences++
    }
    return differences
}

export function euclidean(state, goal){
	var d = 0
	for (var i = 0; i < state.length; i++){
		for (var j = 0; j < state.length; j++){
			var Tile = state[i][j]
			var goalTile = getIndex(goal,Tile)
			var d1 = (goalTile.y - i)**2
			var d2 = (goalTile.x - j)**2
			d += Math.sqrt(d1 + d2)

		}
	}
	return d
}

export default {
	misplaced: misplaced,
	manhattan: manhattan,
  };