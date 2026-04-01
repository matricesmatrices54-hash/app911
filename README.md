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

## Sincronización en la nube con Firebase 🔥

La app ya está preparada para usar **Firestore** y compartir datos entre dispositivos.

### 1) Configura el archivo `.env`

Completa los valores de Firebase en `.env`:

- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`

### 2) Crea Firestore Database

En Firebase Console:

1. Ve a **Build > Firestore Database**
2. Crea la base de datos en modo producción o prueba
3. Crea (o deja que la app cree automáticamente) la colección: `eventos`

### 3) Reglas mínimas (solo pruebas)

> ⚠️ Solo para pruebas rápidas. Luego debes poner autenticación.

```txt
rules_version = '2';
service cloud.firestore {
   match /databases/{database}/documents {
      match /eventos/{document=**} {
         allow read, write: if true;
      }
   }
}
```

Con eso, lo que guardes en un dispositivo se verá en los demás.

## Nota de PowerShell en Windows

Si `npm` falla por políticas de ejecución, usa `npm.cmd`.
