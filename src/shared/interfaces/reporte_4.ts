import { query } from "@/lib/db";
import z from "zod"
import { paginado, paginaSchema } from "./pagina";

export const reporte4Schema = z.object({
    producto: z.string().min(1),
    categoria: z.string().min(1),
    total_generado: z.number().min(0),
    ranking: z.number().min(0),
    stock_disponible: z.number().min(0)
})

export type reporte4Type = z.infer<typeof reporte4Schema>

export async function getReporte4(props: { searchParams?:Promise<{[key:string]: string}> }):Promise<paginado> {
    const searchParams = await props.searchParams

    const paginaUnparsed:{page:string} = {page: searchParams?.page || '1'}
    const paginaParsed = paginaSchema.parse(paginaUnparsed)
    const {page} = paginaParsed
    const limite = 5
    const offset = (page-1)*limite

    const categoria = searchParams?.categoria || ''
    const producto = searchParams?.producto || ''

    try {
        let totalFilas
        let totalFilasBien
        let totalPaginas
        let res

        if (categoria && producto) {
            res = await query("SELECT * FROM vw_ranking_productos WHERE categoria = $3 AND producto ILIKE $4 LIMIT $1 OFFSET $2;", [limite,offset, categoria, `%${producto}%`])
            totalFilas = await query('SELECT COUNT(*) FROM vw_ranking_productos WHERE categoria = $1 AND producto ILIKE $2;', [categoria, `%${producto}%`])
        } else if (categoria) {
            res = await query("SELECT * FROM vw_ranking_productos WHERE categoria = $3 LIMIT $1 OFFSET $2;", [limite,offset, categoria])
            totalFilas = await query('SELECT COUNT(*) FROM vw_ranking_productos WHERE categoria = $1;', [categoria])
        } else if (producto) {
            res = await query("SELECT * FROM vw_ranking_productos WHERE producto ILIKE $3 LIMIT $1 OFFSET $2;", [limite,offset, `%${producto}%`])
            totalFilas = await query('SELECT COUNT(*) FROM vw_ranking_productos WHERE producto ILIKE $1;', [`%${producto}%`])
        } else {
            res = await query('SELECT * FROM vw_ranking_productos LIMIT $1 OFFSET $2;', [limite,offset])
            totalFilas = await query('SELECT COUNT(*) FROM vw_ranking_productos;')
        }

        const rows:reporte4Type[] = res.rows

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
        const res = await query('SELECT producto, categoria, total_generado FROM vw_ranking_productos ORDER BY total_generado DESC LIMIT 1;')
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
        const res = await query('SELECT DISTINCT categoria FROM vw_ranking_productos;')
        if (!res.rows) {
            throw new Error('Error al conseguir los datos')
        }
        const categorias:{categoria:string}[] = res.rows
        return categorias
    } catch (error:any) {
        throw new Error(error.message)
    }
}