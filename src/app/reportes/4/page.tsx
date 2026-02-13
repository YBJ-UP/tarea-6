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
                    <h1 className="text-2xl font-bold">Asistencias por grupo</h1>
                    <p>Porcentaje de asistencias por cada grupo.</p>
                </div>
                
                <div className=" flex flex-col gap-2 items-center rounded-2xl text-xl bg-red-700 p-5">
                    <h2 className="font-medium">Grupo con menos asistencias:</h2>
                    <p className="text-sm">Grupo {kpi.grupo} del periodo {kpi.periodo} con un {kpi.promedio_asistencias}% de asistencias</p>
                </div>
            </div>

            <Suspense fallback={<p>Búsquedas</p>}>
                <Filtrado categorias={categorias}/>
                <Busqueda tipo="producto"/>
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