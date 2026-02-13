'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function filtrado ({categorias}:{categorias:{categoria:string}[]}) {
    const parametros = useSearchParams()
    const params = new URLSearchParams(parametros)
    const ruta = usePathname()
    const { replace } = useRouter()

    function manejarPrograma(input:string) {
        if (input){
            params.set("categoria", input)
        } else {
            params.delete('categoria')
        }

        replace(`${ruta}?${params.toString()}`)
    }

    return (
        <div className="flex gap-15 my-5">
            <div className="flex gap-5 items-center">
                <label htmlFor="categoria">Seleccionar categoria:</label>
                <select name="categoria" id="categoria" className="bg-black border-2 rounded-2xl px-5 py-2" onChange={(e) => {manejarPrograma(e.target.value.trim())}}>
                    <option value="">-</option>
                    {categorias.map((categoria, key:number) => (
                        <option key={key} value={categoria.categoria}>{categoria.categoria}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}