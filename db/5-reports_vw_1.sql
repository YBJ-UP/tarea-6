--REPORTE 1
--¿Qué devuelve? Los productos, la cantidad existente, la cantidad comprada y el dinero generado de estas ventas
--Grain: Cada fila representa un producto
--Métricas: La cantidad comprada y el dinero generado
--¿Por qué GROUP BY/HAVING?
--  Se utiliza GROUP BY para que agrupe filas con los mismos valores segun lo que se especifica
CREATE OR REPLACE VIEW vw_stock_vendido AS
    SELECT
        p.codigo,
        p.nombre,
        p.stock AS stock_disponible,
        p.precio,
        COALESCE( SUM( od.cantidad ), 0 ) AS unidades_vendidas,
        p.precio * COALESCE( SUM( od.cantidad ), 0 ) AS dinero_generado,
        CASE
            WHEN p.stock = 0 THEN 'AGOTADO'
            WHEN p.stock < 50 THEN 'BAJO'
            WHEN COALESCE( SUM( od.cantidad ), 0 ) = 0 THEN 'SIN VENTAS'
            ELSE 'NORMAL'
        END AS estado
    FROM productos p
    JOIN orden_detalles od ON p.id = od.producto_id
    GROUP BY p.codigo, p.nombre, p.stock, p.precio
    ORDER BY p.stock DESC;

SELECT * FROM vw_stock_vendido;