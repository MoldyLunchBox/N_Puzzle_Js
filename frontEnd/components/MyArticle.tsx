
export const MyArticle = () => {
    return (
        <div className="border m-auto max-w-[1260px] border-20 border-[#99A4DA]">
            <div className="p-10">

                <p className="pb-2 indent-8 font-semibold">N-puzzle is a famous puzzle game that has a grid of tiles, numbered from 1 to N, where N is the dimension of the grid. The goal is to rearrange the tiles in such a way that the numbers are sorted in ascending order from left to right, top to bottom, with the empty tile in the bottom right corner.N-puzzle is a classic problem in artificial intelligence and has been extensively studied for its applications in search algorithms, pathfinding, and heuristics. The game has inspired many variations, such as the 15-puzzle, 8-puzzle, and even a 24-puzzle.</p>
                <p className="pb-2 indent-8  font-semibold">In this project, i implement the N-puzzle game using Nextjs and TypeScript in the front-end and js in the back-end, allowing users to solve the puzzles with different sizes and goal types and also `heuristics` . The user can choose heuristics, such as Manhattan distance and Euclidean distance. The project also includes an animation feature to visualize the steps taken by the algorithm to reach the goal state and a status displayer to allow the user to know what the application is doing at all times.</p>
                <h1 className="text-2xl indent-8  p-3 font-semibold">How does it work ?</h1>
                <p className="font-semibold indent-8">  I will try to not get too technical here but this is basically the logic behind this app, say we have an inicial state which means what the puzzle currently looks like, and we have a goal state say "0 1 2 3 4 5 6 7 8 "
                    , what the program does under the hood is that it inicializes an empty array called open sets, and another array called closed sets, and then the while loop starts, first i check if my current puzzle state is the goal if not i push it into  the closed set array
                    and then i generate its own substates, then i loop through these substates, if a substate is not in the closed sets array then i add it to my open sets array. once thats done, i need to pick a new current state , thats where  the heuristics come in, the heuristics function allows me to determin which path is closer to the goal, that way i dont have to try so many. so the open set is sorted acording to score and the  element with the smallest score is taken out of the open set array into the current state variable, then back to the beginning of the loop to start the whole process again. this is pretty much the whole logic of it, later one will need to concider using a better data structure for faster and more optimized process. like for example the  priority queue which keeps the open list sorted at all times without having to resort the whole array. so much for not getting too technical !
                </p>
            </div>
        </div>
    )
}
