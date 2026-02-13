import { getKPI, getReporte2, reporte2Type } from "@/shared/interfaces/reporte_2"
import Paginacion from "@/components/ui/paginacion"
import Busqueda from "@/components/ui/busqueda"

export const dynamic='force-dynamic'

export default async function reporte_2 (props: { searchParams?:Promise<{[key:string]: string}> }) {
    const kpi = await getKPI()
    const res = await getReporte2(props)
    if (!res.ok) {
        throw new Error(res.mensaje)
    }
    const { data, pagination } = res
    return (
        <div className="m-10">

            <div className="flex gap-20 items-center">
                <div>
                    <h1 className="text-2xl font-bold">Ventas por usuarios</h1>
                    <p>Usuarios ordenados por quienes han gastado la mayor cantidad de dinero.</p>
                </div>
                
                <div className="flex flex-col gap-2 items-center rounded-2xl text-xl bg-emerald-700 p-5">
                    <h2 className="font-medium">Docente con mayor carga:</h2>
                    <p className="text-sm">{kpi.nombre} con un promedio de {kpi.promedio_gastado}, su última compra fue en {kpi.ultima_compra.toDateString()} alumnos</p>
                </div>
            </div>

            <Busqueda />

            <div className="my-5">
                <div className="grid grid-cols-6 items-center border-2 border-amber-50 p-2">
                    <p>Nombre</p>
                    <p>Correo</p>
                    <p>Total gastado</p>
                    <p>Promedio gastado</p>
                    <p>Compras totales</p>
                    <p>Última compra</p>
                </div>
                {data.map((dato:reporte2Type, key:number) => (
                    <div key={key} className="grid grid-cols-6 items-center border-2 border-amber-50 p-2">
                        <p>{dato.nombre}</p>
                        <p>{dato.email}</p>
                        <p>{dato.total_gastado}</p>
                        <p>{dato.promedio_gastado}</p>
                        <p>{dato.compras_realizadas}</p>
                        <p>{dato.ultima_compra.toDateString()}</p>
                    </div>
                ))}
            </div>

            <Paginacion paginaActual={pagination.pagina} paginasTotales={pagination.totalPaginas} />
        </div>
    )
}