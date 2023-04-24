import Edit from "./Edit"
import { Grid } from "./Grid"
import { solverForFront } from "../../solver/src/solverForFront"
import { useState } from "react"
import { Panel } from "./Panel"


function pause(speed: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, speed * 1000)
  })
}

interface Props {
  puzzle: number[][],
  setPuzzle: React.Dispatch<React.SetStateAction<number[][]>>
}
export const PuzzleBoard = ({ puzzle, setPuzzle }: Props) => {
  const [params, setParams] = useState({
    goalType: "zfirst",  // snail, zfirst , zlast
    heuristics: [ // manhattan, euclidean, misplaced
      "manhattan",
    ],
    puzzleSize: 3,
    greedy: true,
    uniform: false,
    dataStructure: "pQueue",  //options: "pQueue" , "array"
    solution: {
      animation: false,
      showPuzzle: true,
      animationSpeed: 0.1
    }
  })
  // status message
  const [status, setStatus] = useState("waiting input !");

  // is there a puzzle already in the process of being solved
  const [running, setRunning] = useState(false)

  async function startSolving() {
    console.log(params)
    if (!running) {

      setStatus("calculating...")
      setRunning(true)
      setTimeout(async () => {
        const nodes = await solverForFront(params, puzzle)
        if (nodes) {

          for (let i = 0; i < nodes?.solution?.length; i++) {
            setStatus(`Puzzle solved ! step: ${i + 1}/`+nodes.solution.length + '\n' + 
            "Time complexity: " + nodes.solver.visitedTimes + '\n' + 
            "Size complexity:" + nodes.solver.cSize)
            setPuzzle(nodes.solution[i].state)
            await pause(params.solution.animationSpeed)
          }
        }
        else
          setStatus("Puzzle is not solvable!")
        setRunning(false)
      }, 0);
    }
  }
  return (
    <div className="flex m-2 justify-center align-middle  flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 ">
      <Grid puzzle={puzzle} setPuzzle={setPuzzle} params={params} />
      <Panel running={running} setRunning={setRunning} startSolving={startSolving} status={status} setStatus={setStatus} params={params} setParams={setParams} puzzle={puzzle}  setPuzzle={setPuzzle} />
    </div>
  )
}
