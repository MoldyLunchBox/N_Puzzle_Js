import { BloomFilter } from "bloomfilter";
import { getNeighbors } from "./utils/utils";
function main() {
	const initState = [1,0,2,3,4,5,6,7,8]
	const bloomFilter = new BloomFilter(32 * 1024 * 40000, 32);
	getNeighbors(initState)
}
main()


