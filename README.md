# Back-end (coopeuch-tasks-challenge)

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:
- [JDK 17](https://openjdk.org/projects/jdk/17/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Script
Ejecutar el siguiente script para crear la base de datos y la tabla:
~~~
CREATE DATABASE coopeuch_tasks_challenge;
~~~

### configuración
Importante configurar y tener en consideración un par de propiedades existentes en el archivo _src/main/resources/application.properties_:

Configuración de credenciales de la base de datos

```
spring.datasource.username=
spring.datasource.password=
```
Tener una base de datos configurada como la siguiente propiedad:
```
spring.datasource.url=jdbc:postgresql://localhost:5432/coopeuch_tasks_challenge
```

### Tests
```
mvn test
```

### Levantar proyecto
```
mvn spring-boot:run
```

El proyecto quedará levantado en la siguiente ruta:
```
http://localhost:8080
```

### Documentación
Una vez levantado el proyecto, puedes dirigirte a la siguiente url para ver la documentación con Swagger-ui
```
http://localhost:8080/swagger-ui.html
```

# Front-end (coopeuch-tasks-web)

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [NodeJs](https://nodejs.org/es)

### Instalar depenencias

```
npm install
```

### Tests

```
npm test
```
### Levantar proyecto

Ejecuta el siguiente comando para iniciar el servidor en modo de desarrollo:

```
npm run dev
```

El proyecto quedará levantado en la siguiente ruta:
```
http://localhost:5173
```


