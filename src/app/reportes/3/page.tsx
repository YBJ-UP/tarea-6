import Paginacion from "@/components/paginacion"
import Busqueda from "@/components/busqueda"
import { Suspense } from "react"
import { getKPI, paginarRep3, reporte3Type } from "@/shared/interfaces/reporte_3"

export const dynamic = 'force-dynamic'

export default async function reporte_3 (props: { searchParams?:Promise<{[key:string]: string}> }) {
    const kpi = await getKPI()
    const res = await paginarRep3(props)
    if (!res.ok) {
        throw new Error(res.mensaje)
    }
    const { data, pagination } = res
    
    return (
        <>
            <div className="m-10">

                <div className="flex gap-20 items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Alumnos preocupantes</h1>
                        <p>Alumnos con calificaciones bajas o pocas asistencias.</p>
                    </div>
                    
                    <div className=" flex flex-col gap-2 items-center rounded-2xl text-xl bg-red-700 p-5">
                        <h2 className="font-medium">Alumno con el promedio más bajo:</h2>
                        <p className="text-sm">{kpi.nombre} ({kpi.correo}) con {kpi.promedio_calificaciones}</p>
                    </div>
                </div>

                <Suspense fallback={<p>Búsquedas</p>}>
                    <Busqueda />
                </Suspense>
                
                <div className="my-5">
                    <div className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                        <p>Nombre del alumno</p>
                        <p>Correo electrónico</p>
                        <p>Promedio de calificaciones</p>
                        <p>Promedio de asistencias</p>
                    </div>
                    {data.map((dato:reporte3Type, key:number) => (
                        <div key={key} className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                            <p>{dato.nombre}</p>
                            <p>{dato.correo}</p>
                            <p>{dato.promedio_calificaciones}</p>
                            <p>{dato.promedio_asistencias}</p>
                        </div>
                    ))}
                </div>

                <Paginacion paginaActual={pagination.pagina} paginasTotales={pagination.totalPaginas} ruta="/reportes/3"/>
            </div>
        </>
    )
}