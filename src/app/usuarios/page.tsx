import Link from "next/link"

export default function page() {
    return (
        <div>
            <h1>Usuarios:</h1>
            <Link href='/usuarios/1'>Pablito</Link>
        </div>
    )
}