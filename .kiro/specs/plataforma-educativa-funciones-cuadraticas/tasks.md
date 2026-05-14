# Plan de Implementación: Plataforma Educativa de Funciones Cuadráticas

## Descripción General

Este plan implementa una plataforma web educativa autocontenida para la enseñanza de funciones cuadráticas en contextos rurales. La arquitectura cliente-servidor local utiliza Flask (Python) en el backend, React con TypeScript en el frontend, y SQLite como base de datos local.

El sistema soporta dos modos de IA (local con Ollama y nube), gestión de cola de solicitudes, autenticación diferenciada por origen, y dashboards de rendimiento exportables.

## Tareas de Implementación

- [-] 1. Configurar estructura del proyecto y dependencias base
  - Crear estructura de carpetas según diseño (backend/, frontend/, data/, scripts/, docs/)
  - Configurar entorno virtual Python y archivo requirements.txt con Flask, SQLAlchemy, bcrypt, requests
  - Configurar proyecto React con TypeScript, Vite, y dependencias (Plotly.js, Material-UI, Redux Toolkit, Axios)
  - Crear archivo .gitignore para excluir node_modules, venv, y archivos de base de datos
  - Crear archivo README.md con instrucciones básicas de instalación
  - _Requisitos: 18.1, 18.2_

- [ ] 2. Implementar modelos de base de datos y migraciones
  - [ ] 2.1 Configurar SQLAlchemy y crear archivo de configuración de base de datos
    - Crear backend/database/db.py con configuración de SQLAlchemy para SQLite
    - Configurar ruta de base de datos en data/plataforma.db
    - Implementar función de inicialización de base de datos
    - _Requisitos: 17.1, 17.2, 18.2_
  
  - [ ] 2.2 Implementar modelos de datos
    - Crear modelo Teacher en backend/models/user.py con campos id, name, password_hash, created_at, last_login
    - Crear modelo Student en backend/models/user.py con campos id, name, password_hash, created_at, last_login, is_active
    - Crear modelo Session en backend/models/session.py con campos id, teacher_id, grade, session_date, topic, start_time, end_time, additional_fields
    - Crear modelo CalculatorActivity en backend/models/activity.py con validaciones de rango [-30, 30] y a ≠ 0
    - Crear modelo Conversation en backend/models/conversation.py
    - Crear modelo Message en backend/models/conversation.py con enum role ('student', 'assistant')
    - Crear modelo Notification en backend/models/notification.py con enum type ('notice', 'feedback')
    - Crear modelo PasswordAudit en backend/models/user.py con enum action ('view', 'reset')
    - Crear modelo QueueRequest en backend/models/conversation.py con enum status ('queued', 'processing', 'completed', 'error')
    - _Requisitos: 17.3, 17.4, 17.5, 17.6, 17.7, 17.8, 17.9, 17.10_
  
  - [ ] 2.3 Crear script de inicialización de base de datos
    - Crear backend/database/migrations/init_db.py que cree todas las tablas
    - Agregar índices de optimización según diseño
    - Crear función para poblar datos iniciales de prueba (opcional)
    - _Requisitos: 17.1, 17.2_

- [ ] 3. Implementar sistema de autenticación y middleware de origen
  - [ ] 3.1 Crear middleware de detección de origen
    - Implementar backend/auth/middleware.py con función que detecta si conexión es localhost (127.0.0.1) o IP local
    - Crear decorador @require_local_access para rutas de docente
    - Crear decorador @require_authenticated para rutas protegidas
    - _Requisitos: 1.1, 1.2, 1.3, 1.4_
  
  - [ ] 3.2 Implementar autenticación de docente
    - Crear backend/api/routes/auth.py con endpoint POST /api/auth/teacher/login
    - Implementar validación de credenciales contra base de datos con bcrypt
    - Generar token JWT con información de docente y rol
    - Registrar last_login en base de datos
    - _Requisitos: 3.1, 3.2, 3.3, 3.4, 17.3_
  
  - [ ] 3.3 Implementar autenticación de estudiante
    - Crear endpoints POST /api/auth/student/login y POST /api/auth/student/register en backend/api/routes/auth.py
    - Implementar validación de credenciales de estudiante
    - Generar token JWT con información de estudiante y rol 'student'
    - Registrar last_login en base de datos
    - _Requisitos: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 17.4_
  
  - [ ] 3.4 Implementar endpoints de validación y logout
    - Crear endpoint GET /api/auth/validate que verifica token JWT
    - Crear endpoint POST /api/auth/logout
    - _Requisitos: 2.6_

