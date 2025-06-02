# TUT - RallyShop

Proyecto Final de Ciclo DAW  
E-commerce de coches de rally

## Tecnologías

- React + Vite (Frontend)
- Spring Boot + JWT (Backend)
- MySQL (Base de datos)

## Funcionalidades

- Login y registro con roles
- Ver coches con filtros y detalles
- Añadir a favoritos (requiere login)
- Cesta persistente y pago con Stripe
- Panel de administración (crear, editar, borrar coches)
- Subida de imágenes a Cloudinary
- Correo de confirmación al registrarse

## Acceso admin

- **Correo**: 8profesores@gmail.com  
- **Contraseña**: profesores

## Cómo ejecutar

### 1. Backend (Spring Boot)

- Java 17 + Maven
- Crea la base de datos `rallyshop`
- Añade el archivo `application-secrets.properties` con tus claves de Stripe y Gmail
- Ejecuta:
  ```bash
  ./mvnw spring-boot:run
### 2. Frontend (React)
cd frontend
npm install
npm run dev

### 3. Nota
Si no configuras Stripe ni Gmail, la web funcionará igual (excepto pagos y envío de correos).
