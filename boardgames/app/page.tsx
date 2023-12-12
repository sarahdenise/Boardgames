"use client";

import { useState, useEffect } from 'react'

import { XMLParser } from 'fast-xml-parser';

const collectionXml = require('./collection.xml')

const noImg = 'noImg.webp'


export default function Home() {

  const [boardgamesArray, setBoardgamesArray] = useState<any[]>([])
  


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
    const a = getBoardgamesObj(collectionXml.default)
    setBoardgamesArray(a.boardgames.boardgame)
    
    
  }, [])

  


  return (
    <>
    <p>Sarah</p>
    
    {boardgamesArray.map((boardgame) => <div key={String(boardgame["@_objectid"])}>
      <p>{String(boardgame["@_objectid"])}</p>
      <p>{Array.isArray(boardgame.name) ? String((boardgame.name.find((name: any) => name['@_primary'] === "true"))['#text']) : String(boardgame.name['#text'])}</p>
      <p>Year: {String(boardgame.yearpublished)}</p>
      <img className="image" src={boardgame.image || noImg} />
      <img className="thumbnail" src={boardgame.thumbnail} />
    </div>)}
    </>
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
