import { BloomFilter } from "bloomfilter";
import { getNeighbors } from "./utils/utils";
import { Node } from "./utils/node"
const { log } = console
function main() {
	const initState = [['1', '0', '2'], ['3', '4', '5'], ['6', '7', '8']]
	const goal = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8']]
	const node = new Node(initState, null)
	const visited = new Set();
	const openList = [node];
	console.log(goal.toString())
	exit()
	while (openList.length > 0) {
		openList.sort((a, b) => a.score - b.score);
		const currentState = openList.shift();

		if (currentState.isGoal()) {
			log("found it");
			break
		}
		const subStates = currentState.generateSubStates();
		for (const subState of subStates) {
			if (visited.has(subState.toString())) {
				continue;
			}
			if (!openList.includes(subState)) {
				openList.push(subState);
			}
		}
	}
	node.getSubStates()
	const bloomFilter = new BloomFilter(32 * 1024 * 40000, 32);
}
main()


