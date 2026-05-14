# Documento de Requisitos

## Introducción

Plataforma web educativa autocontenida diseñada para la enseñanza y aprendizaje de funciones cuadráticas en contextos educativos rurales con conectividad limitada o inexistente. La plataforma proporciona herramientas interactivas de visualización, asistencia pedagógica mediante IA con metodología socrática, y seguimiento del rendimiento estudiantil.

El sistema está optimizado para funcionar en equipos con recursos limitados típicos de zonas rurales. El PC del docente actúa como servidor local al que los estudiantes se conectan a través de WiFi local usando sus navegadores, sin requerir conexión a internet. La arquitectura prioriza la simplicidad de configuración y el uso eficiente de recursos de hardware.

El sistema soporta dos roles principales: docentes y estudiantes, cada uno con capacidades específicas adaptadas a sus necesidades educativas.

## Glosario

- **Sistema**: La plataforma web educativa completa
- **Docente**: Usuario con permisos de enseñanza y supervisión
- **Estudiante**: Usuario con permisos de aprendizaje
- **Calculadora_Graficadora**: Componente interactivo para visualizar funciones cuadráticas
- **Chatbot_Socrático**: Asistente de IA que guía mediante preguntas en lugar de respuestas directas
- **Dashboard_Personal**: Panel de visualización de rendimiento individual del estudiante
- **Dashboard_Docente**: Panel de visualización de rendimiento de todos los estudiantes
- **Función_Cuadrática**: Función matemática de la forma f(x) = ax² + bx + c
- **Parámetros**: Los coeficientes a, b, c de una función cuadrática
- **Vértice**: Punto máximo o mínimo de una parábola
- **Base_de_Datos**: Sistema de almacenamiento SQLite o PostgreSQL
- **Modo_Estudiante**: Vista de demostración para docentes que replica la experiencia del estudiante
- **Aviso**: Mensaje o notificación enviada por el docente a un estudiante
- **Retroalimentación**: Comentario personalizado del docente sobre el desempeño del estudiante
- **Servidor_Local**: Servicio web que se ejecuta en el PC del docente y expone la plataforma en la red WiFi local
- **Modo_Headless**: Ejecución de modelo de IA sin interfaz gráfica para optimizar consumo de RAM
- **Dirección_IP_Local**: Dirección de red local (ej: 192.168.1.100) que los estudiantes usan para acceder al sistema
- **Acceso_Local**: Conexión al sistema mediante localhost o 127.0.0.1 desde el PC del docente
- **Acceso_Remoto**: Conexión al sistema mediante la Dirección_IP_Local desde dispositivos de estudiantes
- **Registro_de_Sesión**: Información de contexto de la clase (grado, fecha, tema, hora de inicio)
- **Panel_Profesor**: Interfaz completa con funcionalidades de supervisión, solo accesible mediante Acceso_Local
- **Panel_Estudiante**: Interfaz de aprendizaje accesible mediante Acceso_Remoto
- **Profesor_Registrado**: Usuario docente con credenciales almacenadas en el sistema
- **Credenciales_Profesor**: Combinación de identificador único y contraseña para autenticación del docente
- **Gestión_de_Contraseñas**: Funcionalidad que permite al Profesor_Registrado visualizar y resetear contraseñas de estudiantes
- **Cola_de_Solicitudes**: Estructura de datos FIFO que gestiona solicitudes al Chatbot_Socrático
- **Solicitud_en_Cola**: Petición de un Estudiante al Chatbot_Socrático esperando ser procesada
- **Posición_en_Cola**: Número ordinal que indica el lugar de una Solicitud_en_Cola en la Cola_de_Solicitudes
- **Indicador_de_Estado**: Retroalimentación visual que informa al Estudiante sobre el estado de su Solicitud_en_Cola
- **Historial_de_Conversación**: Registro completo de todas las interacciones previas entre un Estudiante y el Chatbot_Socrático
- **Rango_de_Parámetros**: Límites permitidos para los valores de a, b, c en la Calculadora_Graficadora ([-30, 30])
- **Modo_IA_Local**: Configuración del sistema que utiliza modelo de IA ejecutándose localmente
- **Modo_IA_Nube**: Configuración del sistema que utiliza API de IA en la nube
- **Capacidad_Máxima**: Número máximo de Estudiantes que pueden conectarse simultáneamente según el modo de IA
- **Procesamiento_Paralelo**: Capacidad de procesar múltiples solicitudes al Chatbot_Socrático simultáneamente
- **Dashboard_Exportable**: Versión del Dashboard_Docente en formato HTML independiente
- **Arquitectura_Modular**: Diseño del sistema que permite extensión a nuevos temas, asignaturas e idiomas

