import { useEffect, useState } from "react";

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
  setParams: React.Dispatch<React.SetStateAction<Params>>
}
export const Heuristics = ({ setParams, params }: Props) => {
  const [heuristics, setHeuristics] = useState("manhattan")
  useEffect(() => {
      setParams(prevParams => {
          return {
            ...prevParams,
            heuristics : [heuristics]
          };
        });
  }, [heuristics])
  return (
    <div className="bg-[#99A4DA] relative rounded-t border-b-2 border-b-black font-semibold max-w-[130px]">
    <h1 className="text-sm pt-2 text-start px-2">Heuristic</h1>
    <div className='justify-start w-full  flex'>

        <select
            id="mapSzie"
            className="text-left bg-transparent  text-sm font-thin pt-1 px-1 pb-2 focus:outline-none  "
            defaultValue={heuristics}
            onChange={((e)=>setHeuristics(e.target.value))}
        >
            <option value="manhattan">Manhattan</option>
            <option value="misplaced">Misplaced</option>
            <option value="euclidean">Euclidean</option>

        </select>
    </div>

</div>
  )
}
