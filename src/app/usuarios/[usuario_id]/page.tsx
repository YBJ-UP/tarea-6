import Link from "next/link"
import { users } from "../../../../db/cosas"
import usuario from "@/shared/interfaces/usuario"

export default async function ( { params }: { params:Promise<{ usuario_id:number }> } ) {
    const { usuario_id } = await params
    const usuario:Omit<usuario, 'pw_hash'>|undefined = users.find((usuario) => usuario.id == usuario_id)
    if (!usuario) {
        throw new Error("Error al conseguir el usuario")
    }

    return (
        <div>
            <Link href='/usuarios' className="block text-2xl px-10 py-2 bg-amber-800">Regresar</Link>

            <section className="grid grid-cols-2 gap-5 m-10">
                <div>
                    <p>Usuario: {usuario.nombre}</p>
                    <p>Correo electrónico: {usuario.email}</p>
                </div>
            </section>
        </div>
    )
}