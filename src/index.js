import { BloomFilter } from "bloomfilter";
import { getNeighbors } from "./utils/utils";
import {Node} from "./utils/node"
const {log} = console
function main() {
	const initState = [ [ '1', '0', '2' ], [ '3', '4', '5' ], [ '6', '7', '8' ] ]
	const goal = [[ '0', '1', '2' ], [ '3', '4', '5' ], [ '6', '7', '8' ]]
	const node = new Node(initState, null)
	node.getSubStates()
	log(node.score(initState, goal))
	const bloomFilter = new BloomFilter(32 * 1024 * 40000, 32);
}
main()


