"use client";

import { useState, useEffect } from 'react'

import { XMLParser } from 'fast-xml-parser';

const collectionXml = require('./collection.xml')

const noImg = 'noImg.webp'


export default function Home() {

  const [boardgamesArray, setBoardgamesArray] = useState<any[]>([])
  
  const [boardgamesHotIncArray, setBoardgamesHotIncArray] = useState<any[]>([])
  const [boardgamesHotIdArray, setBoardgamesHotIdArray] = useState<any[]>([])


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

  const getHotboardgames = () => {
    const options = {method: 'GET', headers: {accept: 'application/xml'}};
    fetch(`https://boardgamegeek.com/xmlapi2/hot?boardgame`, options)
    .then((response) => response.text())
    .then((response: any) => getBoardgamesObj(response))
    // .then(data => console.log(data))
    // .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    // .then(data => console.log(data))
    // .then((response: any) => getBoardgamesObj(response))
    // .then(data => console.log("data", data))
    // .then((data: any) => setBoardgamesHotIncArray(data.items.item))
    .then((data: any) => data.items.item.map((boardgame: any) => boardgame['@_id']))
    // .then(array => setBoardgamesHotIdArray(array))
    .then(array => {
      const options = {method: 'GET', headers: {accept: 'application/xml'}};
      fetch(`https://boardgamegeek.com/xmlapi/boardgame/${array.map((id) => id)}`, options)
        .then(response => console.log(response))
    })
  }
  // getting CORS is missing issue

  useEffect(() => {
    // console.log(boardgamesArray)
    console.log(boardgamesHotIncArray)
  }, [boardgamesHotIncArray])

  useEffect(() => {
    console.log(boardgamesHotIdArray)
    
  }, [boardgamesHotIdArray])

  


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
