import pause, { printPuzzle } from ".//utils";
 
 export  async function  traceBack(path, solver, params){
    var steps = 0
	var solution = []
	// reverse the the order
	while (path) {
		solution.push(path)
		path = path.parent
		steps++
	}
	solution.reverse()
	for (var i = 0 ; i < solution.length; i++) {
		if (params.solution.animation){
			console.clear()
			console.log("--- Solution ---")
		}
		printPuzzle(solution[i].state, solution[i].score)
		console.log("step:", solution.length-i -1, "/", solution.length - 1,"\n\n")
		if (params.solution.animation)
		await pause(params.solution.animationSpeed)

	}
	console.log("--- Puzzle ---")
	printPuzzle(solution[solution.length - 1].state)
	console.log("steps:", steps - 1)
	console.log("time complexity:", solver.visitedTimes)
	console.log("size complexity:", solver.cSize)
	console.log("duration:", solver.time[0], "sec,", solver.time[1], "milisec" )

	return {solution, solver}
}