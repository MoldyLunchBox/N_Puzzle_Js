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
export const Animation = ({ setParams, params }: Props) => {
    const [animationSpeed, SetAnimationSpeed] = useState(1)
    useEffect(() => {
        setParams(prevParams => {
            return {
              ...prevParams,
              solution: {
                ...prevParams.solution,
                animationSpeed: animationSpeed
              }
            };
          });
    }, [animationSpeed])
    return (
        <div className="bg-[#99A4DA] rounded-t border-b-2 border-b-black font-semibold max-w-[130px]">
            <h1 className="text-sm pt-2 text-start px-2 "> Animation (sec)</h1>
            <input value={animationSpeed} onChange={((e: any) => SetAnimationSpeed(e.target.value))} className="w-full text-sm font-thin px-2 pb-2  bg-[#99A4DA] focus:outline-none" />
        </div>
    )
}
