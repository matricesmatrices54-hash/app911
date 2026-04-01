# app911

Proyecto Expo (React Native + Web) preparado para publicarse en **GitHub Pages**.

## Publicar en GitHub Pages

1. Sube el repo a GitHub.
2. Desde la raíz del proyecto, ejecuta:
   - `npm run deploy`
3. El comando:
   - genera la versión web en `dist/`
   - ajusta rutas para funcionar dentro de la subruta del repositorio
   - publica la carpeta `dist/` en la rama `gh-pages`

## Activar Pages en GitHub

En tu repositorio de GitHub:

1. Ve a **Settings > Pages**.
2. En **Build and deployment**, elige:
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` y carpeta `/ (root)`
3. Guarda cambios.

La URL final normalmente será:

`https://TU-USUARIO.github.io/TU-REPO/`

## Scripts disponibles

- `npm run web` → desarrollo web local
- `npm run build:gh-pages` → export web listo para Pages
- `npm run deploy` → build + publicación en rama `gh-pages`

## Nota de PowerShell en Windows

Si `npm` falla por políticas de ejecución, usa `npm.cmd`.
