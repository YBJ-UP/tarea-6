'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function busqueda() {
    const [tipo, setTipo] = useState<'nombre' | 'correo'>('nombre')

    function cambiarTipo () {
        if (tipo=='nombre') {
            setTipo('correo')
        } else {
            setTipo('nombre')
        }
    }

    const parametro = useSearchParams()
    const params = new URLSearchParams(parametro)
    const ruta = usePathname()
    const {replace} = useRouter()

    function manejarBusqueda(termino:string) {
        if (tipo=='nombre'){
            params.delete('correo')
        }else{
            params.delete('nombre')
        }

        if (termino) {
            params.set(tipo, termino)
            params.set('page', '1')
        } else {
            params.delete(tipo)
        }
        replace(`${ruta}?${params.toString()}`)
    }

    const busqueda = parametro.get(tipo)

    return (
        <div className="flex gap-5 my-5">

            <button className=" bg-cyan-700 p-3 rounded-2xl" onClick={cambiarTipo}>Buscar por {tipo}</button>

            <input type="text" placeholder="Buscar..." 
                onChange={ (e) => { manejarBusqueda(e.target.value.trim()) } }
                defaultValue={parametro.get(tipo)?.toString()}
                className="border-2 px-5 rounded-2xl"
            />
        </div>
    )
}