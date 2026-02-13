--REPORTE 1
--¿Qué devuelve? Los productos, la cantidad existente, la cantidad comprada y el dinero generado de estas ventas
--Grain: Cada fila representa un producto
--Métricas: La cantidad comprada y el dinero generado
--¿Por qué GROUP BY/HAVING?
CREATE OR REPLACE VIEW vw_stock_vendido AS
    SELECT
        p.codigo,
        p.nombre,
        p.stock AS stock_disponible,
        COALESCE( SUM( od.cantidad ), 0 ) AS unidades_vendidas,
        p.precio * COALESCE( od.cantidad, 0 ) AS dinero_generado,
        CASE
            WHEN p.stock = 0 THEN 'AGOTADO'
            WHEN p.stock < 20 THEN 'BAJO'
            WHEN COALESCE( SUM( od.cantidad ), 0 ) = 0 THEN 'SIN VENTAS'
            ELSE 'NORMAL'