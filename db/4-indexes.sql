-- ============================================
-- ÍNDICES (para optimizar consultas)
-- ============================================

-- Índice para búsquedas por usuario en órdenes
CREATE INDEX idx_ordenes_usuario_id ON ordenes(usuario_id);

-- Índice para búsquedas por categoría en productos
CREATE INDEX idx_productos_categoria_id ON productos(categoria_id);

-- Índice para búsquedas por status de orden
CREATE INDEX idx_ordenes_status ON ordenes(status);