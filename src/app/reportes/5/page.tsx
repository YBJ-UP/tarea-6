import Busqueda from "@/components/ui/busqueda"
import Paginacion from "@/components/ui/paginacion"
import { getKPI, getReporte5, reporte5Type } from "@/shared/interfaces/reporte_5"

export const dynamic = 'force-dynamic'

export default async function reporte_2 (props: { searchParams?:Promise<{[key:string]: string}> }) {
    const kpi = await getKPI()
    const res = await getReporte5(props)
    if (!res.ok) {
        throw new Error(res.mensaje)
    }
    const { data, pagination } = res
    return (
        <div className="m-10">

            <div className="flex gap-20 items-center">
                <div>
                    <h1 className="text-2xl font-bold">Usuarios mayores al promedio</h1>
                    <p>Un promedio de cuanto han gastado todos los usuarios y quienes han gastado más que eso.</p>
                </div>
                
                <div className="flex flex-col gap-2 items-center rounded-2xl text-xl bg-emerald-700 p-5">
                    <h2 className="font-medium">El promedio gastado de todos los usuarios es de:</h2>
                    <p className="text-xl">${kpi.promedio_total}</p>
                </div>
            </div>

            <Busqueda tipo="nombre"/>

            <div className="my-5">
                <div className="grid grid-cols-4 items-center border-2 border-amber-50 p-2">
                    <p>Nombre</p>
                    <p>Correo</p>
                    <p>Órdenes totales</p>
                    <p>Total gastado</p>
                </div>
                {data.map((dato:reporte5Type, key:number) => (
                    <div key={key} className="grid grid-cols-4 items-center border-2 border-amber-50 p-2">
                        <p>{dato.nombre}</p>
                        <p>{dato.email}</p>
                        <p>{dato.ordenes_totales}</p>
                        <p>{dato.total_gastado}</p>
                    </div>
                ))}
            </div>

            <Paginacion paginaActual={pagination.pagina} paginasTotales={pagination.totalPaginas} />
        </div>
    )
}