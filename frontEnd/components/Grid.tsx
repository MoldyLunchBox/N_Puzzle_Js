import { useState, useEffect } from "react"

type Params = {
  goalType: string;
  heuristics: string[];
  puzzleSize: number;
  greedy: boolean;
  uniform: boolean;
  dataStructure: string;
  solution: {
    animation: boolean;
    showPuzzle: boolean;
    animationSpeed: number;
  };
}

interface Props {
  params: Params,
  puzzle: number[][],
  setPuzzle: React.Dispatch<React.SetStateAction<number[][]>>
}

export const Grid = ({ puzzle, setPuzzle, params }: Props) => {
  const [gridCols, setGridCols] = useState("grid-cols-3")
  useEffect(() => {
    if (puzzle.length == 4)
      setGridCols("grid-cols-4")
    if (puzzle.length == 5)
      setGridCols("grid-cols-5")
      if (puzzle.length == 6)
      setGridCols("grid-cols-6")
      if (puzzle.length == 7)
      setGridCols("grid-cols-7")
      if (puzzle.length == 8)
      setGridCols("grid-cols-8")
      if (puzzle.length == 9)
      setGridCols("grid-cols-9")
      if (puzzle.length == 10)
      setGridCols("grid-cols-10")
    console.log(gridCols, puzzle.length)
  }, [puzzle])

  return (
    <div className={`grid ${gridCols}   gap-1 h-full w-full min-w-[289px] `} >
      {puzzle.map((row: number[], index1) => row.map((col, index2) =>
        <div key={index1 + index2} className={`square  ${col === 0 && "opacity-0"} `}>
          <h2 className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl">{col}</h2>
        </div>
      ))}
    </div>
  )
}
