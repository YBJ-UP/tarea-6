export default async function ( { params }: { params:Promise<{ usuario:string }> } ) {
    const { usuario } = await params

    return (
        <div>
            <p>Aquí deberían de estar las órdenes del usuario {usuario}</p>
            <p>Aquí deberían de estar los detalles de la orden pero de apenas empecé</p>
        </div>
    )
}