# Inicializar el proyecto
Este proyecto es despegable con Docker compose y se puede iniciar con el siguiente comando:

```bash
docker compose up --build
```

Una vez inicializado, abra [http://localhost:3000](http://localhost:3000) en su navegador para ver el proyecto.
# Índices
La base de datos de este proyecto cuenta con 3 índices:
```sql
CREATE INDEX idx_ordenes_usuario_id ON ordenes(usuario_id);
CREATE INDEX idx_productos_categoria_id ON productos(categoria_id);
CREATE INDEX idx_ordenes_status ON ordenes(status);
```
No le puedo mentir, profe, son las que ya venían en su plantilla, no les moví nada.
# "Trade-offs"
## ¿Qué se calculó en SQL?
Dentro de SQL, se realiza la lógica de negocio, las vistas, la paginación, los filtros y las búsquedas.
### ¿Por qué?
De esta manera se reduce la cantidad de operaciones realizadas en el frontend y facilita realizar cambios en la base de datos, ya que no se tendrían que alterar operaciones dentro del front.
## ¿Qué se calculó en Next.js?
Dentro de Next.js, no se realiza ningún calculo importante, únicamente se obtiene el número de página y se calcula el *offset* necesario para la paginación; sin embargo, a través de este se envían consultas parametrizadas, las cuales consisten de filtros, búsquedas y el límite y *offset* necesario para la paginación.
### ¿Por qué?
De esta manera, se reducen las posibilidades de una inyección SQL al minimizar las operaciones realizadas desde el frontend.
# Evidencia de funcionamiento
## Reporte 1
```
                                                                 
QUERY PLAN                                                       

---------------------------------------------------------------------------------------------------------------------------------------------
 GroupAggregate  (cost=94.98..129.76 rows=1070 width=696) (actual time=0.226..0.240 rows=16 loops=1)
   Group Key: p.stock, c.nombre, p.nombre, p.precio
   ->  Sort  (cost=94.98..97.66 rows=1070 width=660) (actual time=0.218..0.221 rows=17 loops=1)
         Sort Key: p.stock DESC, c.nombre, p.nombre, p.precio    
         Sort Method: quicksort  Memory: 26kB
         ->  Hash Right Join  (cost=15.57..41.14 rows=1070 width=660) (actual time=0.170..0.177 rows=17 loops=1)
               Hash Cond: (od.producto_id = p.id)
               ->  Seq Scan on orden_detalles od  (cost=0.00..20.70 rows=1070 width=8) (actual time=0.004..0.005 rows=11 loops=1) 
               ->  Hash  (cost=15.37..15.37 rows=16 width=660) (actual time=0.101..0.102 rows=16 loops=1)
                     Buckets: 1024  Batches: 1  Memory Usage: 10kB
                     ->  Hash Join  (cost=1.36..15.37 rows=16 width=660) (actual time=0.079..0.083 rows=16 loops=1)
                           Hash Cond: (c.id = p.categoria_id)
                           ->  Seq Scan on categorias c  (cost=0.00..12.80 rows=280 width=222) (actual time=0.011..0.012 rows=5 loops=1)   
                           ->  Hash  (cost=1.16..1.16 rows=16 width=446) (actual time=0.039..0.039 rows=16 loops=1)
                                 Buckets: 1024  Batches: 1  Memory Usage: 10kB
                                 ->  Seq Scan on productos p  (cost=0.00..1.16 rows=16 width=446) (actual time=0.007..0.009 rows=16 loops=1)
 Planning Time: 0.939 ms
 Execution Time: 0.432 ms
(18 rows)
```
### Explicación
1. Seq scan lee las tablas
2. Hace los Joins necesarios
3. Escanea las tablas que se van a unir
4. Ordena los datos con *quicksort*
## Reporte 2
```
                                                            QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------
 Sort  (cost=12.31..12.31 rows=2 width=814) (actual time=0.226..0.232 rows=6 loops=1)
   Sort Key: (COALESCE(sum(o.total), '0'::numeric)) DESC
   Sort Method: quicksort  Memory: 25kB
   ->  GroupAggregate  (cost=12.10..12.30 rows=2 width=814) (actual time=0.184..0.199 rows=6 loops=1)
         Group Key: u.nombre, u.email
         Filter: (count(DISTINCT o.id) > 0)
         ->  Sort  (cost=12.10..12.11 rows=6 width=762) (actual time=0.154..0.158 rows=6 loops=1)
               Sort Key: u.nombre, u.email, o.id
               Sort Method: quicksort  Memory: 25kB
               ->  Hash Join  (cost=1.14..12.02 rows=6 width=762) (actual time=0.099..0.109 rows=6 loops=1)
                     Hash Cond: (u.id = o.usuario_id)
                     ->  Seq Scan on usuarios u  (cost=0.00..10.60 rows=60 width=738) (actual time=0.008..0.010 rows=7 loops=1)   
                     ->  Hash  (cost=1.06..1.06 rows=6 width=32) (actual time=0.029..0.030 rows=6 loops=1)
                           Buckets: 1024  Batches: 1  Memory Usage: 9kB   
                           ->  Seq Scan on ordenes o  (cost=0.00..1.06 rows=6 width=32) (actual time=0.007..0.009 rows=6 loops=1)
 Planning Time: 3.040 ms
 Execution Time: 0.435 ms
(17 rows)
```
### Explicación
noc
## Reporte 3
```
                                                                 
       QUERY PLAN                                                

-----------------------------------------------------------------------------------------------------------------------------------------------------------
 Subquery Scan on vw_ventas_categorias  (cost=173.91..177.41 rows=280 width=298) (actual time=0.486..0.490 rows=5 loops=1)        
   ->  Sort  (cost=173.91..174.61 rows=280 width=306) (actual time=0.485..0.487 rows=5 loops=1)
         Sort Key: (count(DISTINCT o.id)) DESC
         Sort Method: quicksort  Memory: 25kB
         ->  GroupAggregate  (cost=121.82..162.53 rows=280 width=306) (actual time=0.298..0.412 rows=5 loops=1)
               Group Key: c.nombre
               ->  Sort  (cost=121.82..125.57 rows=1498 width=296) (actual time=0.233..0.236 rows=19 loops=1)
                     Sort Key: c.nombre, o.id
                     Sort Method: quicksort  Memory: 25kB        
                     ->  Hash Right Join  (cost=18.80..42.81 rows=1498 width=296) (actual time=0.179..0.195 rows=19 loops=1)      
                           Hash Cond: (p.categoria_id = c.id)    
                           ->  Hash Left Join  (cost=2.50..26.29 rows=86 width=82) (actual time=0.132..0.143 rows=17 loops=1)
                                 Hash Cond: (od.orden_id = o.id)
                                 ->  Hash Right Join  (cost=1.36..24.92 rows=86 width=24) (actual time=0.076..0.083 rows=17 loops=1)       
                                       Hash Cond: (od.producto_id = p.id) 
                                       ->  Seq Scan on orden_detalles od  (cost=0.00..20.70 rows=1070 width=24) (actual time=0.020..0.021 rows=11 loops=1)
                                       ->  Hash  (cost=1.16..1.16 rows=16 width=8) (actual time=0.038..0.038 rows=16 loops=1)
                                             Buckets: 1024  Batches: 1  Memory Usage: 9kB
                                             ->  Seq Scan on productos p  (cost=0.00..1.16 rows=16 width=8) (actual time=0.004..0.008 rows=16 loops=1)
                                 ->  Hash  (cost=1.06..1.06 rows=6 width=62) (actual time=0.025..0.025 rows=6 loops=1)
                                       Buckets: 1024  Batches: 1  Memory Usage: 9kB
                                       ->  Seq Scan on ordenes o  (cost=0.00..1.06 rows=6 width=62) (actual time=0.004..0.005 rows=6 loops=1)
                           ->  Hash  (cost=12.80..12.80 rows=280 width=222) (actual time=0.024..0.024 rows=5 loops=1)
                                 Buckets: 1024  Batches: 1  Memory Usage: 9kB
                                 ->  Seq Scan on categorias c  (cost=0.00..12.80 rows=280 width=222) (actual time=0.008..0.009 rows=5 loops=1)
 Planning Time: 1.551 ms
 Execution Time: 0.797 ms
(27 rows)
```
### Explicación
noc
## Reporte 4
```
                                                                 
   QUERY PLAN                                                    

---------------------------------------------------------------------------------------------------------------------------------------------------
 WindowAgg  (cost=119.06..137.78 rows=1070 width=680) (actual time=0.310..0.359 rows=16 loops=1)
   ->  Sort  (cost=119.06..121.73 rows=1070 width=672) (actual time=0.285..0.289 rows=16 loops=1)
         Sort Key: (COALESCE(sum(od.subtotal), '0'::numeric)) DESC
         Sort Method: quicksort  Memory: 25kB
         ->  HashAggregate  (cost=51.84..65.22 rows=1070 width=672) (actual time=0.241..0.256 rows=16 loops=1)
               Group Key: p.nombre, c.nombre, p.stock
               Batches: 1  Memory Usage: 73kB
               ->  Hash Right Join  (cost=15.57..41.14 rows=1070 width=656) (actual time=0.205..0.218 rows=17 loops=1)
                     Hash Cond: (od.producto_id = p.id)
                     ->  Seq Scan on orden_detalles od  (cost=0.00..20.70 rows=1070 width=20) (actual time=0.005..0.007 rows=11 loops=1)
                     ->  Hash  (cost=15.37..15.37 rows=16 width=644) (actual time=0.169..0.170 rows=16 loops=1)
                           Buckets: 1024  Batches: 1  Memory Usage: 10kB  
                           ->  Hash Join  (cost=1.36..15.37 rows=16 width=644) (actual time=0.142..0.149 rows=16 loops=1)
                                 Hash Cond: (c.id = p.categoria_id)       
                                 ->  Seq Scan on categorias c  (cost=0.00..12.80 rows=280 width=222) (actual time=0.057..0.058 rows=5 loops=1)
                                 ->  Hash  (cost=1.16..1.16 rows=16 width=430) (actual time=0.041..0.042 rows=16 loops=1)
                                       Buckets: 1024  Batches: 1  Memory Usage: 9kB
                                       ->  Seq Scan on productos p  (cost=0.00..1.16 rows=16 width=430) (actual time=0.009..0.013 rows=16 loops=1)
 Planning Time: 0.557 ms
 Execution Time: 0.707 ms
(20 rows)
```
### Explicación
noc
## Reporte 5
```
                                                            QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------
 Sort  (cost=13.36..13.37 rows=2 width=774) (actual time=0.147..0.149 rows=2 loops=1)
   Sort Key: (sum(o.total))
   Sort Method: quicksort  Memory: 25kB
   InitPlan 1 (returns $0)
     ->  Aggregate  (cost=1.08..1.09 rows=1 width=32) (actual time=0.009..0.009 rows=1 loops=1)
           ->  Seq Scan on ordenes o_1  (cost=0.00..1.06 rows=6 width=16) (actual time=0.001..0.002 rows=6 loops=1)
   ->  GroupAggregate  (cost=12.10..12.26 rows=2 width=774) (actual time=0.123..0.130 rows=2 loops=1)
         Group Key: u.nombre, u.email
         Filter: (sum(o.total) > $0)
         Rows Removed by Filter: 4
         ->  Sort  (cost=12.10..12.11 rows=6 width=754) (actual time=0.101..0.103 rows=6 loops=1)
               Sort Key: u.nombre, u.email, o.id
               Sort Method: quicksort  Memory: 25kB
               ->  Hash Join  (cost=1.14..12.02 rows=6 width=754) (actual time=0.075..0.079 rows=6 loops=1)
                     Hash Cond: (u.id = o.usuario_id)
                     ->  Seq Scan on usuarios u  (cost=0.00..10.60 rows=60 width=738) (actual time=0.017..0.018 rows=7 loops=1)
                     ->  Hash  (cost=1.06..1.06 rows=6 width=24) (actual time=0.024..0.025 rows=6 loops=1)
                           Buckets: 1024  Batches: 1  Memory Usage: 9kB   
                           ->  Seq Scan on ordenes o  (cost=0.00..1.06 rows=6 width=24) (actual time=0.008..0.009 rows=6 loops=1)
 Planning Time: 0.519 ms
 Execution Time: 0.338 ms
(21 rows)
```
### Explicación
noc
# Modelo de amenazas mínimo
## ¿Cómo se previene la inyección de SQL?
Al acceder a la aplicación mediante un rol con permisos mínimos, una posible inyección de SQL no sería efectiva, ya que no se tendría acceso a datos importantes con el rol utilizado.
Igualmente, se utilizan consultas parametrizadas y declaraciones preparadas.
## Credenciales
El usuario no se conecta como Postgres, sino que utiliza un rol diferente a este que solo posee permisos mínimos. Esto se realiza a través de la variable de entorno DATABASE_URL, la cual está incluida en el archivo .env.example del repositorio.
## Permisos mínimos
El usuario creado para la interacción con entre el frontend y el backend solamente tiene permiso para ver las vistas creadas, no puede acceder a las tablas en sí y no puede modificar a las vistas o a las tablas.
## Uso de componentes de servidor
Al utilizar componentes de servidor, la información reside y es extraída dentro del servidor, lo que significa que la información sensible es inaccesible para el usuario.
# Verificación de la base de datos

![alt text](image.png)