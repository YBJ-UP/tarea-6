import { reporte } from "@/shared/interfaces/reporte";
import Carta from "@/components/ui/carta";

export default function Home() {
  const reportes:reporte[] = [
    {titulo:'Rendimiento de productos', descripcion:'La cantidad de productos que se han venido, así como su estado', numero:1},
    {titulo:'Ventas por usuarios', descripcion:'Usuarios ordenados por quienes han gastado la mayor cantidad de dinero.', numero:2},
    {titulo:'Ventas por categorías', descripcion:'Alumnos con calificaciones bajas y pocas asistencias', numero:3},
    {titulo:'Ranking de productos', descripcion:'Porcentaje de asistencias en cada grupo', numero:4},
    {titulo:'Usuarios mayores al promedio', descripcion:'Un promedio de cuanto han gastado todos los usuarios y quienes han gastado más que eso.', numero:5}
  ]
  return (
    <div>
      <div className="flex flex-col gap-5 p-10">
        {reportes.map((reporte) => ( <Carta key={reporte.numero} reporte={reporte} /> ))}
      </div>
    </div>
  );
}
