"use client";
import { useEffect, useReducer, useState } from "react"

import { useRouter } from "next/navigation";

import { XMLParser } from 'fast-xml-parser'

const noImg = 'noImg.webp'


const Info = ({id}: { id: string}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [boardgame, setBoardgame] = useState<any>({})

    const router = useRouter()

    const getBoardgamesObj = (x: any) => {
        
        const options = {
          ignoreAttributes : false
        }
    
        const parser = new XMLParser(options);
        let jObj = parser.parse(x);
        // console.log(jObj.boardgames.boardgame)
        return jObj
      }

    useEffect(() => {
        const options = {method: 'GET', headers: {accept: 'application/xml'}}
        fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${id}`, options)
        .then((response) => response.text())
        .then((response: any) => getBoardgamesObj(response))
        .then(response => {
            setBoardgame(response.items.item)
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        console.log(boardgame)
    }, [boardgame])

    if (isLoading === false) {
        return (
            
            <div className="relative transform overflow-hidden rounded-lg bg-stone-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:p-6 place-content-center">
                <div className="place-content-center grid grid-cols-4">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-900 xl:aspect-h-8 xl:aspect-w-7 max-w-xs place-content-center col-span-1">
                        <img className="" src={boardgame.image || noImg}  alt={Array.isArray(boardgame.name) ? String((boardgame.name.find((name: any) => name['@_type'] === "primary"))['@_value']) : boardgame.name['@_value']} />
                    </div>
                    <div className="mt-3 sm:mt-5 col-span-3 pl-6">
                        <h3 className="text-base font-semibold leading-6 text-white" id="modal-title">
                            {Array.isArray(boardgame.name) ? String((boardgame.name.find((name: any) => name['@_type'] === "primary"))['@_value']) : boardgame.name['@_value']}
                        </h3>
                        
                        <p className="text-white text-xs">ID: {String(boardgame["@_id"])}</p>
                        
                        <div className="mt-2">
                            <p className="text-white">Year: {String(boardgame.yearpublished['@_value'])}</p>
                            <p className="text-sm text-gray-400">{String(boardgame.description)}</p>
                            <p className="text-white">Min Players: {String(boardgame.minplayers['@_value'])}</p>
                            <p className="text-white">Max Players: {String(boardgame.maxplayers['@_value'])}</p>
                            <p className="text-white">Min Playtime: {String(boardgame.minplaytime['@_value'])}</p>
                            <p className="text-white">Max Players: {String(boardgame.minplaytime['@_value'])}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-6">
                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => router.back()}>Go back to dashboard</button>
                </div>
            </div>
            
        )
    }
    else {
        return (<p>Loading</p>)
    }
    
}

export default Info