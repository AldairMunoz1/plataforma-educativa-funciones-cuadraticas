# Backend - Servidor Flask

Backend de la plataforma educativa implementado con Flask.

## Estructura

```
backend/
├── auth/              # Autenticación y middleware
├── api/routes/        # Endpoints REST
├── services/          # Lógica de negocio
├── models/            # Modelos de base de datos
├── database/          # Configuración y migraciones
├── app.py            # Punto de entrada
├── config.py         # Configuración del sistema
└── requirements.txt  # Dependencias
```

## Configuración

1. Crear entorno virtual:
```bash
python -m venv venv
```

2. Activar entorno virtual:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

4. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

## Ejecución

```bash
python app.py
```

El servidor estará disponible en `http://localhost:5000`

## API Endpoints

La documentación completa de los endpoints se encuentra en el archivo de diseño:
`.kiro/specs/plataforma-educativa-funciones-cuadraticas/design.md`

### Principales Grupos de Endpoints

- `/api/auth/*` - Autenticación
- `/api/calculator/*` - Calculadora graficadora
- `/api/chatbot/*` - Chatbot socrático
- `/api/dashboard/*` - Dashboards de rendimiento
- `/api/admin/*` - Gestión administrativa
- `/api/sessions/*` - Sesiones de clase
