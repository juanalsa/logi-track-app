# LogiTrack App

LogiTrack App es una aplicación backend desarrollada en Node.js con TypeScript y Express. Implementa arquitectura limpia y utiliza tecnologías como MySQL, Redis y JWT para la autenticación.

## Tabla de Contenidos
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Pruebas](#pruebas)
- [Documentación](#documentación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Diagrama de Base de Datos](#diagrama-de-base-de-datos)

## Requisitos
Antes de ejecutar la aplicación, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (v16 o superior)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)
- [MySQL](https://www.mysql.com/) y [Redis](https://redis.io/) (si no usas Docker)

## Instalación
1. Clona el repositorio:
   ```sh
   git clone https://github.com/juanalsa/logi-track-app.git
   cd logi-track-app
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```

## Configuración
Configura las variables de entorno en un archivo `.env` en la raíz del proyecto:
```env
PORT=3100
DATABASE_URL="mysql://user:password@localhost:port/dbname"
JWT_SEED=
```

## Ejecución
### Con Docker
Para levantar los servicios de base de datos y caché:
```sh
docker-compose up -d
```

Para iniciar la aplicación en modo desarrollo:
```sh
npm run dev
```

Para construir y ejecutar en producción:
```sh
npm run build
npm start
```

## Pruebas
Ejecuta las pruebas unitarias y de integración con Jest:
```sh
npm test
```

Para pruebas en modo observador:
```sh
npm run test:watch
```

## Documentación
La API está documentada con Swagger. Una vez que la aplicación esté en ejecución, accede a:
```
http://localhost:3100/api-docs
```

## Estructura del Proyecto
```
📦 logi-track-app
 ┣ 📂 src
 ┃ ┣ 📂 __tests__
 ┃ ┣ 📂 application
 ┃ ┃ ┣ 📂 interfaces
 ┃ ┃ ┗ 📂 use-cases\auth
 ┃ ┃   ┗ 📜 index.ts
 ┃ ┣ 📂 config
 ┃ ┣ 📂 docs
 ┃ ┣ 📂 domain
 ┃ ┃ ┣ 📂 dtos
 ┃ ┃ ┣ 📂 entities
 ┃ ┃ ┣ 📂 errors
 ┃ ┃ ┗ 📂 services
 ┃ ┃   ┗ 📜 index.ts
 ┃ ┣ 📂 infrastructure
 ┃ ┃ ┣ 📂 auth
 ┃ ┃ ┣ 📂 cache
 ┃ ┃ ┣ 📂 datasource
 ┃ ┃ ┣ 📂 mappers
 ┃ ┃ ┗ 📂 repositories
 ┃ ┃   ┗ 📜 index.ts
 ┃ ┣ 📂 presentation
 ┃ ┃ ┣ 📂 controllers
 ┃ ┃ ┣ 📂 middlewares
 ┃ ┃ ┗ 📂 routes
 ┃ ┃   ┗ 📜 routes.ts
 ┃ ┣ 📂 shared
 ┃ ┣ 📜 app.ts
 ┃ ┗ 📜 server.ts
 ┣ 📜 .env
 ┗ 📜 README.md
```

## Diagrama de Base de Datos

```md
![Diagrama de Base de Datos](diagrama_bd.png)
```

---

Este README proporciona toda la información necesaria para configurar y ejecutar la aplicación de manera eficiente. 🚀

