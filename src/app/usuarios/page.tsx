import Carta from "@/components/ui/carta"
import { users } from "../../../db/cosas"

export default function page() {
    return (
        <div>
            <h1 className="text-2xl px-10 py-2 bg-amber-800">Usuarios:</h1>
            
            <section className="grid grid-cols-3 gap-5 m-10">
                {users.map((usuario) => ( <Carta key={usuario.id} usuario={usuario} /> ))}
            </section>

        </div>
    )
}