## Requisitos

### Requisito 1: Restricción de Acceso por Origen de Conexión

**Historia de Usuario:** Como docente, quiero que el panel de profesor solo sea accesible desde mi PC local, para que los estudiantes conectados remotamente no puedan acceder a funcionalidades de supervisión.

#### Criterios de Aceptación

1. WHEN un usuario accede mediante Acceso_Local (localhost o 127.0.0.1), THE Sistema SHALL permitir acceso al Panel_Profesor
2. WHEN un usuario accede mediante Acceso_Remoto (Dirección_IP_Local), THE Sistema SHALL restringir el acceso únicamente al Panel_Estudiante
3. WHEN un usuario intenta acceder al Panel_Profesor mediante Acceso_Remoto, THE Sistema SHALL denegar el acceso y mostrar un mensaje indicando que esa funcionalidad solo está disponible localmente
4. THE Sistema SHALL detectar automáticamente el origen de la conexión sin requerir configuración manual

### Requisito 2: Autenticación de Estudiantes

**Historia de Usuario:** Como estudiante, quiero autenticarme con mi número de identificación y contraseña, para que pueda acceder a mi perfil personalizado y mi progreso.

#### Criterios de Aceptación

1. WHEN un Estudiante accede mediante Acceso_Remoto, THE Sistema SHALL mostrar un cuadro de diálogo de login/registro
2. THE Sistema SHALL solicitar número de identificación como nombre de usuario
3. THE Sistema SHALL solicitar contraseña
4. WHEN un Estudiante proporciona credenciales válidas, THE Sistema SHALL autenticar al Estudiante y cargar el Panel_Estudiante
5. WHEN un Estudiante proporciona credenciales inválidas, THE Sistema SHALL mostrar un mensaje de error y denegar el acceso
6. WHILE un Estudiante está autenticado, THE Sistema SHALL mantener la sesión activa hasta que cierre sesión explícitamente
7. WHERE un Estudiante accede por primera vez, THE Sistema SHALL permitir registro con número de identificación y contraseña

### Requisito 3: Autenticación del Profesor al Iniciar el Sistema

**Historia de Usuario:** Como docente, quiero autenticarme con mis credenciales antes de que el sistema abra el navegador en modo profesor, para que se prevenga el acceso no autorizado a funcionalidades de supervisión.

#### Criterios de Aceptación

1. WHEN el Docente ejecuta la plataforma, THE Sistema SHALL solicitar autenticación mediante Credenciales_Profesor antes de abrir el navegador
2. THE Sistema SHALL solicitar identificador de docente y contraseña
3. WHEN un Docente proporciona Credenciales_Profesor válidas, THE Sistema SHALL autenticar al Profesor_Registrado y abrir automáticamente el navegador predeterminado apuntando a localhost
4. WHEN un Docente proporciona Credenciales_Profesor inválidas, THE Sistema SHALL mostrar un mensaje de error y denegar el acceso sin abrir el navegador
5. WHERE un Docente accede por primera vez, THE Sistema SHALL permitir registro de nuevo Profesor_Registrado con identificador único y contraseña
6. THE Sistema SHALL almacenar las Credenciales_Profesor de forma segura en la Base_de_Datos
7. THE Sistema SHALL registrar qué Profesor_Registrado inició cada sesión

