--REPORTE 3
--¿Qué devuelve? Las categorias, cuantas ordenes se han hecho de estas, cuantas fueron canceladas y un promedio de cuantas no
--Grain: Cada fila es una categoría
--Métricas: Ordenes totales, ordenes realizadas, promedio de ordenes "exitosas"
--¿Por qué GROUP BY/HAVING?
--  Se utiliza GROUP BY para que agrupe filas con los mismos valores segun lo que se especifica
CREATE OR REPLACE VIEW vw_ventas_categorias AS
    SELECT
        c.nombre as categoria,
        COUNT( DISTINCT o.id ) as ordenes_totales,
        SUM( CASE WHEN o.status = 'cancelado' THEN 1 ELSE 0 END ) AS ordenes_canceladas,
        SUM( CASE WHEN o.status != 'cancelado' THEN od.subtotal ELSE 0 END ) AS total_generado,
        COALESCE( ROUND( SUM( CASE WHEN o.status != 'cancelado' THEN 1 ELSE 0 END )/COUNT( DISTINCT o.id ) , 2 ), 0 ) AS promedio_exitos
    FROM categorias c
    JOIN productos p ON c.id = p.categoria_id
    JOIN orden_detalles od ON p.id = od.producto_id
    JOIN ordenes o ON o.id = od.orden_id
    GROUP BY c.nombre
    ORDER BY COUNT( DISTINCT o.id ) DESC;

SELECT * FROM vw_ventas_categorias;