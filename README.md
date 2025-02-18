<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# E-commerce Omar Caiguan Ojeda

## Descripción
Este proyecto es una aplicación de comercio electrónico desarrollada con NestJS y TypeORM. Permite la gestión de productos, clientes y órdenes de compra.

## Características
- **Gestión de productos**: Crear, actualizar, eliminar y listar productos.
- **Gestión de clientes**: Registro, autenticación y administración de clientes.
- **Órdenes de compra**: Creación y seguimiento de órdenes de compra.
- **Autenticación**: Uso de JWT para seguridad.
- **Documentación**: Implementación de Swagger para documentación de la API.

## Tecnologías
- **NestJS**: Framework para el backend.
- **TypeORM**: ORM para la gestión de base de datos.
- **PostgreSQL**: Base de datos relacional.
- **Swagger**: Generación automática de documentación.
- **Cloudinary**: Almacenamiento de imágenes.
- **Docker**: Contenedores para despliegue.

## Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/ecommerce-omar-caiguan-ojeda.git
   cd ecommerce-omar-caiguan-ojeda
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno (`.env`):
   ```env
   DATABASE_URL=postgres://usuario:contraseña@localhost:5432/ecommerce
   JWT_SECRET=tu_secreto
   CLOUDINARY_URL=tu_url_de_cloudinary
   ```
4. Ejecutar migraciones:
   ```bash
   npm run migration:run
   ```
5. Iniciar la aplicación en desarrollo:
   ```bash
   npm run start:dev
   ```

## Scripts disponibles
- `npm run start` - Inicia la aplicación.
- `npm run start:dev` - Inicia la aplicación en modo desarrollo.
- `npm run build` - Compila la aplicación.
- `npm run test` - Ejecuta las pruebas unitarias.
- `npm run test:e2e` - Ejecuta las pruebas de integración.
- `npm run lint` - Ejecuta ESLint.
- `npm run migration:generate` - Genera una nueva migración.
- `npm run migration:run` - Aplica las migraciones.

## API Documentation
La documentación de la API se genera automáticamente con Swagger y está disponible en:
```
http://localhost:3000/api
```

## Contribución
1. Realiza un fork del repositorio.
2. Crea una rama para tu nueva funcionalidad (`feature/nueva-funcionalidad`).
3. Realiza un commit con tus cambios (`git commit -m 'Agregada nueva funcionalidad'`).
4. Realiza un push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request en GitHub.

## Licencia
Este proyecto está bajo la licencia **UNLICENSED**.