- [ ] 4. Crear script de inicio con autenticación previa
  - Crear scripts/start.py que solicita credenciales de docente antes de iniciar servidor
  - Implementar validación de credenciales contra base de datos
  - Implementar registro de nuevo docente si es primera vez
  - Generar token de sesión y almacenarlo temporalmente
  - Iniciar servidor Flask en background
  - Abrir navegador predeterminado apuntando a localhost con token en URL o cookie
  - Mostrar Dirección_IP_Local en consola para que estudiantes se conecten
  - _Requisitos: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 18.4, 21.2, 21.3, 21.4_

- [ ] 5. Implementar registro de sesión de clase
  - Crear endpoint POST /api/sessions/register en backend/api/routes/admin.py
  - Implementar validación de campos requeridos (grade, date, topic, startTime)
  - Soportar campos adicionales extensibles mediante JSON
  - Almacenar sesión en base de datos asociada al docente autenticado
  - Crear endpoint GET /api/sessions/current para obtener sesión activa
  - Crear endpoint GET /api/sessions/history para historial de sesiones
  - _Requisitos: 4.2, 4.3, 4.4, 4.5, 4.6, 17.9_

- [ ] 6. Implementar motor de cálculo matemático para funciones cuadráticas
  - Crear backend/services/calculator_service.py con clase QuadraticCalculator
  - Implementar método calculate_vertex(a, b, c) que retorna coordenadas del vértice
  - Implementar método calculate_roots(a, b, c) usando fórmula cuadrática
  - Implementar método calculate_y_intercept(c)
  - Implementar método generate_plot_points(a, b, c, x_range) que genera array de puntos
  - Implementar validaciones: a ≠ 0, parámetros en rango [-30, 30]
  - Implementar método format_formula(a, b, c) que retorna string de la función
  - _Requisitos: 8.1, 8.2, 8.3, 8.4, 8.5, 9.9_

- [ ] 7. Implementar API de calculadora graficadora
  - Crear backend/api/routes/calculator.py con endpoint POST /api/calculator/evaluate
  - Integrar QuadraticCalculator para procesar parámetros
  - Validar parámetros en rango [-30, 30] y retornar errores descriptivos en español
  - Retornar JSON con vertex, roots, yIntercept, points, formula
  - Crear endpoint POST /api/calculator/activity para guardar actividad del estudiante
  - Asociar actividad con student_id y session_id actual
  - _Requisitos: 8.1, 8.2, 8.3, 8.4, 8.5, 9.2, 9.5, 9.6, 17.5_

