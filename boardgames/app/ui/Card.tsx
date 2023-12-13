const noImg = 'noImg.webp'

const Card = ({boardgame}: any) => {
    return (
            <>
                <p>{Array.isArray(boardgame.name) ? String((boardgame.name.find((name: any) => name['@_primary'] === "true"))['#text']) : String(boardgame.name['#text'])}</p>
                {/* <p>Year: {String(boardgame.yearpublished)}</p> */}
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-900 xl:aspect-h-8 xl:aspect-w-7">
                    <img className="h-full w-full object-cover object-center group-hover:opacity-75" src={boardgame.image || noImg} />
                </div>
                {/* <p>{String(boardgame["@_objectid"])}</p> */}
            </>
    )
}

export default Card