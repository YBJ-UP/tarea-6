--REPORTE 5
--¿Qué devuelve? Los usuarios que hacen compras mayores al promedio de todas las compras
--Grain: Cada fila es un usuario
--Métricas: a
--¿Por qué GROUP BY/HAVING?
--  Se utiliza GROUP BY para que agrupe filas con los mismos valores segun lo que se especifica
--  Se usa HAVING para filtrar por los usuarios que hayan gastado más del promedio
CREATE OR REPLACE VIEW vw_usuarios_pagudos AS
    WITH promedio_tienda AS (
        SELECT
            ROUND( AVG( o.total ), 2 ) as total_gastado
        FROM ordenes o
    )
    SELECT
        u.nombre,
        u.email,
        COUNT( DISTINCT o.id ) as ordenes_totales,
        SUM( o.total ) as total_gastado
    FROM usuarios u
    JOIN ordenes o ON u.id = o.usuario_id
    GROUP BY u.nombre, u.email
    ORDER BY SUM( o.total )
    HAVING SUM( o.total ) > (SELECT total_gastado FROM promedio_tienda);

SELECT * FROM vw_usuarios_pagudos;