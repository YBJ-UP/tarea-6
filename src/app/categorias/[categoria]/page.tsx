export default async function page( { params } : { params:Promise<{ categoria:number }> } ) {
    const { categoria } = await params

    return (
        <div>
            <h1>CATEGORÍA {categoria}</h1>
        </div>
    )
}