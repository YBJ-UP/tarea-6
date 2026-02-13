import Filtrado from "@/components/ui/filtrado";
import Paginacion from "@/components/ui/paginacion";
import { getKPI, getCategorias, getReporte1, reporte1Type } from "@/shared/interfaces/reporte_1";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function reporte_1 (props: { searchParams?:Promise<{[key:string]: string}> }) {
    const res = await getReporte1(props)
    if (!res.ok) {
        throw new Error(res.mensaje)
    }
    const { data, pagination } = res
    const kpi = await getKPI()
    const categorias:{categoria:string}[] = await getCategorias()
    return (
        <div className="flex flex-col m-10">
            <div className="flex gap-20 items-center">
                <div>
                    <h1 className="text-2xl font-bold">Rendimiento del curso</h1>
                    <p>Promedio general del curso y número de reprobados.</p>
                </div>
                
                <div className=" flex gap-2 items-center rounded-2xl text-xl bg-emerald-700 p-5">
                    <h2 className="font-medium">Producto más vendido:</h2>
                    <p>{kpi.nombre} con {kpi.unidades_vendidas} unidades vendias</p>
                </div>
            </div>

            <Suspense fallback={<></>}>
                <Filtrado categorias={categorias}/>
            </Suspense>

            <div className="grid grid-cols-6 items-center border-2 border-amber-50 p-2">
                <p>CATEGORIA</p>
                <p>PRODUCTO</p>
                <p>STOCK DISPONIBLE</p>
                <p>PRECIO</p>
                <p>UNIDADES VENDIDAS</p>
                <p>ESTADO</p>
            </div>
            {data.map((rep:reporte1Type, key:number) => (
                <div key={key} className="grid grid-cols-6 items-center border-2 border-amber-50 p-2">
                    <p>{rep.categoria}</p>
                    <p>{rep.nombre}</p>
                    <p>{rep.stock_disponible}</p>
                    <p>{rep.precio}</p>
                    <p>{rep.unidades_vendidas}</p>
                    <p>{rep.estado}</p>
                </div>
            ))}

            <Paginacion paginaActual={pagination.pagina} paginasTotales={pagination.totalPaginas} />
        </div>
    )
}