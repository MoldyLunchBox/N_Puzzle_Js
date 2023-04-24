N-puzzle is a famous puzzle game that has a grid of tiles, numbered from 1 to N, where N is the dimension of the grid. The goal is to rearrange the tiles in such a way that the numbers are sorted in ascending order from left to right, top to bottom, with the empty tile in the bottom right corner.

The puzzle is played by sliding tiles horizontally or vertically into the empty space until the goal configuration is reached. However, not all configurations are solvable. In fact, only half of them are solvable, with the other half being unsolvable.

N-puzzle is a classic problem in artificial intelligence and has been extensively studied for its applications in search algorithms, pathfinding, and heuristics. The game has inspired many variations, such as the 15-puzzle, 8-puzzle, and even a 24-puzzle.

In this project, i implement the N-puzzle game using Nextjs and TypeScript in the front-end and js in the back-end, allowing users to solve the puzzles with different sizes and goal types and also `heuristics` . The user can choose heuristics, such as Manhattan distance and Euclidean distance. The project also includes an animation feature to visualize the steps taken by the algorithm to reach the goal state and a status displayer to allow the user to know what the application is doing at all times.

A* (pronounced "A star") is a search algorithm used in pathfinding and graph traversal. It uses a heuristic function to evaluate the cost of potential paths and finds the optimal path from a starting node to a goal node.

To use A* for the n-puzzle problem, the algorithm generates all the possible substates from the current state by making a move in each of the four directions (up, down, left, right). It then checks if each substate has been previously visited to avoid redundant calculations.

The cost of each substate is evaluated using the sum of the Manhattan distance between each tile and its correct position on the board (the heuristic function). The substates are then added to a priority queue, which keeps them sorted according to their cost or to put it simply they're added to an array that gets sorted each time, the sorting method plays a big role in how fast your application will be, thats why i qdvice to switch to priority queue later on.

The algorithm continues to expand the substate with the lowest cost from the priority queue meaning the state with the smallest  heuristic score is then removed from the list of open states, and put in the current state variable, and compared with the actual goal state, if its not eauqle to the goal, then it is expanded again by generating its substates and going through the  exact same process again until the goal state is reached.

Once the goal state is found, the algorithm reconstructs the path taken to reach it by keeping track of the parent of each substate. The optimal path can then be returned.