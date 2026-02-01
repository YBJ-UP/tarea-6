DROP ROLE IF EXISTS moderador;

CREATE ROLE moderador WITH 
LOGIN 
PASSWORD '12345678'
NOSUPERUSER
NOCREATEDB
NOCREATEROLE
INHERIT;

GRANT USAGE ON SCHEMA public TO moderador;
GRANT SELECT ON ordenes TO moderador;
GRANT SELECT ON usuarios TO moderador;
-- dar permiso para los reportes (cuando los haga)