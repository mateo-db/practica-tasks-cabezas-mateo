### Resumen Investigación: Variables de Entorno y Dotenv

### 1. Variables de Entorno

* **¿Qué son?:** Valores globales guardados fuera del código fuente, directamente en el sistema operativo o servidor.
* **Propósito:** Separar configuraciones técnicas confidenciales (como contraseñas o puertos) de la lógica de programación para mayor seguridad y flexibilidad.

### 2. El Paquete dotenv

* **Definición:** Librería de Node.js que lee archivos de configuración externos y los inyecta en la memoria del proyecto.
* **Instalación:** Se descarga en la terminal ejecutando el comando básico npm i dotenv.

### 3. Archivos .env vs .env.example

* **.env (Privado):** Archivo de texto local con las claves y contraseñas reales. **Nunca se sube a GitHub** (va en .gitignore).
* **.env.example (Público):** Plantilla estructural sin datos reales que se comparte en GitHub para indicar qué variables necesita el proyecto para arrancar.

### 4. Acceso desde el Código

* **Inicialización:** Debe ejecutarse en la primera línea del archivo principal (app.js) para cargar las variables de inmediato.
* **Uso:** Se accede a cualquier valor configurado usando el objeto nativo de Node: process.env.NOMBRE_VARIABLE.