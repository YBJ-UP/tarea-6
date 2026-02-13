import { query } from "@/lib/db";
import z from "zod"
import { paginado, paginaSchema } from "./pagina";

export const reporte1Schema = z.object({
    categoria: z.string().min(1).max(5),
    nombre: z.string().min(1).max(100),
    stock_disponible: z.number().min(1).max(15),
    precio: z.number().min(0.0),
    unidades_vendidas: z.number().min(0),
    estado: z.enum(['AGOTADO', 'BAJO', 'SIN VENTAS', 'NORMAL'])
})

export type reporte1Type = z.infer<typeof reporte1Schema>

export async function getReporte1(props: { searchParams?:Promise<{[key:string]: string}> }):Promise<paginado> {
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
            res = await query("SELECT * FROM vw_stock_vendido WHERE categoria = $3 LIMIT $1 OFFSET $2;", [limite,offset, filtro])
            totalFilas = await query('SELECT COUNT(*) FROM vw_stock_vendido WHERE categoria = $1;', [filtro])
        } else {
            res = await query('SELECT * FROM vw_stock_vendido LIMIT $1 OFFSET $2;', [limite,offset])
            totalFilas = await query('SELECT COUNT(*) FROM vw_stock_vendido;')
        }

        const rows:reporte1Type[] = res.rows

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

export async function getCategorias() {
    try {
        const res = await query('SELECT DISTINCT categoria FROM vw_stock_vendido;')
        if (!res.rows) {
            throw new Error('Error al conseguir los datos')
        }
        const categorias:{categoria:string}[] = res.rows
        return categorias
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export async function getKPI() {
    try {
        const res = await query('SELECT nombre, unidades_vendidas FROM vw_stock_vendido ORDER BY unidades_vendidas DESC LIMIT 1;')
        if (!res.rows) {
            throw new Error('Error al obtener la KPI')
        }
        const kpi = res.rows[0]
        return kpi
    } catch (error:any) {
        throw new Error(error.message)
    }
}