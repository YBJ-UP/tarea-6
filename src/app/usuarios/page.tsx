import Carta from "@/components/ui/carta"
import { query } from "@/lib/db"
import usuario from "@/shared/interfaces/usuario"

export const dynamic = 'force-dynamic'

export default async function page() {
    const res = await query('SELECT nombre, email, id FROM usuarios;') //rechaza la conexion
    const data:usuario[] = res.rows
    return (
        <div>
            <h1 className="text-2xl px-10 py-2 bg-amber-800">Usuarios: hola desde dóquer</h1>
            
            <section className="grid grid-cols-3 gap-5 m-10">
                {data.map((usuario) => ( <Carta key={usuario.id} usuario={usuario} /> ))}
            </section>

        </div>
    )
}