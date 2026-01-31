export default interface usuario {
    id:number,
    email:string,
    nombre:string,
    pw_hash:string,
    activo?:boolean
}