import Filtrado from "@/components/ui/filtrado"
import { getKPI, getProgramas, getReporte5, reporte5Type } from "@/shared/interfaces/reporte_5"

export const dynamic = 'force-dynamic'

export default async function reporte_5 (props: { searchParams?:Promise<{[key:string]: string}> }) {
    const kpi = await getKPI()
    const data:reporte5Type[] = await getReporte5(props)
    const programas = await getProgramas()
    return (
        <div className="m-10">
            <div className="flex gap-20 items-center mb-5">
                <div>
                    <h1 className="text-2xl font-bold">Usuarios mayores al promedio</h1>
                    <p>Un promedio de cuanto han gastado todos los usuarios y quiénes han gastado más que eso.</p>
                </div>
                
                <div className=" flex flex-col gap-2 items-center rounded-2xl text-xl bg-emerald-700 p-5">
                    <h2 className="font-medium">Alumno con mayor promedio:</h2>
                    <p className="text-sm">{kpi.estudiante} del {kpi.periodo}° periodo del grupo {kpi.grupo} con un promedio de {kpi.promedio}</p>
                </div>
            </div>

            <Filtrado programas={programas}/>

            <div className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                <p>Estudiante</p>
                <p>Programa</p>
                <p>Periodo</p>
                <p>Promedio</p>
                <p>Lugar</p>
            </div>
            {data.map((dato, key:number) => (
                <div key={key} className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                    <p>{dato.estudiante}</p>
                    <p>{dato.programa}</p>
                    <p>{dato.periodo}</p>
                    <p>{dato.promedio}</p>
                    <p>{dato.lugar}</p>
                </div>
            ))}
        </div>
    )
}