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
export const GoalChoice = ( {setParams, params }: Props) => {
    const [goal, setGoal] = useState("zfirst")
    useEffect(() => {
        setParams(prevParams => {
            return {
              ...prevParams,
              goalType : goal
            };
          });
    }, [goal])
    return (
      <div className="bg-[#99A4DA] relative rounded-t border-b-2 border-b-black font-semibold max-w-[130px]">
      <h1 className="text-sm pt-2 text-start px-2">Goal type</h1>
      <div className='justify-start w-full  flex'>
  
          <select
              id="mapSzie"
              className="text-left bg-transparent  text-sm font-thin pt-1 px-1 pb-2 focus:outline-none  "
              defaultValue="zfirst"
              onChange={((e)=> setGoal(e.target.value))}
          >
              <option value="zfirst">Zero first</option>
              <option value="zlast">Zero last</option>
              <option value="snail">Snail</option>
          </select>
      </div>
  </div>
    )
  }
  