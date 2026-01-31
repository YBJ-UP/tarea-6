import Carta from "@/components/ui/carta"
import usuario from "@/shared/interfaces/usuario"

export default function page() {
    const hola:usuario[] = [
        { id:1, email:'hola@ksjs.com', nombre:'yo', pw_hash:'12345678', activo:false },
        { id:2, email:'ola@ksjs.com', nombre:'eu', pw_hash:'12345678', activo:false },
        { id:3, email:'holaenitialiano@ksjs.com', nombre:'io', pw_hash:'12345678', activo:false },
        { id:4, email:'helllo@ksjs.com', nombre:'i', pw_hash:'12345678', activo:false },
    ]
    return (
        <div>
            <h1 className=" text-2xl">Usuarios:</h1>
            
            <section className="w-3/6 flex flex-col gap-5 mx-10">
                {hola.map((usuario) => ( <Carta key={usuario.id} usuario={usuario} /> ))}
            </section>

        </div>
    )
}