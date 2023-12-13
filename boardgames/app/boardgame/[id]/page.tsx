"use client";

// import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Info from "@/app/ui/Info"


const Boardgame = ({ params }: { params: {id: string}}) => {
    
    const [id, setId] = useState(params["id"])
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