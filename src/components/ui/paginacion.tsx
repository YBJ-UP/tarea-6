'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface paginaInterfaz {
    paginaActual: number,
    paginasTotales: number
}

export default function paginacion({ paginaActual, paginasTotales }:paginaInterfaz) {
    const parametros = useSearchParams()
    const params = new URLSearchParams(parametros)
    const ruta = usePathname()
    const { replace } = useRouter()
    const primeraPagina: boolean = paginaActual == 1
    const ultimaPagina: boolean = paginaActual == paginasTotales

    function paginaAnterior() {
        params.set('page', (paginaActual-1).toString())
        replace(`${ruta}?${params.toString()}`)
    }

    function paginaSiguiente() {
        params.set('page', (paginaActual+1).toString())
        replace(`${ruta}?${params.toString()}`)
    }

    return (
        <div className="flex justify-center mt-5">
            <div className="grid grid-cols-3 justify-center gap-6">
                <div>
                    { !primeraPagina && <button onClick={paginaAnterior}>Página anterior</button> }
                </div>
                <p>{paginaActual} de {paginasTotales}</p>
                <div>
                    { !ultimaPagina && <button onClick={paginaSiguiente}>Siguiente página</button> }
                </div>
            </div>
        </div>
        
    )
}