- [ ] 8. Implementar componente frontend de calculadora graficadora
  - [ ] 8.1 Crear componente GraphPlotter con Plotly.js
    - Crear frontend/src/components/Calculator/GraphPlotter.tsx
    - Renderizar parábola usando Plotly.js con array de puntos
    - Mostrar marcadores visuales para vértice (punto destacado)
    - Mostrar marcadores para raíces si existen
    - Mostrar marcador para intersección con eje Y
    - Configurar zoom y pan interactivo
    - _Requisitos: 8.1, 8.2, 8.3, 8.4_
  
  - [ ] 8.2 Crear controles interactivos de parámetros
    - Crear frontend/src/components/Calculator/ParameterControls.tsx con deslizadores para a, b, c
    - Configurar rango de deslizadores [-30, 30]
    - Crear campos de entrada manual con validación
    - Mostrar rango permitido junto a campos de entrada
    - Implementar validación que rechaza valores fuera de rango y muestra mensaje de error en español
    - Sincronizar deslizadores con campos de entrada bidireccionalemente
    - Validar que a ≠ 0 y mostrar error si es cero
    - _Requisitos: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.9_
  
  - [ ] 8.3 Crear componente de visualización de fórmula y puntos críticos
    - Crear frontend/src/components/Calculator/FunctionDisplay.tsx
    - Mostrar fórmula f(x) = ax² + bx + c con valores actuales
    - Mostrar coordenadas del vértice
    - Mostrar raíces si existen
    - Mostrar intersección con eje Y
    - _Requisitos: 8.2, 8.3, 8.4, 8.5_
  
  - [ ] 8.4 Integrar calculadora con API y estado global
    - Crear frontend/src/store/calculatorSlice.ts con Redux Toolkit
    - Implementar thunk para llamar POST /api/calculator/evaluate
    - Implementar thunk para guardar actividad POST /api/calculator/activity
    - Actualizar gráfico en tiempo real cuando cambian parámetros
    - _Requisitos: 9.7, 9.8, 17.5_

- [ ] 9. Checkpoint - Verificar calculadora funcional
  - Asegurar que todos los tests pasen, preguntar al usuario si surgen dudas

- [ ] 10. Implementar gestor de cola de solicitudes
  - Crear backend/services/queue_manager.py con clase QueueManager
  - Implementar cola FIFO en memoria con persistencia en base de datos
  - Implementar método add_request(student_id, message, conversation_id) que retorna request_id y posición
  - Implementar método get_queue_status() que retorna longitud de cola y solicitudes en procesamiento
  - Implementar método process_next() que obtiene siguiente solicitud y actualiza estado a 'processing'
  - Implementar método complete_request(request_id, response) que marca como 'completed'
  - Implementar método get_request_status(request_id) que retorna estado actual
  - Soportar procesamiento secuencial (modo local) y paralelo con límite de 20 (modo nube)
  - _Requisitos: 22.1, 22.2, 22.3, 22.4, 22.9, 22.10_

- [ ] 11. Implementar router de IA y conexión con modelos
  - [ ] 11.1 Crear router de IA con detección de modo
    - Crear backend/services/ai_router.py con clase AIRouter
    - Implementar método detect_internet_connection() que verifica conectividad
    - Implementar método get_ai_mode() que retorna 'local' o 'cloud'
    - Implementar cambio automático de modo si conexión se interrumpe
    - _Requisitos: 12.1, 12.2, 12.3_
  
  - [ ] 11.2 Implementar conexión con IA local (Ollama)
    - Implementar método send_to_local_ai(prompt) que llama API REST de Ollama
    - Configurar modelo Llama 3.2 3B en modo headless
    - Implementar manejo de errores y timeouts
    - _Requisitos: 12.2, 12.5_
  
  - [ ] 11.3 Implementar conexión con IA en nube
    - Implementar método send_to_cloud_ai(prompt) con soporte para OpenAI, Anthropic, o Google Gemini
    - Implementar fallback automático entre proveedores
    - Implementar rate limiting para máximo 20 solicitudes paralelas
    - _Requisitos: 12.1, 12.3, 22.3, 22.10_
  
  - [ ] 11.4 Configurar prompt socrático
    - Crear constante SOCRATIC_SYSTEM_PROMPT en español según diseño
    - Implementar método build_prompt(message, history) que construye contexto con historial
    - Asegurar que prompt limite respuestas a funciones cuadráticas
    - _Requisitos: 11.1, 11.2, 11.3, 11.4, 12.4, 23.5_

