import pause, { printPuzzle } from ".//utils";
 
 export  async function  traceBack(path, solver){
    var i = 0
	while (path) {
		printPuzzle(path.state, path.score)
		path = path.parent
		i++
		// await pause(1)
	}
	console.log("steps:", i - 1)
	console.log("visited:", solver.visitedTimes)
}