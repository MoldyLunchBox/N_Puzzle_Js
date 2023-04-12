import { BloomFilter } from "bloomfilter";
import pause, { getNeighbors, printPuzzle } from "./utils/utils";
import { Node } from "./utils/node"
const { log } = console
function arrayEquals(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}
function verifyExistance(node, lookFor){
	for (var i = 0; i < node.length; i++){
		if (node[i].state.toString() === lookFor.toString()){
			return (true)
		}
	}
	return false
}
function doit(curr, goal){

	for (var i = 0; i < curr.length; i++){
		printPuzzle(curr[i].state, curr[i].score(curr[i].state, goal), curr[i].gscore)
	}
	exit()
}
async function main() {
	const initState = [['0', '4', '2'], ['3', '1', '5'], ['6', '7', '8']]
	const goal = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8']]
	const node = new Node(initState, null, 0)
	const visited = new Set();
	const openList = [node];
	console.log(goal.toString())
	var currentState = null
	var i = 0;
	while (openList.length > 0) {

		// openList.sort((a, b) => a.score - b.score);
		currentState = openList.shift();
		// console.log("curr state:", currentState.state)
		printPuzzle(currentState.state, currentState.score(currentState.state, goal), currentState.gscore)

		if (currentState.isGoal(goal)) {
			log("found it");
			break
		}
		const subStates = currentState.getSubStates();
		subStates.sort((a, b) => currentState.score(a, goal) - currentState.score(b, goal))

		for (const subState of subStates) {
			if (visited.has(subState.toString())) {
				continue;
			}
			if (!verifyExistance(openList, subState)) {
				openList.push(new Node(subState, currentState, currentState.gscore + 1));
			}

		}
		 if (i == 3){
			log(new Array(...visited).join(' '))
			 exit()
			}
		visited.add(currentState.toString());
		// await pause(2)
		i++;
	}
	log("out completly")
	var path = currentState
	while (path) {
		printPuzzle(path.state, path.score(path.state, goal))
		path = path.parent
		await pause(2)
	}
	// node.getSubStates()
	// const bloomFilter = new BloomFilter(32 * 1024 * 40000, 32);
}
main()


