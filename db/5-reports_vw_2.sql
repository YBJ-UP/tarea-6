--REPORTE 1
--¿Qué devuelve? Los usuarios que han realizado compras, sin importar el estado de estas, pero si estan canceladas o pendientes que se muestre algo
--Grain: Cada fila es un usuario
--Métricas: Cantidad de compras realizadas y el dinero gastado
--¿Por qué GROUP BY/HAVING?
--  Se utiliza GROUP BY para que agrupe filas con los mismos valores segun lo que se especifica
-- Se utiliza HAVING para asegurarse de que
CREATE OR REPLACE VIEW vw_ventas_usuarios AS
    SELECT
        u.nombre,
        u.email,
        COALESCE( SUM( o.total ), 0 ) AS total_gastado,
        COALESCE( ROUND( AVG( o.total ), 2 ), 0 ) AS promedio_gastado,
        COUNT( DISTINCT o.id ) AS compras_realizadas,
        MAX( o.created_at ) AS ultima_compra
    FROM usuarios u
    JOIN ordenes o ON u.id = o.usuario_id
    GROUP BY u.nombre, u.email
    HAVING COUNT( DISTINCT o.id ) > 0
    ORDER BY COALESCE( SUM( o.total ), 0 ) DESC;

SELECT * FROM vw_ventas_usuarios;