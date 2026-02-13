import Busqueda from "@/components/ui/busqueda"
import Filtrado from "@/components/ui/filtrado"
import Paginacion from "@/components/ui/paginacion"
import { getCategorias, getKPI, getReporte4, reporte4Type } from "@/shared/interfaces/reporte_4"
import { Suspense } from "react"

export const dynamic = 'force-dynamic'

export default async function reporte_4 (props: { searchParams?:Promise<{[key:string]: string}> }) {
    const kpi = await getKPI()
    const categorias = await getCategorias()
    const res = await getReporte4(props)
    if (!res.ok) {
        throw new Error(res.mensaje)
    }
    const { data, pagination } = res
    return (
        <div className="flex flex-col m-10">
            <div className="flex gap-20 items-center mb-5">
                <div>
                    <h1 className="text-2xl font-bold">Ranking de productos</h1>
                    <p>Un ranking de todos los productos segun cuántos han vendido.</p>
                </div>
                
                <div className=" flex flex-col gap-2 items-center rounded-2xl text-xl bg-emerald-700 p-5">
                    <h2 className="font-medium">Producto más vendido:</h2>
                    <p className="text-sm">{kpi.producto}, generando ${kpi.total_generado}</p>
                </div>
            </div>

            <Suspense fallback={<p>Búsquedas</p>}>
                <div className="flex gap-5">
                    <Filtrado categorias={categorias}/>
                    <Busqueda tipo="producto"/>
                </div>
            </Suspense>

            <div className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                <p>Producto</p>
                <p>Categoria</p>
                <p>Total generado</p>
                <p>Posición</p>
                <p>Stock disponible</p>
            </div>
            {data.map((dato:reporte4Type, key:number) => (
                <div key={key} className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                    <p>{dato.producto}</p>
                    <p>{dato.categoria}</p>
                    <p>{dato.total_generado}</p>
                    <p>{dato.ranking}</p>
                    <p>{dato.stock_disponible}</p>
                </div>
            ))}

            <Paginacion paginaActual={pagination.pagina} paginasTotales={pagination.totalPaginas}/>
        </div>
    )
}