### Requisito 4: Inicio Automático del Navegador y Registro de Sesión

**Historia de Usuario:** Como docente autenticado, quiero que el sistema abra automáticamente el navegador en modo profesor y me permita registrar la información de la sesión de clase, para que pueda comenzar rápidamente sin pasos técnicos adicionales.

#### Criterios de Aceptación

1. WHEN el Profesor_Registrado es autenticado exitosamente, THE Sistema SHALL abrir automáticamente el navegador predeterminado apuntando a localhost
2. WHEN el navegador se abre, THE Sistema SHALL mostrar un cuadro de diálogo de registro de sesión antes de acceder al Panel_Profesor
3. THE Sistema SHALL solicitar los siguientes campos en el Registro_de_Sesión: Grado, Fecha, Tema abordado, Hora de inicio
4. THE Sistema SHALL permitir campos adicionales extensibles en el Registro_de_Sesión para futuras necesidades
5. WHEN el Profesor_Registrado completa el Registro_de_Sesión, THE Sistema SHALL almacenar la información en la Base_de_Datos asociada al Profesor_Registrado y cargar el Panel_Profesor
6. THE Sistema SHALL asociar todas las actividades de la sesión actual con el Registro_de_Sesión y el Profesor_Registrado correspondiente

### Requisito 5: Panel de Docente con Modo Estudiante

**Historia de Usuario:** Como docente, quiero acceder a un panel con capacidad de ver en modo estudiante, para que pueda demostrar funcionalidades y entender la experiencia del estudiante.

#### Criterios de Aceptación

1. WHEN un Docente inicia sesión, THE Sistema SHALL mostrar el Panel_Docente con todas las funcionalidades de supervisión
2. WHERE el Docente activa el Modo_Estudiante, THE Sistema SHALL mostrar la interfaz exacta que ve un Estudiante
3. WHILE está en Modo_Estudiante, THE Sistema SHALL permitir al Docente interactuar con todas las funcionalidades estudiantiles
4. WHEN el Docente desactiva el Modo_Estudiante, THE Sistema SHALL restaurar el Panel_Docente completo

### Requisito 6: Panel de Estudiante

**Historia de Usuario:** Como estudiante, quiero acceder a un panel personalizado, para que pueda utilizar las herramientas de aprendizaje y ver mi progreso.

#### Criterios de Aceptación

1. WHEN un Estudiante inicia sesión, THE Sistema SHALL mostrar el panel con acceso a la Calculadora_Graficadora, Chatbot_Socrático y Dashboard_Personal
2. THE Sistema SHALL restringir el acceso del Estudiante únicamente a sus propios datos y herramientas de aprendizaje
3. WHILE el Estudiante está en su panel, THE Sistema SHALL mostrar avisos y retroalimentación recibidos del Docente

### Requisito 7: Gestión de Contraseñas de Estudiantes

**Historia de Usuario:** Como docente, quiero visualizar y resetear las contraseñas de mis estudiantes desde el panel de profesor, para que pueda ayudar a estudiantes que olviden sus credenciales.

#### Criterios de Aceptación

1. WHEN un Profesor_Registrado accede al Panel_Profesor, THE Sistema SHALL proporcionar acceso a la Gestión_de_Contraseñas
2. WHEN un Profesor_Registrado selecciona un Estudiante específico, THE Sistema SHALL mostrar la contraseña actual del Estudiante
3. WHEN un Profesor_Registrado solicita resetear la contraseña de un Estudiante, THE Sistema SHALL permitir establecer una nueva contraseña
4. WHEN un Profesor_Registrado establece una nueva contraseña para un Estudiante, THE Sistema SHALL actualizar las credenciales en la Base_de_Datos
5. THE Sistema SHALL registrar en la Base_de_Datos qué Profesor_Registrado realizó cada operación de visualización o reseteo de contraseña
6. THE Sistema SHALL mostrar la funcionalidad de Gestión_de_Contraseñas dentro del Panel_Profesor de forma accesible

