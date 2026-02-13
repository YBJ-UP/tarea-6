import Link from "next/link"

interface paginaInterfaz {
    paginaActual: number,
    paginasTotales: number,
    ruta: string
}

export default async function paginacion({ paginaActual, paginasTotales, ruta }:paginaInterfaz) {
    const primeraPagina: boolean = paginaActual == 1
    const ultimaPagina: boolean = paginaActual == paginasTotales
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-3 justify-center gap-6">
                <div>
                    { !primeraPagina && <Link href={`${ruta}?page=${paginaActual-1}`}>Página anterior</Link> }
                </div>
                <p>{paginaActual} de {paginasTotales}</p>
                <div>
                    { !ultimaPagina && <Link href={`${ruta}?page=${paginaActual+1}`}>Siguiente página</Link> }
                </div>
            </div>
        </div>
        
    )
}