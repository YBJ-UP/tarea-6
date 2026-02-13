import { reporte } from "@/shared/interfaces/reporte";
import Carta from "@/components/ui/carta";

export default function Home() {
  const reportes:reporte[] = [
    {titulo:'Rendimiento de curso', descripcion:'Promedio general del curso y la cantidad de reprobados', numero:1},
    {titulo:'Carga de maestro', descripcion:'Cuántos grupos y alumnos están bajo la tutela de cada profesor', numero:2},
    {titulo:'Alumnos preocupantes', descripcion:'Alumnos con calificaciones bajas y pocas asistencias', numero:3},
    {titulo:'Asistencias por grupo', descripcion:'Porcentaje de asistencias en cada grupo', numero:4},
    {titulo:'Tablero de estudiantes', descripcion:'Ordena a los alumnos según sus calificaciones', numero:5}
  ]
  return (
    <div>
      <div className="flex flex-col gap-5 p-10">
        {reportes.map((reporte) => ( <Carta key={reporte.numero} reporte={reporte} /> ))}
      </div>
    </div>
  );
}