### Requisito 8: Calculadora Graficadora - Visualización de Funciones

**Historia de Usuario:** Como usuario, quiero visualizar gráficamente funciones cuadráticas, para que pueda comprender su comportamiento visual.

#### Criterios de Aceptación

1. WHEN se ingresan valores para los Parámetros a, b, c, THE Calculadora_Graficadora SHALL renderizar la parábola correspondiente en un plano cartesiano
2. THE Calculadora_Graficadora SHALL mostrar el Vértice de la parábola con sus coordenadas
3. THE Calculadora_Graficadora SHALL mostrar los cortes con el eje X (raíces reales si existen)
4. THE Calculadora_Graficadora SHALL mostrar el corte con el eje Y
5. THE Calculadora_Graficadora SHALL mostrar la fórmula de la Función_Cuadrática con los valores actuales de a, b, c

### Requisito 9: Calculadora Graficadora - Controles Interactivos

**Historia de Usuario:** Como usuario, quiero modificar los parámetros de la función cuadrática de forma interactiva con límites claros, para que pueda experimentar con diferentes configuraciones de manera segura y controlada.

#### Criterios de Aceptación

1. THE Calculadora_Graficadora SHALL proporcionar deslizadores para modificar cada uno de los Parámetros a, b, c
2. THE Calculadora_Graficadora SHALL restringir los deslizadores al Rango_de_Parámetros [-30, 30]
3. THE Calculadora_Graficadora SHALL proporcionar campos de entrada manual para especificar valores exactos de a, b, c
4. THE Calculadora_Graficadora SHALL mostrar el Rango_de_Parámetros permitido junto a los campos de entrada manual
5. WHEN un usuario ingresa manualmente un valor fuera del Rango_de_Parámetros, THE Calculadora_Graficadora SHALL mostrar un mensaje de error indicando los límites permitidos
6. WHEN un usuario ingresa manualmente un valor fuera del Rango_de_Parámetros, THE Calculadora_Graficadora SHALL rechazar el valor y mantener el valor anterior válido
7. WHEN un usuario modifica cualquier Parámetro mediante deslizador o entrada manual dentro del rango válido, THE Calculadora_Graficadora SHALL actualizar el gráfico en tiempo real
8. WHEN un usuario modifica cualquier Parámetro, THE Calculadora_Graficadora SHALL recalcular y actualizar el Vértice y los cortes con los ejes
9. THE Calculadora_Graficadora SHALL validar que el parámetro a no sea cero

### Requisito 10: Persistencia del Historial de Conversaciones

**Historia de Usuario:** Como estudiante, quiero ver el historial de mis conversaciones previas con el chatbot cuando vuelvo a iniciar sesión, para que pueda revisar mi proceso de aprendizaje y retomar donde lo dejé.

#### Criterios de Aceptación

1. WHEN un Estudiante interactúa con el Chatbot_Socrático, THE Sistema SHALL almacenar cada mensaje y respuesta en el Historial_de_Conversación asociado al Estudiante
2. WHEN un Estudiante inicia sesión, THE Sistema SHALL cargar y mostrar su Historial_de_Conversación completo en la interfaz del Chatbot_Socrático
3. THE Sistema SHALL mantener el Historial_de_Conversación ordenado cronológicamente
4. THE Sistema SHALL preservar el Historial_de_Conversación en la Base_de_Datos entre sesiones
5. WHILE un Estudiante visualiza su Historial_de_Conversación, THE Sistema SHALL permitir desplazamiento para revisar conversaciones antiguas
6. THE Sistema SHALL asociar cada entrada del Historial_de_Conversación con la fecha y hora de la interacción

### Requisito 11: Chatbot Socrático - Metodología de Enseñanza

**Historia de Usuario:** Como estudiante, quiero interactuar con un asistente de IA que me guíe mediante preguntas, para que pueda desarrollar mi comprensión de forma autónoma.

