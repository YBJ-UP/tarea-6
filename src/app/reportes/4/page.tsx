import { getKPI, getReporte4, reporte4Type } from "@/shared/interfaces/reporte_4"

export const dynamic = 'force-dynamic'

export default async function reporte_4 () {
    const kpi = await getKPI()
    const data:reporte4Type[] = await getReporte4()
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

            <div className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                <p>Grupo</p>
                <p>Periodo</p>
                <p>Promedio de asistencias</p>
            </div>
            {data.map((dato, key:number) => (
                <div key={key} className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                    <p>{dato.grupo}</p>
                    <p>{dato.periodo}</p>
                    <p>{dato.promedio_asistencias}</p>
                </div>
            ))}
        </div>
    )
}