- [ ] 12. Implementar API de chatbot con sistema de cola
  - Crear backend/api/routes/chatbot.py con endpoint POST /api/chatbot/message
  - Agregar solicitud a cola mediante QueueManager
  - Retornar request_id, status 'queued', y posición en cola
  - Crear endpoint GET /api/chatbot/status/:requestId que consulta estado de solicitud
  - Crear endpoint GET /api/chatbot/history/:studentId que retorna historial de conversaciones
  - Crear endpoint GET /api/chatbot/queue/status que retorna estado general de cola
  - Implementar worker que procesa cola continuamente llamando a AIRouter
  - Guardar cada mensaje y respuesta en base de datos (Conversation y Message)
  - _Requisitos: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 17.6, 17.7, 22.1, 22.5, 22.6, 22.7, 22.8_

- [ ] 13. Implementar componente frontend de chatbot
  - [ ] 13.1 Crear interfaz de chat
    - Crear frontend/src/components/Chatbot/ChatInterface.tsx como contenedor principal
    - Crear frontend/src/components/Chatbot/MessageList.tsx que muestra historial de mensajes
    - Crear frontend/src/components/Chatbot/InputBox.tsx para entrada de texto
    - Estilizar mensajes diferenciando estudiante vs asistente
    - _Requisitos: 10.5_
  
  - [ ] 13.2 Crear indicador de estado de cola
    - Crear frontend/src/components/Chatbot/QueueIndicator.tsx
    - Mostrar confirmación cuando solicitud es recibida
    - Mostrar posición en cola cuando está en espera (solo modo local)
    - Mostrar indicador "procesando" cuando solicitud está siendo procesada
    - Actualizar estado mediante polling a GET /api/chatbot/status/:requestId
    - _Requisitos: 22.5, 22.6, 22.7_
  
  - [ ] 13.3 Integrar chatbot con API y estado global
    - Crear frontend/src/store/chatSlice.ts con Redux Toolkit
    - Implementar thunk para enviar mensaje POST /api/chatbot/message
    - Implementar polling para verificar estado de solicitud
    - Cargar historial de conversaciones al iniciar sesión GET /api/chatbot/history/:studentId
    - Mostrar historial ordenado cronológicamente con scroll
    - _Requisitos: 10.1, 10.2, 10.3, 10.5, 10.6_

- [ ] 14. Checkpoint - Verificar chatbot y cola funcionales
  - Asegurar que todos los tests pasen, preguntar al usuario si surgen dudas

- [ ] 15. Implementar dashboard personal del estudiante
  - Crear endpoint GET /api/dashboard/student/:studentId en backend/api/routes/dashboard.py
  - Calcular métricas de calculadora: totalSessions, totalTimeMinutes, functionsExplored, lastActivity
  - Calcular métricas de chatbot: totalQuestions, totalConversations, averageQuestionsPerConversation, lastInteraction
  - Obtener notificaciones del estudiante ordenadas por timestamp
  - Crear frontend/src/components/Dashboard/StudentDashboard.tsx
  - Mostrar métricas de uso de calculadora con gráficos
  - Mostrar estadísticas de chatbot
  - Mostrar avisos y retroalimentación del docente con indicador de leído/no leído
  - _Requisitos: 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ] 16. Implementar dashboard del docente
  - [ ] 16.1 Crear vista general de estudiantes
    - Crear endpoint GET /api/dashboard/teacher/overview en backend/api/routes/dashboard.py
    - Retornar lista de todos los estudiantes con métricas resumidas
    - Incluir totalStudents, activeStudents, currentConnections, maxCapacity, aiMode
    - Crear frontend/src/components/Dashboard/TeacherDashboard.tsx
    - Mostrar tarjetas de estudiantes con estado online/offline
    - Mostrar capacidad actual vs máxima
    - Mostrar modo de IA activo
    - _Requisitos: 14.1, 19.5_
  
  - [ ] 16.2 Crear vista detallada de estudiante individual
    - Crear endpoint GET /api/dashboard/teacher/student/:studentId
    - Retornar métricas detalladas del estudiante (misma estructura que dashboard personal)
    - Crear frontend/src/components/Dashboard/StudentCard.tsx para vista individual
    - Permitir comparación entre estudiantes
    - _Requisitos: 14.2, 14.3, 14.4, 14.5_
  
  - [ ] 16.3 Implementar comunicación con estudiantes
    - Crear endpoint POST /api/dashboard/teacher/notification en backend/api/routes/dashboard.py
    - Validar que solo docente desde localhost pueda enviar notificaciones
    - Guardar notificación en base de datos asociada a estudiante
    - Crear UI en TeacherDashboard para enviar avisos y retroalimentación
    - _Requisitos: 15.1, 15.2, 15.3, 15.4, 17.8_

