export default async function page( { params } : { params:Promise<{ categoria:string }> } ) {
    const { categoria } = await params

    return (
        <div>
            <h1>CATEGORÍA {categoria}</h1>
        </div>
    )
}