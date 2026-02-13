import Link from "next/link";
import { reporte } from "@/shared/interfaces/reporte";

export default function Carta({ reporte }: { reporte:reporte }) {
    return (
        <Link href={`/reportes/${reporte.numero}`} className="bg-blue-900 flex flex-col gap-2.5 p-5 rounded-2xl hover:bg-indigo-900">
            <h2 className="text-xl">{reporte.titulo}</h2>
            <p>{reporte.descripcion}</p>
        </Link>
    )
}