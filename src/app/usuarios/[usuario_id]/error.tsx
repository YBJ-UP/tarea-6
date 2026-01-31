'use client'

import Link from "next/link"

export default function error({error}:{error:Error}) {
    return (
        <div>
            <Link href='/usuarios' className="block text-2xl px-10 py-2 bg-amber-800">Regresar</Link>
            <div className="flex justify-center h-100">
                <div className="bg-amber-50 text-black w-100 h-50 rounded-xl flex flex-col justify-center items-center m-auto">
                    <p className="text-2xl font-bold">{error.name}</p>
                    <p>{error.message}</p>
                </div>
            </div>
        </div>
        
        
    )
}