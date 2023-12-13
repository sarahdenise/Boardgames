

// import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Info from "@/app/ui/Info"



import { XMLParser } from 'fast-xml-parser';
const collectionXml = require('../../collection.xml')


// Return a list of `params` to populate the [slug] dynamic segment
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {

    let boardgamesArray = [{"@_objectid": "1293"}]

    const getBoardgamesObj = (x: any) => {

        const options = {
          ignoreAttributes : false
        }
    
        const parser = new XMLParser(options);
        let jObj = parser.parse(x);
        // console.log(jObj.boardgames.boardgame)
        return jObj
      }

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
    boardgamesArray = c

    console.log(boardgamesArray)
   
    return boardgamesArray.map((boardgame: any) => ({
      "id": boardgame["@_objectid"],
    }))
  }




const Boardgame = ({ params }: { params: {id: string}}) => {
    const id = params["id"]
    // const [id, setId] = useState(params["id"])
    // useEffect(() => {
    //     console.log(id)
    // }, [])

    return (
        <>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"></div>
            <div className="fixed inset-0 bg-stone-900 bg-opacity-75 transition-opacity"></div>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Info id={id}/>
                        
                    </div>
                </div>
            </div>
        </>
            
    )
}

export default Boardgame