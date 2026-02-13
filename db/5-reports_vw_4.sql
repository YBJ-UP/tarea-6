--REPORTE 4
--¿Qué devuelve? un ranking de productos segun lo que han vendido
--Grain: Cada fila es un producto
--Métricas: el total generado y el ranking
--¿Por qué GROUP BY/HAVING?
--  Se utiliza GROUP BY para que agrupe filas con los mismos valores segun lo que se especifica
CREATE OR REPLACE VIEW vw_ranking_productos AS
    SELECT
        p.nombre as producto,
        c.nombre as categoria,
        COALESCE( SUM( od.subtotal ), 0 ) AS total_generado,
        RANK() OVER ( ORDER BY COALESCE( SUM( od.subtotal ), 0 ) DESC ) AS ranking,
        p.stock AS stock_disponible
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    LEFT JOIN orden_detalles od on p.id = od.producto_id
    GROUP BY p.nombre, c.nombre, p.stock;

SELECT * FROM vw_ranking_productos;