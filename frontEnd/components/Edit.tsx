import { useState } from "react";
import { verifyPuzzle } from '../../solver/src/utils/inputParseFrontEnd'
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
  running: boolean,
  setPuzzle: React.Dispatch<React.SetStateAction<number[][]>>,
  setStatus: React.Dispatch<React.SetStateAction<string>>,

}
export default function Edit({ params, setStatus, setPuzzle, running }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("")
  const saveMap = () => {
    let newPuzzle = []
    const arr = inputValue.trim().split(/ +/)

console.log(params.puzzleSize, arr )
if (!running && arr.length > 2 && arr.length / params.puzzleSize == params.puzzleSize ) {
  for (let i = 0; i < params.puzzleSize * params.puzzleSize; i+= params.puzzleSize) {
    newPuzzle.push(arr.slice(i, i  + params.puzzleSize).map(Number))
  }
      console.log(verifyPuzzle(newPuzzle))
      if (verifyPuzzle(newPuzzle)) {
        console.log(newPuzzle)
        setPuzzle(newPuzzle)
        setStatus("New Puzzle was set")
      }
      else
        setStatus("New Puzzle was not set (bad parsing)")
    }
    else
      setStatus("New Puzzle was not set (bad parsing)")

    setShowModal(false)
  }

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  }

  return (
    <>
      <button
        className="my-5 py-2  w-full bg-[#99A4DA] font-semibold rounded-t shadow-lg border-b-4 border-black hover:bg-[#8c98d7]"
        type="button"
        onClick={() => setShowModal(true)} >
        Edit
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative  my-6 mx-auto w-full max-w-[400px]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#2C7CB2] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex relative items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Edit map
                  </h3>
                  <button
                    className="bg-transparent border-0 text-red-500 opacity-90 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-red-100 h-[32px] w-[32px] right-0 absolute top-0 text-2xl block  focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 h-full">
                  <div className="text-left pb-5 font-semibold">
                    <span className="block">(!) type the numbers of the puzzle</span>
                    <span className="block" >each piece sperated by a space</span>
                    <span className="block" >with respect to the chosen size</span>
                    <span className="block pt-2" >Example: 0 1 2 3 4 5 6 7 8</span>
                  </div>

                  <input value={inputValue} onChange={handleInputChange} id="map" className="border bg-[#E6F4F1] h-full w-full"></input>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-[#99A4DA] text-white active:bg-emerald-600 font-bold  text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-[#4DB686]  text-white active:bg-emerald-600 font-bold  text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={saveMap}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}