- [ ] 17. Implementar exportación de dashboard a HTML
  - Crear endpoint POST /api/dashboard/teacher/export en backend/api/routes/dashboard.py
  - Crear backend/services/export_service.py con clase DashboardExporter
  - Implementar método generate_html(students, dateRange) que genera HTML estático
  - Incluir estilos CSS embebidos en el HTML
  - Incluir datos de gráficos embebidos (usar Chart.js o similar con datos inline)
  - Generar archivo HTML independiente sin dependencias externas
  - Retornar HTML como string y nombre de archivo sugerido
  - Crear botón de exportación en frontend TeacherDashboard
  - Implementar descarga de archivo HTML en navegador
  - _Requisitos: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7_

- [ ] 18. Implementar gestión de contraseñas de estudiantes
  - Crear endpoint GET /api/admin/students/passwords en backend/api/routes/admin.py
  - Aplicar decorador @require_local_access para restringir a localhost
  - Retornar lista de estudiantes con contraseñas en texto plano (solo para contexto educativo)
  - Crear endpoint PUT /api/admin/students/:studentId/password para resetear contraseña
  - Registrar cada operación en PasswordAudit con teacher_id, student_id, action, timestamp
  - Crear endpoint GET /api/admin/audit/password-changes para historial de auditoría
  - Crear frontend/src/components/Admin/PasswordManager.tsx
  - Mostrar lista de estudiantes con contraseñas visibles
  - Permitir resetear contraseña con confirmación
  - Mostrar historial de cambios de contraseña
  - _Requisitos: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 17.10_

- [ ] 19. Implementar modo estudiante para docente
  - Crear toggle en Panel_Profesor para activar/desactivar Modo_Estudiante
  - Crear frontend/src/components/Admin/StudentModeToggle.tsx
  - Cuando está activo, renderizar Panel_Estudiante completo con datos de demostración
  - Cuando está inactivo, restaurar Panel_Profesor
  - Almacenar estado del modo en Redux
  - _Requisitos: 5.1, 5.2, 5.3, 5.4_

- [ ] 20. Implementar gestión de capacidad máxima según modo de IA
  - Crear middleware en backend que cuenta conexiones activas de estudiantes
  - Implementar lógica que detecta modo de IA actual (local o nube)
  - Aplicar límite de 40 estudiantes en modo local
  - Permitir conexiones ilimitadas en modo nube
  - Denegar nuevas conexiones cuando se alcanza límite en modo local
  - Mostrar mensaje de error en español cuando se alcanza capacidad máxima
  - Mostrar en Dashboard_Docente el número de conexiones actuales y capacidad máxima
  - _Requisitos: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_

- [ ] 21. Implementar optimizaciones para recursos limitados
  - Configurar Ollama para ejecutar en modo headless sin interfaz gráfica
  - Implementar límites de memoria para procesos de IA
  - Optimizar consultas de base de datos con índices según diseño
  - Implementar caché en memoria para datos frecuentemente accedidos
  - Configurar compresión de respuestas HTTP
  - Implementar lazy loading en frontend para componentes pesados
  - Configurar timeouts apropiados para solicitudes de IA
  - Mostrar advertencias al docente si uso de recursos excede umbrales
  - _Requisitos: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6_

