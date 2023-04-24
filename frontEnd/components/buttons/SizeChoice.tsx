
export const SizeChoice = ({handleSizeChange}: any) => {
    return (
      <div className="bg-[#99A4DA] relative rounded-t border-b-2 border-b-black font-semibold max-w-[130px]">
      <h1 className="text-sm pt-2 text-start px-2">Goal size</h1>
      <div className='justify-start w-full  flex'>
  
      <select
                            onChange={handleSizeChange}
                            id="mapSzie"
                            className="text-left bg-transparent  text-sm font-thin pt-1 px-1 pb-2 focus:outline-none  "
                            defaultValue="3"
                        >
                            <option>Map size</option>
                            <option value="3">3/3</option>
                            <option value="4">4/4</option>
                            <option value="5">5/5</option>
                            <option value="6">6/6</option>
                            <option value="7">7/7</option>
                            <option value="8">8/8</option>
                            <option value="9">9/9</option>
                            <option value="10">10/10</option>
                        </select>
      </div>
  </div>
    )
  }
  