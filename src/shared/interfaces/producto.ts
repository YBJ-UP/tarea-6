export default interface producto {
    id:number,
    codigo:string,
    nombre:string,
    descripcion?:string,
    precio:number,
    stock:number,
    categoria_id:number,
    activo?:boolean
}