#### Criterios de Aceptación

1. WHEN un Estudiante hace una pregunta sobre funciones cuadráticas, THE Chatbot_Socrático SHALL responder con preguntas guía en lugar de respuestas directas
2. THE Chatbot_Socrático SHALL limitar sus respuestas exclusivamente al dominio de funciones cuadráticas
3. WHEN un Estudiante hace una pregunta fuera del dominio de funciones cuadráticas, THE Chatbot_Socrático SHALL redirigir la conversación al tema de funciones cuadráticas
4. THE Chatbot_Socrático SHALL estar configurado desde su prompt base para seguir la metodología socrática

### Requisito 12: Chatbot Socrático - Conectividad con IA

**Historia de Usuario:** Como usuario del sistema, quiero que el chatbot funcione con IA local o en la nube, para que la plataforma sea funcional independientemente de la disponibilidad de internet.

#### Criterios de Aceptación

1. WHERE hay conexión a internet disponible, THE Sistema SHALL conectar el Chatbot_Socrático a una API de IA en la nube
2. WHERE no hay conexión a internet disponible, THE Sistema SHALL conectar el Chatbot_Socrático a un modelo de IA local ejecutándose en Modo_Headless
3. WHEN la conexión a internet se interrumpe durante una sesión, THE Sistema SHALL cambiar automáticamente a IA local
4. THE Sistema SHALL mantener la consistencia de la metodología socrática independientemente de la fuente de IA utilizada
5. WHERE se utiliza IA local, THE Sistema SHALL ejecutar el modelo en Modo_Headless para minimizar el consumo de RAM
6. THE Sistema SHALL gestionar todas las solicitudes al Chatbot_Socrático mediante la Cola_de_Solicitudes para prevenir sobrecarga del modelo de IA

### Requisito 13: Dashboard Personal del Estudiante

**Historia de Usuario:** Como estudiante, quiero ver mi propio avance y rendimiento, para que pueda monitorear mi progreso de aprendizaje.

#### Criterios de Aceptación

1. WHEN un Estudiante accede a su Dashboard_Personal, THE Sistema SHALL mostrar métricas de su propio rendimiento
2. THE Dashboard_Personal SHALL mostrar el progreso del Estudiante en actividades con la Calculadora_Graficadora
3. THE Dashboard_Personal SHALL mostrar estadísticas de interacción con el Chatbot_Socrático
4. THE Dashboard_Personal SHALL mostrar avisos y retroalimentación recibidos del Docente
5. THE Sistema SHALL restringir el acceso del Estudiante únicamente a sus propios datos de rendimiento

### Requisito 14: Dashboard del Docente - Visualización de Rendimiento

**Historia de Usuario:** Como docente, quiero visualizar el rendimiento de cada estudiante individualmente, para que pueda identificar necesidades específicas de apoyo.

#### Criterios de Aceptación

1. WHEN un Docente accede al Dashboard_Docente, THE Sistema SHALL mostrar una lista de todos los estudiantes
2. WHEN un Docente selecciona un Estudiante específico, THE Sistema SHALL mostrar las métricas de rendimiento de ese Estudiante
3. THE Dashboard_Docente SHALL mostrar el progreso de cada Estudiante en actividades con la Calculadora_Graficadora
4. THE Dashboard_Docente SHALL mostrar estadísticas de interacción de cada Estudiante con el Chatbot_Socrático
5. THE Dashboard_Docente SHALL permitir comparar el rendimiento entre diferentes estudiantes

### Requisito 15: Dashboard del Docente - Comunicación con Estudiantes

**Historia de Usuario:** Como docente, quiero enviar avisos y retroalimentación personalizada a cada estudiante, para que pueda proporcionar orientación individualizada.

#### Criterios de Aceptación

