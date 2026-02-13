DROP ROLE IF EXISTS moderador;

CREATE ROLE moderador WITH 
LOGIN 
PASSWORD '12345678'
NOSUPERUSER
NOCREATEDB
NOCREATEROLE
INHERIT;

GRANT USAGE ON SCHEMA public TO moderador;
GRANT SELECT ON vw_stock_vendido TO moderador;
GRANT SELECT ON vw_ventas_usuarios TO moderador;
GRANT SELECT ON vw_ventas_categorias TO moderador;
GRANT SELECT ON vw_ranking_productos TO moderador;
GRANT SELECT ON vw_usuarios_pagudos TO moderador;
-- dar permiso para los reportes (cuando los haga)