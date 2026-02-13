'use client';
import Image from "next/image";
import Link from "next/link";

export default function error() {
    return (
        <div>
            <div className="flex flex-col items-center m-10">
                <Image src='/michitecnico.jpg' alt="Arreglando errores" width={500} height={500} className="rounded-2xl" />
                <h1>Ocurrió un error en la aplicación...</h1>
                <p>Intente de nuevo</p>
                <Link href={'/'} className="bg-blue-500 px-10 py-5 rounded-2xl hover:bg-blue-400">Regresar al tablero</Link>   
            </div>
        </div>
        
    )
}