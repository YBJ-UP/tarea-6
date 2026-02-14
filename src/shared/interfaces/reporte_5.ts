import { query } from "@/lib/db";
import z from "zod"
import { paginado, paginaSchema } from "./pagina";

export const reporte5Schema = z.object({
    nombre: z.string().min(1),
    email: z.string().min(1).max(100),
    total_gastado: z.number().min(1),
    ordenes_totales: z.number().min(0.0)
})

export type reporte5Type = z.infer<typeof reporte5Schema>

export async function getReporte5(props: { searchParams?:Promise<{[key:string]: string}> }):Promise<paginado> {
    const searchParams = await props.searchParams

    const paginaUnparsed:{page:string} = {page: searchParams?.page || '1'}
    const paginaParsed = paginaSchema.parse(paginaUnparsed)
    const {page} = paginaParsed
    const limite = 5
    const offset = (page-1)*limite

    const filtro = searchParams?.nombre || ''

    try {
        let totalFilas
        let totalFilasBien
        let totalPaginas
        let res

        if (filtro) {
            res = await query("SELECT * FROM vw_usuarios_pagudos WHERE nombre ILIKE $3 LIMIT $1 OFFSET $2;", [limite,offset, `%${filtro}%`])
            totalFilas = await query('SELECT COUNT(*) FROM vw_usuarios_pagudos WHERE nombre ILIKE $1;', [`%${filtro}%`])
        } else {
            res = await query('SELECT * FROM vw_usuarios_pagudos LIMIT $1 OFFSET $2;', [limite,offset])
            totalFilas = await query('SELECT COUNT(*) FROM vw_usuarios_pagudos;')
        }

        const rows:reporte5Type[] = res.rows

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
        const res = await query('SELECT * FROM vw_usuarios_pagudos_kpi;')
        if (!res.rows) {
            throw new Error('Error al obtener la KPI')
        }
        const kpi = res.rows[0]
        return kpi
    } catch (error:any) {
        throw new Error(error.message)
    }
}