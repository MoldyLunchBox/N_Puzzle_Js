import { BloomFilter } from "bloomfilter";

function main() {

	const bloomFilter =  new BloomFilter(32 * 1024 * 40000, 32);
	
	bloomFilter.add('hello');
	console.log(bloomFilter);
	bloomFilter.add('world');
	console.log(bloomFilter.test('s'));
}
main()


