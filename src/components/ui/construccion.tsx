import Image from "next/image";
import Link from "next/link";

export default function construyendo() {
    return (
        <div className="flex flex-col items-center m-10">
            <Image
                src="/chambeador.jpg"
                alt="En construcción..."
                width={500}
                height={500}
                className="rounded-2xl"
            />
            <p className="font-bold">Página en construcción...</p>
            <p>Aún no me dan ganas de hacerla</p>
            <br />
            <Link href={'/'} className="bg-blue-500 px-10 py-5 rounded-2xl hover:bg-blue-400">Regresar al tablero</Link>
        </div>
    );
}