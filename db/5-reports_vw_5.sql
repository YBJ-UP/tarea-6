--REPORTE 5
--¿Qué devuelve? Los usuarios que hacen compras mayores al promedio de todas las compras
--Grain: Cada fila es un usuario
--Métricas: a
--¿Por qué GROUP BY/HAVING?
--  Se utiliza GROUP BY para que agrupe filas con los mismos valores segun lo que se especifica
CREATE OR REPLACE VIEW vw_usuarios_pagudos AS
    WITH promedio_tienda AS (
        SELECT
            ROUND( AVG( o.total ), 2 ) as total_gastado
        FROM ordenes o
    )
    SELECT
        u.nombre