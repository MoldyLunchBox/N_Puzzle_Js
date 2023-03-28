## N-Puzzle (version: javascript)
    The goal of this project is  

### The tasks
- [ ] add bloomFilter for the `visited set` for faster filtering than the normal `new set`
- [ ] comment all code in all files.
- [ ] add more heuristics (> 4)
    - [ ] `manhattan`
    - [ ] `linear conflicts` = (`manhattan * 1.5 + conflicts`)
    - [ ] `hamming (missplaced)`
    - [ ] `gaschnig` ([details](https://cse-robotics.engr.tamu.edu/dshell/cs625/gaschnig-note.pdf))
    - [ ] `euclidean`
    - [ ] `diagonal`
    - read more about heuristics here ([click me](https://www.aaai.org/Papers/AAAI/1996/AAAI96-178.pdf))
- [ ] support using one or multiple heuristic
- [ ] update the puzzle parser for more accuracy and error handling
- [ ] add solvability checker
- [ ] config the solver to add type of target puzzle option (`zero last`, `zero first`, `snail`) 
<!-- - [ ] pack all the Puzzle solver into one package
- [ ] create an UI for n-puzzle using the package created in previous task -->

### Run the code :
```
- npm install
- npm run build
- npm run dev
```


### Example of input/output:
- input of puzzle size 3x3, with no score (f) or path cost (g) counting, open all paths until solution using heapQ algorithm

[ input file ] ----------------------------------------------
```
# This puzzle is solvable
3
2 4 0
1 3 6
7 5 8
```
[ Solver params ] -------------------------------------------
```js
const params = {
    puzzle: puzzle,
    greedy: true,
    uniform: true,
    heuristic: ["linearConflicts"],
    queueType: "heapQ"
}
```

- output (npm run dev)
```shell
➜  n-puzzle-js git:(main) ✗ npm run start 
---------------------------------------------
        Steps to solution  : 13
        complexity in time : 1281
        complexity in size : 817
        Time spent :  0 s, 142.021 ms
---------------------------------------------
➜  n-puzzle-js git:(main) ✗

```

## Commands used to create the app
npm init
npm install nodemon
