import z from "zod";

export const paginaSchema = z.object({
    page: z.coerce.number().positive().min(1).default(1).catch(1)
})

export type pagina = z.infer<typeof paginaSchema>

interface paginadoExitoso {
    ok: true,
    data: any,
    pagination: {
        pagina: number,
        limite: number,
        totalFilasBien: number,
        totalPaginas: number
    }
}

interface paginadoFallido {
    ok: false,
    mensaje: string
}

export type paginado = paginadoExitoso | paginadoFallido