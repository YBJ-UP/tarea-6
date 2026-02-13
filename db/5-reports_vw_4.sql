--REPORTE 4
--¿Qué devuelve? un ranking de productos segun lo que han vendido
--Grain: Cada fila es un producto
--Métricas: a
--¿Por qué GROUP BY/HAVING?
--  a
CREATE OR REPLACE VIEW vw_ranking_productos AS
    SELECT
        p.nombre as producto,
        c.nombre as categoria,
        SUM( od.subtotal ) AS total_generado,
        RANK() OVER ( ORDER BY SUM( od.subtotal ) DESC ) AS ranking,
        p.stock AS stock_disponible,
    FROM productos p
    JOIN categorias c ON p.categoria_id = c.id
    JOIN orden_detalles od on p.id = od.producto_id
    GROUP BY p.nombre, c.nombre, p.stock;

SELECT * FROM vw_ranking_productos;