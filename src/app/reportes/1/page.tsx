import Filtrado from "@/components/filtrado";
import { getKPI, getProgramas, getReporte1, reporte1 } from "@/shared/interfaces/reporte_1";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function reporte_1 (props: { searchParams?:Promise<{[key:string]: string}> }) {
    const reporte:reporte1[] = await getReporte1(props)
    const kpi = await getKPI()
    const programas:{programa:string}[] = await getProgramas()
    return (
        <div className="flex flex-col m-10">
            <div className="flex gap-20 items-center">
                <div>
                    <h1 className="text-2xl font-bold">Rendimiento del curso</h1>
                    <p>Promedio general del curso y número de reprobados.</p>
                </div>
                
                <div className=" flex gap-2 items-center rounded-2xl text-xl bg-emerald-700 p-5">
                    <h2 className="font-medium">Promedio más alto:</h2>
                    <p>{kpi.promedio} del {kpi.periodo}° periodo de {kpi.programa}</p>
                </div>
            </div>

            <Suspense fallback={<></>}>
                <Filtrado programas={programas}/>
            </Suspense>

            <div className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                <p>CURSO</p>
                <p>PERIODO</p>
                <p>PROGRAMA</p>
                <p>PROMEDIO</p>
                <p>REPROBADOS</p>
            </div>
            {reporte.map((rep, key:number) => (
                <div key={key} className="grid grid-cols-5 items-center border-2 border-amber-50 p-2">
                    <p>{rep.curso}</p>
                    <p>{rep.periodo}</p>
                    <p>{rep.programa}</p>
                    <p>{rep.promedio}</p>
                    <p>{rep.reprobados}</p>
                </div>
            ))}
        </div>
    )
}