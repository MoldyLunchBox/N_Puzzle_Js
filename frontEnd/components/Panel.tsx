import React, { useState } from 'react'
import Edit from './Edit'
import { puzzleGen } from '../../solver/src/utils/puzzleGenerator'
import { Heuristics } from './buttons/Heuristics';
import { Animation } from './buttons/Animation';
import { GoalChoice } from './buttons/GoalChoice';
import { SizeChoice } from './buttons/SizeChoice';


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
    startSolving: () => Promise<void>,
    params: Params,
    setParams: React.Dispatch<React.SetStateAction<Params>>
    puzzle: number[][]
    setPuzzle: React.Dispatch<React.SetStateAction<number[][]>>,
    status: string,
    setStatus: React.Dispatch<React.SetStateAction<string>>,
    running: boolean,
    setRunning: React.Dispatch<React.SetStateAction<boolean>>,

}
export const Panel = ({ startSolving, params, status, setStatus, setParams, setPuzzle, puzzle, running, setRunning }: Props) => {
    function generatePuzzle(): void {
        if (!running){
            const gen = new puzzleGen(params.goalType, params.puzzleSize)
            gen.start()   
            setPuzzle(gen.currentState)
        }
    }

    function handleSizeChange(e: any) {
        params.puzzleSize = e.target.value
        setParams(params)
    }

    return (
        <div className="relative h-[400px] max-w-[630px]  rounded-t bg-[#2C7CB2] w-full border-b-8 md:h-auto border-black">
            <h1 className="absolute text-xl font-semibold p-2 lg:p-10 lg:text-3xl">Puzzle configuration</h1>
            <div className="flex h-full space-x-5 p-2 justify-around items-center content-center text-center">
                <div className="space-y-4 " >
                    <div className=" flex flex-wrap flex-col max-w-[110px] justify-center m-auto space-y-4">
                        <button className="w-full  bg-[#99A4DA] py-2  font-semibold rounded-t shadow-lg border-b-4 border-black hover:bg-[#8c98d7] " onClick={generatePuzzle} >Auto</button>
                        <Edit running={running} params={params} setStatus={setStatus}  setPuzzle={setPuzzle}  />
                        <button onClick={startSolving} className="my-5 py-2 w-full  bg-[#99A4DA] font-semibold rounded-t shadow-lg border-b-4 border-black hover:bg-[#8c98d7]">Start</button>
                    </div>
                    <div className="w-[220px]  bg-white h-[107px] rounded-md " >
                        <h1 className="text-[red] "> status !</h1>
                        <h2  style={{ whiteSpace: 'pre-line' }} className="text-[#4734bf] px-2 text-start font-thin"> {status}</h2>
                    </div>
                </div>
                <div className="flex flex-wrap flex-col space-y-4">
                    <SizeChoice handleSizeChange={handleSizeChange} />
                    <Animation  params={params} setParams={setParams}/>
                    <Heuristics  params={params} setParams={setParams}/>
                    <GoalChoice  params={params} setParams={setParams}/>
                </div>
            </div>
        </div>
    )
}