1. WHEN un Docente selecciona un Estudiante en el Dashboard_Docente, THE Sistema SHALL proporcionar una opción para enviar un Aviso
2. WHEN un Docente selecciona un Estudiante en el Dashboard_Docente, THE Sistema SHALL proporcionar una opción para enviar Retroalimentación personalizada
3. WHEN un Docente envía un Aviso o Retroalimentación, THE Sistema SHALL almacenar el mensaje en la Base_de_Datos asociado al Estudiante destinatario
4. WHEN un Estudiante inicia sesión después de recibir un Aviso o Retroalimentación, THE Sistema SHALL mostrar el mensaje en su panel

### Requisito 16: Dashboard del Docente - Exportación

**Historia de Usuario:** Como docente, quiero exportar el dashboard de rendimiento como una página web independiente, para que pueda utilizarlo en futuras presentaciones o informes académicos sin necesidad de ejecutar el sistema completo.

#### Criterios de Aceptación

1. WHEN un Docente accede al Dashboard_Docente, THE Sistema SHALL proporcionar una opción de exportación
2. WHEN un Docente solicita exportar el dashboard, THE Sistema SHALL generar un Dashboard_Exportable en formato HTML
3. THE Dashboard_Exportable SHALL contener todos los datos de rendimiento de los estudiantes visibles en el momento de la exportación
4. THE Dashboard_Exportable SHALL ser un archivo HTML independiente que funcione sin conexión al servidor
5. THE Dashboard_Exportable SHALL incluir estilos y gráficos embebidos para visualización completa sin dependencias externas
6. WHEN el Dashboard_Exportable es generado, THE Sistema SHALL permitir al Docente descargar o guardar el archivo
7. THE Dashboard_Exportable SHALL preservar la estructura visual y organización del Dashboard_Docente original

### Requisito 17: Persistencia de Datos

**Historia de Usuario:** Como administrador del sistema, quiero que todos los datos se almacenen de forma persistente en una base de datos local dentro del proyecto, para que la información no se pierda entre sesiones y el sistema sea completamente autocontenido.

#### Criterios de Aceptación

1. THE Sistema SHALL utilizar SQLite o PostgreSQL como Base_de_Datos
2. THE Sistema SHALL almacenar el archivo de Base_de_Datos físicamente dentro de la estructura de carpetas del proyecto
3. THE Sistema SHALL almacenar Credenciales_Profesor de todos los Profesor_Registrado en la Base_de_Datos
4. THE Sistema SHALL almacenar credenciales de Estudiante, roles, y datos de sesión en la Base_de_Datos
5. THE Sistema SHALL almacenar todas las interacciones del Estudiante con la Calculadora_Graficadora en la Base_de_Datos
6. THE Sistema SHALL almacenar todas las conversaciones con el Chatbot_Socrático en la Base_de_Datos
7. THE Sistema SHALL almacenar el Historial_de_Conversación completo de cada Estudiante con el Chatbot_Socrático en la Base_de_Datos
8. THE Sistema SHALL almacenar todos los avisos y retroalimentación en la Base_de_Datos
9. THE Sistema SHALL almacenar todos los Registro_de_Sesión asociados a cada Profesor_Registrado en la Base_de_Datos
10. THE Sistema SHALL almacenar el historial de operaciones de Gestión_de_Contraseñas en la Base_de_Datos

### Requisito 18: Arquitectura Autocontenida con Servidor Local

**Historia de Usuario:** Como docente, quiero que la plataforma se configure automáticamente como servidor en mi PC con todos los archivos necesarios en una sola carpeta, para que los estudiantes puedan conectarse sin que yo tenga que hacer configuraciones técnicas complejas.

#### Criterios de Aceptación

