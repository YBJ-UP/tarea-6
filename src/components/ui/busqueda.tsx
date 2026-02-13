'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function busqueda() {
    const tipo = 'nombre'

    const parametro = useSearchParams()
    const params = new URLSearchParams(parametro)
    const ruta = usePathname()
    const {replace} = useRouter()

    function manejarBusqueda(termino:string) {
        if (termino) {
            params.set(tipo, termino)
            params.set('page', '1')
        } else {
            params.delete(tipo)
        }
        replace(`${ruta}?${params.toString()}`)
    }

    return (
        <div className="flex gap-5 my-5 items-center">

            <p>Buscar por nombre:</p>

            <input type="text" placeholder="Buscar..." 
                onChange={ (e) => { manejarBusqueda(e.target.value.trim()) } }
                defaultValue={parametro.get(tipo)?.toString()}
                className="border-2 px-5 rounded-2xl"
            />
        </div>
    )
}