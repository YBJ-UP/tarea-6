'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function busqueda(tipo:{tipo: string}) {
    const tipoo = tipo.tipo
    const parametro = useSearchParams()
    const params = new URLSearchParams(parametro)
    const ruta = usePathname()
    const {replace} = useRouter()

    function manejarBusqueda(termino:string) {
        if (termino) {
            params.set(tipoo, termino)
            params.set('page', '1')
        } else {
            params.delete(tipoo)
        }
        replace(`${ruta}?${params.toString()}`)
    }

    return (
        <div className="flex gap-5 my-5 items-center">

            <p>Buscar por nombre:</p>

            <input type="text" placeholder="Buscar..." 
                onChange={ (e) => { manejarBusqueda(e.target.value.trim()) } }
                defaultValue={parametro.get(tipoo)?.toString()}
                className="border-2 px-5 rounded-2xl"
            />
        </div>
    )
}