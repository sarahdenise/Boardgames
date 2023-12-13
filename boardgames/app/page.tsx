"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link';

import { XMLParser } from 'fast-xml-parser';

const collectionXml = require('./collection.xml')

const noImg = 'noImg.webp'

import Card from './ui/Card'
import Filter from './ui/Filter';



export default function Home() {

  const [boardgamesArray, setBoardgamesArray] = useState<any[]>([])
  const [filteredBoardgamesArray, setFilteredBoardgamesArray] = useState<any[]>([])
  const [filteredBoardgamesArraywithCat, setFilteredBoardgamesArraywithCat] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [minAge, setMinAge] = useState<number>(18)
  const [numPlayers, setNumPlayers] = useState<number>(4)
  const [playTime, setPlayTime] = useState<number>(10)

  
  const [categoriesState, setCategoriesState] = useState<any>({})


  const getBoardgamesObj = (x: any) => {

    const options = {
      ignoreAttributes : false
    }

    const parser = new XMLParser(options);
    let jObj = parser.parse(x);
    // console.log(jObj.boardgames.boardgame)
    return jObj
  }

  const getCategories = (xmlStr: any) => {

    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlStr.default, "application/xml")

    const x: any[] = Array.from(new Set(Array.from(doc.getElementsByTagName('boardgamecategory')).map((item) => item.textContent)))
    setCategories(["All", ...x])
  }

  useEffect(() => {
    const a = getBoardgamesObj(collectionXml.default)
    const b = a.boardgames.boardgame
    const c = b.map((boardgame: any) => {
      if (Array.isArray(boardgame.boardgamecategory)) {
        const catArray = boardgame.boardgamecategory.map((category: any) => category["#text"])
        boardgame.category = catArray
        return boardgame
      }
      else {
        const catArray = [boardgame.boardgamecategory["#text"]]
        boardgame.category = catArray
        return boardgame
      }
    })
    setBoardgamesArray(c)

    
    getCategories(collectionXml)

  }, [])

  useEffect(() => {
    console.log(boardgamesArray)
    setFilteredBoardgamesArray(boardgamesArray.filter((x) => minAge >= x.age && numPlayers >= x.minplayers && numPlayers <= x.maxplayers && playTime >= x.minplaytime && playTime <= x.maxplaytime))
    setFilteredBoardgamesArraywithCat(boardgamesArray.filter((x) => minAge >= x.age && numPlayers >= x.minplayers && numPlayers <= x.maxplayers && playTime >= x.minplaytime && playTime <= x.maxplaytime))

  }, [boardgamesArray])

  useEffect(() => {
    setFilteredBoardgamesArray(filteredBoardgamesArraywithCat.filter((x) => minAge >= x.age && numPlayers >= x.minplayers && numPlayers <= x.maxplayers && playTime >= x.minplaytime && playTime <= x.maxplaytime))
  }, [minAge, numPlayers, playTime, filteredBoardgamesArraywithCat])

  useEffect(() => {
    console.log(categories)
    if (categories.length > 0) {
      const cats = categories.reduce((prev, word) => ({...prev, [word]: false}), {})
      setCategoriesState({...categoriesState, ...cats, "All": true})
    }
  }, [categories])

  useEffect(() => {
    // console.log(categoriesState)
    if (categoriesState["All"] === true) {
      setFilteredBoardgamesArraywithCat(boardgamesArray.filter((x) => x.age <= minAge && numPlayers >= x.minplayers && numPlayers <= x.maxplayers))
    }
    else {
      const isSomeTrue = (z: any) => {
        const catArr = z.category
        const y = catArr.map((cat: string) => categoriesState[cat] === true ? true : false)
        return y.some((t: boolean) => t === true)
      }
      setFilteredBoardgamesArraywithCat(boardgamesArray.filter(isSomeTrue))
    }
    
  }, [categoriesState])


  // FILTER CHECKBOX FUNCTION
  const handleTickToggle = (category: string) => {
    setCategoriesState({ ...categoriesState, [category]: !categoriesState[category] })
    

    if (category === "All") {

      if (categoriesState["All"] === false) {
        const cats = categories.reduce((prev, word) => ({...prev, [word]: false}), {})
        setCategoriesState({...categoriesState, ...cats, "All": true})
  
        }
      }

    else if (category !== "All") {

      if (categoriesState[category] === false) {
        setCategoriesState({...categoriesState, "All": false, [category]: true})
      }

    }
    
  }

  const minAgeHandler = (value: number) => {
    setMinAge(value)
  }

  const numPlayersHandler = (value: number) => {
    setNumPlayers(value)
  }

  const playTimeHandler = (value: number) => {
    setPlayTime(value)
  }



  return (
    <div className="bg-stone-900">
      <div className='hero p-6'>
        <h1 className='hero-content text-4xl text-zinc-50 font-bold'>What shall we play today?</h1>
      </div>
      <div className='grid grid-cols-8 p-6'>
        <div className='col-span-2 px-4 py-8 max-h-[90vh] overflow-y-auto'>
          <Filter 
            passedState={categoriesState}
            categories={categories}
            tickToggle={handleTickToggle}
            minAge={minAge}
            minAgeHandler={minAgeHandler}
            numPlayers={numPlayers}
            numPlayersHandler={numPlayersHandler}
            playTime={playTime}
            playTimeHandler={playTimeHandler}
          />
        </div>
        <div className='col-span-6 p-8'>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
            {filteredBoardgamesArray?.map((boardgame) => <Link href={`/boardgame/${boardgame["@_objectid"]}`} key={String(boardgame["@_objectid"])}><Card boardgame={boardgame} /></Link>)}
          </div>
        </div>
      </div>
    </div>
  )
}

// age
// category
// description
// image
// maxplayers
// maxplaytime
// minplayers
// minplaytime
// name
// playingtime
// thumbnail
// yearpublished
