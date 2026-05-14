# Plataforma Educativa de Funciones Cuadráticas

Plataforma web educativa autocontenida diseñada para la enseñanza y aprendizaje de funciones cuadráticas en contextos educativos rurales con conectividad limitada o inexistente.

## 🎯 Características Principales

- **Calculadora Graficadora Interactiva**: Visualización en tiempo real de funciones cuadráticas con controles deslizantes
- **Chatbot con IA Socrática**: Asistente educativo que guía mediante preguntas (IA local o en la nube)
- **Dashboards de Rendimiento**: Seguimiento personalizado para estudiantes y supervisión para docentes
- **Arquitectura Cliente-Servidor Local**: El PC del docente actúa como servidor WiFi local
- **Optimizado para Recursos Limitados**: Funciona en equipos con mínimo 4GB RAM
- **Completamente en Español**: Interfaz y contenido en idioma español

## 🏗️ Estado del Proyecto

**Fase Actual**: Configuración Inicial ⏳

Este proyecto sigue la metodología **Spec-Driven Development**:
- ✅ Documento de Requisitos completo
- ✅ Diseño Técnico completo
- ⏳ Implementación (en progreso)
- ⏳ Pruebas

## 📋 Requisitos del Sistema

### Modo Local (IA Local)
- RAM mínima: 4GB
- Capacidad: Hasta 40 estudiantes simultáneos
- Sin conexión a internet requerida

### Modo Nube (IA en la Nube)
- Conexión a internet activa
- Capacidad: Prácticamente ilimitada
- Procesamiento paralelo de hasta 20 solicitudes al chatbot

## 🎓 Casos de Uso

- **Zonas Rurales**: Diseñado específicamente para contextos con conectividad limitada
- **Aulas Tradicionales**: Funciona perfectamente en entornos con internet estable
- **Educación Personalizada**: Seguimiento individual del progreso de cada estudiante

## 🔧 Stack Tecnológico

### Backend
- **Framework**: Flask (Python)
- **Base de Datos**: SQLite (autocontenida)
- **ORM**: SQLAlchemy
- **Autenticación**: JWT + bcrypt
- **IA Local**: Ollama (modo headless)
- **IA Nube**: OpenAI/Anthropic/Google Gemini

### Frontend
- **Framework**: React 18 con TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Estado Global**: Redux Toolkit
- **Gráficos**: Plotly.js
- **HTTP Client**: Axios

## 📦 Instalación

### Requisitos Previos
- Python 3.10 o superior
- Node.js 18 o superior
- Git

### Configuración del Backend

1. Crear y activar entorno virtual:
```bash
# Windows
cd backend
python -m venv venv
venv\Scripts\activate

# Linux/Mac
cd backend
python3 -m venv venv
source venv/bin/activate
```

2. Instalar dependencias:
```bash
pip install -r requirements.txt
```

### Configuración del Frontend

1. Instalar dependencias:
```bash
cd frontend
npm install
```

### Iniciar el Proyecto

**Backend** (en una terminal):
```bash
cd backend
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
python app.py
```

**Frontend** (en otra terminal):
```bash
cd frontend
npm run dev
```

El frontend estará disponible en `http://localhost:3000`
El backend API estará disponible en `http://localhost:5000`

### Configuración de IA Local (Opcional)

Para usar el modo de IA local sin conexión a internet:

1. Instalar Ollama desde [ollama.ai](https://ollama.ai)
2. Descargar el modelo:
```bash
ollama pull llama3.2:3b
```

## 🎮 Uso Rápido

1. **Docente**: Ejecutar el script de inicio que solicitará credenciales
2. **Estudiantes**: Conectarse a la IP local mostrada en la consola del docente
3. **Calculadora**: Explorar funciones cuadráticas con controles interactivos
4. **Chatbot**: Hacer preguntas sobre funciones cuadráticas

## 📁 Estructura del Proyecto

```
plataforma-educativa/
├── backend/                    # Servidor Flask
│   ├── auth/                   # Autenticación y middleware
│   ├── api/routes/             # Endpoints REST
│   ├── services/               # Lógica de negocio
│   ├── models/                 # Modelos de base de datos
│   ├── database/               # Configuración y migraciones
│   ├── app.py                  # Punto de entrada
│   └── requirements.txt        # Dependencias Python
├── frontend/                   # Aplicación React
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   ├── pages/              # Páginas principales
│   │   ├── store/              # Estado Redux
│   │   └── services/           # Cliente API
│   ├── package.json            # Dependencias Node.js
│   └── vite.config.ts          # Configuración Vite
├── data/                       # Base de datos SQLite
├── scripts/                    # Scripts de inicio y configuración
├── docs/                       # Documentación
└── .kiro/specs/                # Especificaciones del proyecto
```

## 🚀 Roadmap

### MVP (v1.0)
- [x] Especificación de requisitos
- [ ] Diseño técnico
- [ ] Implementación de funciones cuadráticas
- [ ] Calculadora graficadora
- [ ] Chatbot socrático
- [ ] Sistema de autenticación
- [ ] Dashboards básicos

### Futuras Versiones
- [ ] Más temas matemáticos
- [ ] Soporte para otras asignaturas
- [ ] Interfaz multiidioma
- [ ] Módulos educativos extensibles

## 👥 Contribuciones

Este proyecto está en fase de desarrollo inicial. Las contribuciones serán bienvenidas una vez completada la fase de implementación del MVP.

## 📄 Licencia

Por definir

## 📧 Contacto

Aldair Muñoz - [@AldairMunoz1](https://github.com/AldairMunoz1)

---

**Nota**: Este es un proyecto educativo diseñado para mejorar el acceso a herramientas de aprendizaje en zonas con recursos tecnológicos limitados.