1. THE Sistema SHALL contener todos los archivos necesarios (código, base de datos, configuración) dentro de una única estructura de carpetas del proyecto
2. THE Sistema SHALL almacenar el archivo de Base_de_Datos físicamente dentro de la estructura de carpetas del proyecto
3. WHEN el Profesor_Registrado inicia el Sistema, THE Servidor_Local SHALL configurarse automáticamente y exponerse en la red WiFi local
4. WHEN el Servidor_Local se inicia, THE Sistema SHALL mostrar la Dirección_IP_Local que los estudiantes deben usar para conectarse
5. THE Sistema SHALL funcionar como aplicación web accesible mediante navegador desde cualquier dispositivo en la red local
6. WHERE se utiliza IA local, THE Sistema SHALL incluir el modelo de IA dentro de la estructura de carpetas o proporcionar instrucciones claras de instalación
7. THE Estudiante SHALL poder acceder al Sistema ingresando la Dirección_IP_Local en su navegador sin configuración adicional

### Requisito 19: Capacidad Máxima de Estudiantes Según Modo de IA

**Historia de Usuario:** Como docente, quiero que el sistema gestione automáticamente la capacidad de estudiantes según el modo de IA disponible, para que pueda servir a mi clase sin preocuparme por limitaciones técnicas.

#### Criterios de Aceptación

1. WHERE el Sistema opera en Modo_IA_Local, THE Sistema SHALL limitar la Capacidad_Máxima a 40 estudiantes conectados simultáneamente
2. WHERE el Sistema opera en Modo_IA_Nube, THE Sistema SHALL permitir conexiones de estudiantes prácticamente ilimitadas
3. WHEN el número de estudiantes conectados alcanza la Capacidad_Máxima en Modo_IA_Local, THE Sistema SHALL mostrar un mensaje al Docente indicando que se alcanzó el límite
4. WHEN el número de estudiantes conectados alcanza la Capacidad_Máxima en Modo_IA_Local, THE Sistema SHALL denegar nuevas conexiones de estudiantes hasta que otros se desconecten
5. THE Sistema SHALL mostrar al Docente el número actual de estudiantes conectados y la Capacidad_Máxima disponible
6. THE Sistema SHALL detectar automáticamente el modo de IA activo y aplicar la Capacidad_Máxima correspondiente

### Requisito 20: Optimización para Recursos Limitados

**Historia de Usuario:** Como docente en zona rural con equipo de recursos limitados, quiero que el sistema funcione eficientemente en mi PC, para que pueda servir a múltiples estudiantes sin degradación del rendimiento.

#### Criterios de Aceptación

1. THE Sistema SHALL estar optimizado para ejecutarse en equipos con RAM limitada (mínimo 4GB)
2. WHEN múltiples Estudiantes se conectan simultáneamente, THE Servidor_Local SHALL mantener tiempos de respuesta menores a 2 segundos para operaciones de interfaz
3. WHERE se utiliza IA local, THE Sistema SHALL ejecutar el modelo en Modo_Headless para reducir el consumo de memoria
4. THE Sistema SHALL utilizar la Cola_de_Solicitudes para procesar solicitudes al Chatbot_Socrático secuencialmente y prevenir sobrecarga del PC host
5. THE Sistema SHALL proporcionar retroalimentación visual clara sobre el estado del servidor y recursos utilizados
6. WHEN el uso de recursos excede umbrales seguros, THE Sistema SHALL mostrar advertencias al Docente

### Requisito 21: Configuración Simplificada de Red Local

**Historia de Usuario:** Como docente sin conocimientos técnicos avanzados, quiero que el sistema se configure automáticamente en mi red local, para que pueda comenzar a usarlo sin asistencia técnica especializada.

#### Criterios de Aceptación

1. WHEN el Docente ejecuta el Sistema por primera vez, THE Sistema SHALL detectar automáticamente la configuración de red disponible
2. THE Sistema SHALL iniciar el Servidor_Local sin requerir configuración manual de puertos o direcciones IP
3. WHEN el Servidor_Local está listo, THE Sistema SHALL mostrar instrucciones claras y simples para que los Estudiantes se conecten
4. THE Sistema SHALL proporcionar una pantalla de inicio que muestre la Dirección_IP_Local en formato grande y legible
5. IF el Sistema no puede iniciar el Servidor_Local automáticamente, THEN THE Sistema SHALL mostrar mensajes de error descriptivos con pasos de solución

