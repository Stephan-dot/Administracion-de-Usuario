# Administración de usuarios

Aplicación web para consultar usuarios, filtrar y paginar sus datos, revisar sus publicaciones y agregar publicaciones de forma local.

## Requisitos

- Node.js compatible con las versiones de Vite y TypeScript del proyecto.
- npm.

## Cómo ejecutar el proyecto

Desde la carpeta del proyecto, instala las dependencias y levanta el servidor de desarrollo:

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación.

### Comandos disponibles

```bash
npm run dev      # Servidor local con recarga en caliente
npm run build    # Comprobación de TypeScript y compilación de producción
npm run preview  # Vista previa de la compilación
npm run lint     # Análisis estático con ESLint
npm test         # Ejecución de las pruebas con Vitest
```

Las pruebas usan **Vitest**, **jsdom** y **Testing Library para React**.

## Funcionalidades

- Lista usuarios obtenidos desde la Api JSONPlaceholder.
- Filtra la lista por nombre.
- Presenta los resultados en una tabla con paginación de diez usuarios por página.
- Permite consultar los campos del usuario, incluidos dirección, coordenadas y empresa.
- Muestra estados de carga con Skeleton y mensajes de error.
- En el detalle se muestran los datos del usuario y sus publicaciones.
- Permite agregar publicaciones con título y texto obligatorios. Se agregan a la lista en memoria; no se guardan en la API.

## Decisiones tomadas

- **Filtrado y paginación en el cliente:** la lista de usuarios se carga completa y luego se filtra y divide en páginas en el navegador. Es simple para el conjunto de datos de ejemplo; un backend real debería filtrar y paginar los resultados en el servidor.
- **Estado de navegación en React:** la vista y el usuario seleccionado se controlan con estado local. Para esta aplicación pequeña evita añadir una dependencia de enrutamiento.
- **Componentes UI existentes:** se reutilizan componentes de la libreria shadcn para mantener consistencia visual.
- **Pruebas del detalle:** se verifican la carga de usuario y publicaciones, la validación del formulario y la creación local de una publicación.

## Qué mejoraría con más tiempo

1. Conectar un backend que persista usuarios y publicaciones, y permita completar las operaciones de crear, editar y eliminar.
2. Incorporar filtros y paginación del lado del servidor cuando el volumen de datos crezca.
3. Ampliar las pruebas para cubrir errores de red, estados Skeleton, el filtro y la paginación.
4. Revisar accesibilidad y diseño responsive con pruebas manuales y automatizadas.

## Uso de inteligencia artificial

Usé una IA como asistente de programación mediante instrucciones en lenguaje natural. La utilice para integrar paginación, presentar todos los campos de la lista y detalle de usuario,  y preparar pruebas con Vitest y Testing Library.

### Qué acepté

- La paginación de la tabla.
- La organización de la información del usuario en la vista de detalle y la lista de usuarios.
- Probar la carga, la validación y la incorporación local de publicaciones.

### Qué revisé o corregí

- Ajusté las solicitudes para que el detalle use el identificador del usuario seleccionado.
- Al ejecutar las pruebas, detecté que dos aserciones confundían el contenido del formulario con el de la lista. Corregí las pruebas para consultar específicamente la sección de publicaciones y confirmé que las cuatro pasan.

La IA se utilizó como apoyo para proponer e implementar cambios con el objetivo de reducir tiempo de desarrollo; las decisiones de alcance, la revisión de los resultados y la corrección de los tests se hicieron durante el desarrollo.
