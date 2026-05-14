# Frontend - Aplicación React

Frontend de la plataforma educativa implementado con React, TypeScript y Vite.

## Estructura

```
frontend/
├── public/            # Archivos estáticos
├── src/
│   ├── components/    # Componentes React
│   │   ├── Calculator/   # Calculadora graficadora
│   │   ├── Chatbot/      # Interfaz de chatbot
│   │   ├── Dashboard/    # Dashboards
│   │   ├── Auth/         # Autenticación
│   │   └── Admin/        # Administración
│   ├── pages/         # Páginas principales
│   ├── store/         # Estado Redux
│   ├── services/      # Cliente API
│   ├── utils/         # Utilidades
│   └── i18n/          # Internacionalización
├── package.json       # Dependencias
└── vite.config.ts     # Configuración Vite
```

## Tecnologías

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Material-UI** - Componentes UI
- **Redux Toolkit** - Gestión de estado
- **Plotly.js** - Gráficos interactivos
- **Axios** - Cliente HTTP

## Configuración

1. Instalar dependencias:
```bash
npm install
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## Desarrollo

El servidor de desarrollo estará disponible en `http://localhost:3000`

Las peticiones a `/api/*` se redirigen automáticamente al backend en `http://localhost:5000`

## Componentes Principales

### Calculadora Graficadora
- `GraphPlotter.tsx` - Renderizado de parábolas con Plotly.js
- `ParameterControls.tsx` - Controles interactivos (deslizadores)
- `FunctionDisplay.tsx` - Visualización de fórmula y puntos críticos

### Chatbot
- `ChatInterface.tsx` - Interfaz principal del chat
- `MessageList.tsx` - Lista de mensajes
- `InputBox.tsx` - Entrada de texto
- `QueueIndicator.tsx` - Indicador de estado de cola

### Dashboards
- `StudentDashboard.tsx` - Dashboard personal del estudiante
- `TeacherDashboard.tsx` - Dashboard del docente
- `StudentCard.tsx` - Tarjeta de estudiante
- `MetricsChart.tsx` - Gráficos de métricas

## Estado Global (Redux)

- `authSlice.ts` - Autenticación
- `calculatorSlice.ts` - Estado de la calculadora
- `chatSlice.ts` - Estado del chatbot
- `dashboardSlice.ts` - Estado de dashboards
