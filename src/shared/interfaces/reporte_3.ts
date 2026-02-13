import { query } from "@/lib/db";
import z from "zod"
import { paginado, paginaSchema } from "./pagina";

export const reporte3Schema = z.object({
    categoria: z.string().min(1),
    ordenes_totales: z.number().min(0),
    ordenes_canceladas: z.number().min(0),
    total_generado: z.number().min(0),
    promedio_exitos: z.number().min(0.0)
})

export type reporte3Type = z.infer<typeof reporte3Schema>

export async function getReporte3(props: { searchParams?:Promise<{[key:string]: string}> }):Promise<paginado> {
    const searchParams = await props.searchParams

    const paginaUnparsed:{page:string} = {page: searchParams?.page || '1'}
    const paginaParsed = paginaSchema.parse(paginaUnparsed)
    const {page} = paginaParsed
    const limite = 5
    const offset = (page-1)*limite

    const filtro = searchParams?.categoria || ''

    try {
        let totalFilas
        let totalFilasBien
        let totalPaginas
        let res

        if (filtro) {
            res = await query("SELECT * FROM vw_ventas_categorias WHERE categoria = $3 LIMIT $1 OFFSET $2;", [limite,offset, filtro])
            totalFilas = await query('SELECT COUNT(*) FROM vw_ventas_categorias WHERE categoria = $1;', [filtro])
        } else {
            res = await query('SELECT * FROM vw_ventas_categorias LIMIT $1 OFFSET $2;', [limite,offset])
            totalFilas = await query('SELECT COUNT(*) FROM vw_ventas_categorias;')
        }

        const rows:reporte3Type[] = res.rows

        totalFilasBien = parseInt(totalFilas.rows[0].count)
        totalPaginas = Math.ceil(totalFilasBien/limite)

        return {
            ok:true,
            data:rows,
            pagination: {
                pagina: page,
                limite,
                totalFilasBien,
                totalPaginas
            }
        }
    } catch (error:any) {
        return {
            ok:false,
            mensaje: error.message
        }
    }
}

export async function getKPI() {
    try {
        const res = await query('SELECT categoria, ordenes_totales, total_generado FROM vw_ventas_categorias ORDER BY total_generado DESC LIMIT 1;')
        if (!res.rows) {
            throw new Error('Error al obtener la KPI')
        }
        const kpi = res.rows[0]
        return kpi
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export async function getCategorias() {
    try {
        const res = await query('SELECT DISTINCT categoria FROM vw_ventas_categorias;')
        if (!res.rows) {
            throw new Error('Error al conseguir los datos')
        }
        const categorias:{categoria:string}[] = res.rows
        return categorias
    } catch (error:any) {
        throw new Error(error.message)
    }
}