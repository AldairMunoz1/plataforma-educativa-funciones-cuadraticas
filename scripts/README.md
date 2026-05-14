# Scripts de Configuración e Inicio

Este directorio contiene scripts para facilitar la configuración e inicio del sistema.

## Scripts Disponibles

### `setup.py` (Próximamente)
Script de configuración inicial que:
- Verifica dependencias del sistema
- Crea la base de datos inicial
- Instala dependencias de Python y Node.js
- Configura el primer usuario docente

### `start.py` (Próximamente)
Script de inicio del sistema que:
- Solicita autenticación del docente
- Inicia el servidor Flask
- Abre el navegador automáticamente
- Muestra la IP local para conexión de estudiantes

## Uso

Los scripts se ejecutarán desde la raíz del proyecto:

```bash
# Configuración inicial (primera vez)
python scripts/setup.py

# Inicio del sistema
python scripts/start.py
```
