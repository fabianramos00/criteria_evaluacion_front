# Criteria - Evaluacion de Repositorios Institucionales

Aplicacion SPA en React para evaluar repositorios institucionales contra 8 categorias de criterios estandarizados.

## Tech Stack

- **React 18** con Vite 6
- **react-router-dom 6** para enrutamiento
- **Tailwind CSS 4** + SCSS (sass-embedded)
- **react-hook-form** + @hookform/resolvers + Yup para formularios
- **html2canvas-pro** + jspdf para exportacion PDF
- **react-spinners** para indicadores de carga
- **DM Sans, Material Icons** (Google Fonts)

## Requisitos

- Node.js 18+
- pnpm 9+

## Instalacion

```bash
pnpm install
```

## Variables de Entorno

Crear archivo `.env` en la raiz del proyecto:

```env
VITE_SERVER_URL=https://tu-servidor-backend.com
```

En desarrollo, Vite hace proxy de `/api` hacia `VITE_SERVER_URL`.

## Scripts

```bash
pnpm run dev      # Servidor de desarrollo en http://localhost:3000
pnpm run build    # Build de produccion en dist/
pnpm run preview  # Previsualizar build de produccion
```

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
├── config/           # Configuracion (cliente HTTP)
├── const/            # Constantes (rutas, errores)
├── context/           # Contextos React (TotalContext)
├── pages/            # Páginas principales
├── schemas/          # Esquemas de validacion Yup
├── services/         # Funciones de API
├── styles/           # Estilos y tokens CSS
└── utils/            # Funciones utilitarias
```

## Evaluacion

La aplicacion evalua repositorios contra 9 categorias:

1. Visibilidad
2. Politicas
3. Aspectos Legales
4. Metadatos
5. Interoperabilidad
6. Seguridad
7. Estadisticas
8. Servicios de valor anadido
9. Resumen (puntuacion final + exportacion PDF)

## Rutas Principales

- `/home` - Formulario de URL del repositorio + lista de evaluaciones
- `/eval/:token` - Wizard de evaluacion con navegacion por sidebar
