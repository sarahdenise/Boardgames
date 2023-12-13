import FilterCategories from "./FilterCategories"

const Filter = ({ passedState, categories, tickToggle, minAge, minAgeHandler, numPlayers, numPlayersHandler, playTime, playTimeHandler }: any) => {



    return (
        <form className="form-control">
        <fieldset>
          <legend className='text-zinc-50 font-semibold'>Filter</legend>

          <div className='py-2'>
            <div className="flex items-center">
                <input className=" border-gray-300 text-indigo-600 focus:ring-indigo-500" type="range" id="MinAge" name="MinAge" min="0" max="18" value={minAge} onChange={(e) => minAgeHandler(e.target.value)} />
                <label className="ml-2 text-md text-gray-200" htmlFor="MinAge">Min Age {minAge}</label>
            </div>
            <div className="flex items-center">
                <input className=" border-gray-300 text-indigo-600 focus:ring-indigo-500" type="range" id="NumPlayers" name="NumPlayers" min="0" max="30" value={numPlayers} onChange={(e) => numPlayersHandler(e.target.value)} />
                <label className="ml-2 text-md text-gray-200" htmlFor="NumPlayers">Players {numPlayers < 30 ? numPlayers : "30+"}</label>
            </div>
            <div className="flex items-center">
                <input className=" border-gray-300 text-indigo-600 focus:ring-indigo-500" type="range" id="MinPlayTime" name="MinPlayTime" min="0" max="60" value={playTime} onChange={(e) => playTimeHandler(e.target.value)} />
                <label className="ml-2 text-md text-gray-200" htmlFor="MinPlayTime">Playtime {playTime} mins</label>
            </div>
          </div>
            
          <div className='py-2'>
            {categories.map((category: string, index: number) => <FilterCategories key={index} category={category} ischecked={passedState[category]} tickToggle={tickToggle} />)}
          </div>

        </fieldset>
      </form>
    )
}

export default Filter