### Requisito 22: Sistema de Cola para Gestión de Solicitudes al Chatbot

**Historia de Usuario:** Como estudiante en un aula con recursos limitados, quiero que mis solicitudes al chatbot se procesen de forma ordenada, para que el sistema no se sature y todos recibamos respuestas de manera justa.

#### Criterios de Aceptación

1. WHEN un Estudiante envía una pregunta al Chatbot_Socrático, THE Sistema SHALL agregar la solicitud a la Cola_de_Solicitudes siguiendo el orden FIFO
2. WHERE el Sistema opera en Modo_IA_Local, THE Sistema SHALL procesar las solicitudes del Chatbot_Socrático secuencialmente, una a la vez
3. WHERE el Sistema opera en Modo_IA_Nube, THE Sistema SHALL procesar hasta 20 solicitudes al Chatbot_Socrático en paralelo mediante Procesamiento_Paralelo
4. WHILE una Solicitud_en_Cola está siendo procesada en Modo_IA_Local, THE Sistema SHALL mantener las demás solicitudes en espera en la Cola_de_Solicitudes
5. WHEN un Estudiante envía una solicitud al Chatbot_Socrático, THE Sistema SHALL mostrar un Indicador_de_Estado confirmando que la solicitud fue recibida
6. WHILE una Solicitud_en_Cola está en espera en Modo_IA_Local, THE Sistema SHALL mostrar al Estudiante su Posición_en_Cola
7. WHEN el Chatbot_Socrático comienza a procesar la solicitud de un Estudiante, THE Sistema SHALL actualizar el Indicador_de_Estado para mostrar que su solicitud está siendo procesada
8. WHEN el Chatbot_Socrático completa una respuesta, THE Sistema SHALL entregar la respuesta al Estudiante
9. WHERE el Sistema opera en Modo_IA_Local, THE Cola_de_Solicitudes SHALL prevenir que múltiples solicitudes simultáneas saturen el modelo de IA local o el PC host
10. WHERE el Sistema opera en Modo_IA_Nube, THE Sistema SHALL gestionar hasta 20 solicitudes simultáneas sin mostrar Posición_en_Cola

### Requisito 23: Idioma de la Interfaz

**Historia de Usuario:** Como usuario hispanohablante, quiero que toda la interfaz esté en español, para que pueda utilizar el sistema en mi idioma nativo.

#### Criterios de Aceptación

1. THE Sistema SHALL mostrar todos los elementos de la interfaz de usuario en español
2. THE Sistema SHALL mostrar todos los mensajes de error y validación en español
3. THE Sistema SHALL mostrar todas las etiquetas, botones y menús en español
4. THE Sistema SHALL mostrar todas las instrucciones y ayudas contextuales en español
5. THE Chatbot_Socrático SHALL interactuar con los estudiantes en español

### Requisito 24: Arquitectura Modular y Extensible

**Historia de Usuario:** Como administrador del sistema, quiero que la plataforma tenga una arquitectura modular, para que pueda extenderse fácilmente a nuevos temas matemáticos, otras asignaturas, y soporte multiidioma en el futuro.

#### Criterios de Aceptación

1. THE Sistema SHALL implementar una Arquitectura_Modular que separe la lógica de contenido educativo de la infraestructura base
2. THE Sistema SHALL diseñar componentes de forma que permitan agregar nuevos temas matemáticos sin modificar la arquitectura base
3. THE Sistema SHALL diseñar la estructura de datos de forma que soporte múltiples asignaturas además de matemáticas
4. THE Sistema SHALL diseñar la interfaz de usuario de forma que permita internacionalización a múltiples idiomas
5. THE Sistema SHALL documentar la arquitectura modular y los puntos de extensión para futuros desarrollos
6. THE Sistema SHALL separar la configuración específica de funciones cuadráticas en módulos independientes reutilizables
7. THE Chatbot_Socrático SHALL diseñarse con prompts y configuración modular que permita adaptación a diferentes dominios de conocimiento
