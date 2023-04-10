import { BloomFilter } from "bloomfilter";
import pause, { getNeighbors, printPuzzle } from "./utils/utils";
import { Node } from "./utils/node"
const { log } = console
async function  main() {
	const initState = [['4', '1', '2'], ['3', '0', '5'], ['6', '7', '8']]
	const goal = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8']]
	const node = new Node(initState, null, 0)
	const visited = new Set();
	const openList = [node];
	console.log(goal.toString())
	var currentState = null
	while (openList.length > 0) {
		openList.sort((a, b) => a.score - b.score);
		 currentState = openList.shift();
		 console.log(currentState.state)
		 printPuzzle(currentState.state, currentState.score(currentState.state, goal), currentState.gscore)

		if (currentState.isGoal(goal)) {
			log("found it");
			break
		}
		const subStates = currentState.getSubStates();
		for (const subState of subStates) {
			if (visited.has(subState.toString())) {
				continue;
			}
			if (!openList.includes(subState)) {
				openList.push(new Node(subState, currentState, currentState.gscore + 1));
			}
		}
		visited.add(currentState.toString());
		await pause(2)

	}
	var path = currentState
	while(path){
		printPuzzle(path.state, path.score(path.state, goal))
		path = path.parent
		await pause(2)
	}
	// node.getSubStates()
	// const bloomFilter = new BloomFilter(32 * 1024 * 40000, 32);
}
main()


