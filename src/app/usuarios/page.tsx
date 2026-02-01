import Carta from "@/components/ui/carta"
import { users } from "../../../db/cosas"
import { query } from "@/lib/db"

export const dynamic = 'force-dynamic'

export default async function page() {
    const data = await query('SELECT * FROM ordenes') //rechaza la conexion
    return (
        <div>
            <h1 className="text-2xl px-10 py-2 bg-amber-800">Usuarios: hola desde dóquer</h1>
            
            <section className="grid grid-cols-3 gap-5 m-10">
                {users.map((usuario) => ( <Carta key={usuario.id} usuario={usuario} /> ))}
            </section>

        </div>
    )
}