- [ ] 22. Implementar páginas principales y enrutamiento
  - Crear frontend/src/pages/TeacherPanel.tsx que integra todos los componentes de docente
  - Crear frontend/src/pages/StudentPanel.tsx que integra calculadora, chatbot y dashboard personal
  - Configurar React Router con rutas protegidas según rol
  - Implementar redirección automática según origen de conexión (localhost vs IP local)
  - Crear frontend/src/components/Auth/LoginForm.tsx para estudiantes
  - Crear frontend/src/components/Auth/RegisterForm.tsx para estudiantes
  - Crear frontend/src/components/Auth/SessionRegistration.tsx para registro de sesión de clase
  - _Requisitos: 1.1, 1.2, 2.1, 4.2, 5.1, 6.1_

- [ ] 23. Implementar cliente API y gestión de autenticación en frontend
  - Crear frontend/src/services/api.ts con instancia de Axios configurada
  - Implementar interceptor para agregar token JWT a headers
  - Implementar interceptor para manejar errores 401 y redirigir a login
  - Crear frontend/src/store/authSlice.ts con Redux Toolkit
  - Implementar thunks para login, register, validate, logout
  - Almacenar token en localStorage
  - Implementar auto-login si token válido existe
  - _Requisitos: 2.4, 2.5, 2.6, 3.3, 3.4_

- [ ] 24. Implementar internacionalización y textos en español
  - Crear archivo frontend/src/i18n/es.json con todos los textos de la interfaz en español
  - Traducir todos los mensajes de error del backend a español
  - Traducir todas las etiquetas, botones, menús a español
  - Traducir instrucciones y ayudas contextuales a español
  - Configurar prompt del chatbot en español
  - Documentar estructura de internacionalización para futura extensión a otros idiomas
  - _Requisitos: 23.1, 23.2, 23.3, 23.4, 23.5, 24.4_

- [ ] 25. Crear documentación de usuario y técnica
  - Crear docs/INSTALACION.md con guía paso a paso de instalación
  - Incluir instrucciones de instalación de Ollama y modelos de IA local
  - Crear docs/USO_DOCENTE.md con manual para docentes
  - Incluir capturas de pantalla y ejemplos de uso
  - Crear docs/ARQUITECTURA.md con documentación técnica del sistema
  - Documentar puntos de extensión para nuevos temas y asignaturas
  - Documentar arquitectura modular y separación de componentes
  - Crear ai_models/README.md con instrucciones de instalación de modelos de IA
  - _Requisitos: 18.6, 24.5, 24.6_

- [ ] 26. Implementar configuración automática de red local
  - Mejorar scripts/start.py para detectar automáticamente configuración de red
  - Obtener y mostrar Dirección_IP_Local automáticamente
  - Mostrar instrucciones claras en consola para que estudiantes se conecten
  - Crear pantalla de inicio en frontend que muestre IP local en formato grande
  - Implementar mensajes de error descriptivos en español si servidor no puede iniciar
  - Proporcionar pasos de solución para problemas comunes
  - _Requisitos: 21.1, 21.2, 21.3, 21.4, 21.5_

- [ ] 27. Checkpoint final - Pruebas de integración
  - Asegurar que todos los tests pasen, preguntar al usuario si surgen dudas

- [ ] 28. Crear script de configuración inicial
  - Crear scripts/setup.py que verifica dependencias del sistema
  - Verificar instalación de Python, Node.js, Ollama
  - Crear base de datos inicial si no existe
  - Ejecutar migraciones de base de datos
  - Instalar dependencias de Python y Node.js
  - Compilar frontend para producción
  - Crear primer usuario docente si no existe
  - _Requisitos: 18.1, 18.3, 21.1_

## Notas de Implementación

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia los requisitos específicos que implementa para trazabilidad
- Los checkpoints permiten validación incremental del progreso
- La arquitectura modular facilita extensión futura a nuevos temas y asignaturas
- El sistema está optimizado para equipos con 4GB RAM mínimo
- Todos los textos de interfaz deben estar en español
- La base de datos SQLite debe estar dentro de la carpeta data/ del proyecto
