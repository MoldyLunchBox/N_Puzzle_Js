import pause, { printPuzzle } from ".//utils";
 
 export  async function  traceBack(path){
    var i = 0
	while (path) {
		printPuzzle(path.state, path.score)
		path = path.parent
		i++
		await pause(2)
	}
	console.log("steps:", i)
}