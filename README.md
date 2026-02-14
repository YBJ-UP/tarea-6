# Inicializar el proyecto
Este proyecto es despegable con Docker compose y se puede iniciar con el siguiente comando:

```bash
docker compose up --build
```

Una vez inicializado, abra [http://localhost:3000](http://localhost:3000) en su navegador para ver el proyecto.
# Índices
La base de datos de este proyecto cuenta con 3 índices:
## Índice 1.- 
Creado con la consulta:
```sql
-- consulta
```
### Verificación
Con la consulta:
```sql
-- Esta consulta une inscripciones según el id del estudiante
-- consulta
```
Se obtiene el siguiente resultado:
```
resultado
```
### ¿Por qué sirve?
noc
## Índice 2.- 
Creado con la consulta:
```sql
-- consulta
```
### Verificación
Con la consulta:
```sql
-- Esta consulta une inscripciones según el id del estudiante
-- consulta
```
Se obtiene el siguiente resultado:
```
resultado
```
### ¿Por qué sirve?
noc
## Índice 3.- 
Creado con la consulta:
```sql
-- consulta
```
### Verificación
Con la consulta:
```sql
-- Esta consulta une inscripciones según el id del estudiante
-- consulta
```
Se obtiene el siguiente resultado:
```
resultado
```
### ¿Por qué sirve?
noc
# "Trade-offs"
## ¿Qué se calculó en SQL?
algo
## ¿Qué se calculó en Next.js?
Dentro de Next.js, no se realiza ningún calculo importante, únicamente se obtiene el número de página y se calcula el *offset* necesario para la paginación; sin embargo, a través de este se envían consultas parametrizadas, las cuales consisten de filtros, búsquedas y el límite y *offset* necesario para la paginación.
### ¿Por qué?
poque chi
# Evidencia de funcionamiento
a
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