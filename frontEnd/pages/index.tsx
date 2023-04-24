import Image from 'next/image'
import { Inter } from 'next/font/google'
import { PuzzleBoard } from '@/components/PuzzleBoard'
import {goalGenerator} from '../../solver/src/utils/goalGenerator'
import { useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const [puzzle, setPuzzle] = useState<number[][]>([[6, 8, 3], [0, 5, 4], [2, 7, 1]])
  useEffect(() => {
    // setPuzzle(goalGenerator("snail", 3))
  }, []);
  return (
    <main className='w-full'>
      <div >
        
        <PuzzleBoard puzzle={puzzle} setPuzzle={setPuzzle}/>

      </div>
    </main>
  )

}
