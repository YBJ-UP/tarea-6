import usuario from "@/shared/interfaces/usuario";
import Link from "next/link";

export default function Carta({ usuario }: { usuario:Omit<usuario,'pw_hash'> }) {
    return (
        <Link href={`/usuarios/${usuario.id}`} className="bg-amber-600 flex flex-col gap-2.5 p-5 rounded-2xl">
            <h2 className="text-xl">Nombre: {usuario.nombre}</h2>
            <p>Correo: {usuario.email}</p>
        </Link>
    )
}