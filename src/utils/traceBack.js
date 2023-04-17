import pause, { printPuzzle } from ".//utils";
 
 export  async function  traceBack(path, solver){
    var steps = 0
	var solution = []
	// reverse the the order
	while (path) {
		solution.push(path)
		path = path.parent
		steps++
	}
	for (var i = solution.length - 1; i >= 0; i--) {
		console.clear()
		console.log("--- Solution ---")
		printPuzzle(solution[i].state, solution[i].score)
		console.log("step:", solution.length-i -1, "/", solution.length - 1)

		//  await pause(1)
	}
	console.log("--- Puzzle ---")
	printPuzzle(solution[solution.length - 1].state)

	console.log("steps:", steps - 1)
	console.log("visited:", solver.visitedTimes)
	console.log("time spent:", solver.time)

}