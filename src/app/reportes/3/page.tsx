import Paginacion from "@/components/ui/paginacion"
import { Suspense } from "react"
import { getCategorias, getKPI, getReporte3, reporte3Type } from "@/shared/interfaces/reporte_3"
import Filtrado from "@/components/ui/filtrado"

export const dynamic = 'force-dynamic'

export default async function reporte_3 (props: { searchParams?:Promise<{[key:string]: string}> }) {
    const kpi = await getKPI()
    const res = await getReporte3(props)
    const categorias:{categoria:string}[] = await getCategorias()
    if (!res.ok) {
        throw new Error(res.mensaje)
    }
    const { data, pagination } = res
    
    return (
        <>
            <div className="m-10">

                <div className="flex gap-20 items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Ventas por categorías</h1>
                        <p>Las categorías ordenadas según la cantidad de órdenes que ha recibido.</p>
                    </div>
                    
                    <div className="flex flex-col gap-2 items-center rounded-2xl text-xl bg-red-700 p-5">
                        <h2 className="font-medium">Alumno con el promedio más bajo:</h2>
                        <p className="text-sm">{kpi.nombre} ({kpi.correo}) con {kpi.promedio_calificaciones}</p>
                    </div>
                </div>

                <Suspense fallback={<p>Búsquedas</p>}>
                    <Filtrado categorias={categorias}/>
                </Suspense>
                
                <div className="my-5">
                    <div className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                        <p>Categoria</p>
                        <p>Órdenes totales</p>
                        <p>Órdenes canceladas</p>
                        <p>Total generado</p>
                        <p>Promedio de éxitos</p>
                    </div>
                    {data.map((dato:reporte3Type, key:number) => (
                        <div key={key} className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                            <p>{dato.categoria}</p>
                            <p>{dato.ordenes_totales}</p>
                            <p>{dato.ordenes_canceladas}</p>
                            <p>{dato.total_generado}</p>
                            <p>{dato.promedio_exitos}</p>
                        </div>
                    ))}
                </div>

                <Paginacion paginaActual={pagination.pagina} paginasTotales={pagination.totalPaginas} />
            </div>
        </>
    )
}