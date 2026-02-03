# User Stories MVP — App móvil (Legajo de Espacio)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** PLAN_Vibe / QA_Test / UI_UX  
    **Nivel:** Interno

## Objetivo
Definir el backlog mínimo del MVP de la app móvil para espacios comunitarios, consumiendo SISOC (Django + MySQL) vía API.
Incluye **user stories** con **criterios de aceptación** alineados a pantallas y estados UI.

## Referencias
- Pantallas / mockups: `08_wireflows/pantallas-mvp.md`
- Estados UI: `08_wireflows/estados-ui.md`
- RBAC: `02_roles_y_accesos/rbac.md`
- Contratos API v0: `05_api/contratos-v0.md`

---

# EPIC 0 — Acceso y contexto

## US-0001 — Ver mi contexto de usuario (perfil + alcance)
**Como** usuario autenticado  
**Quiero** ver (o usar internamente) mi contexto: rol y espacio(s) asignados  
**Para** operar con permisos y datos correctos.

**Criterios de aceptación**
- Al iniciar la app, se consulta el endpoint de contexto (ej: `GET /me`) y se obtiene:
  - rol del usuario
  - lista o identificador de espacio(s)
  - jurisdicción (si corresponde)
- Si la respuesta indica **múltiples espacios**, se navega a “Selector de espacio”.
- Si indica **un solo espacio**, se navega directo a Home.
- Si no hay espacios asignados: mostrar estado “Sin espacios asignados” (ver `estados-ui.md`).

---

## US-0002 — Seleccionar espacio (solo si multi-espacio)
**Como** usuario con más de un espacio asignado  
**Quiero** seleccionar el espacio a operar  
**Para** ver información y operar acciones sobre el espacio correcto.

**Criterios de aceptación**
- Se muestra lista de espacios (nombre + dato mínimo adicional si aplica).
- Al seleccionar un espacio se guarda como “espacio actual” y se navega a Home.
- Si falla la carga por red, mostrar “No pudimos conectarnos. Reintentá.” y permitir reintentar.

---

# EPIC 1 — Home y navegación

## US-0101 — Ver Home (hub de módulos)
**Como** usuario del espacio  
**Quiero** ver un Home con accesos a módulos del MVP  
**Para** navegar rápido a la funcionalidad.

**Criterios de aceptación**
- Home muestra accesos (cards/atajos) a:
  - Información institucional
  - Nómina
  - Prestación alimentaria
  - Formación (si entra en MVP)
  - Rendiciones
  - Mensajes
- El header muestra el nombre del espacio actual.
- Si existen contadores (mensajes sin leer / rendiciones observadas), se muestran como badge (opcional MVP).

---

# EPIC 2 — Información institucional y documentos

## US-0201 — Ver perfil del espacio
**Como** referente/usuario interno del espacio  
**Quiero** ver la ficha del espacio  
**Para** conocer datos institucionales y contactos.

**Criterios de aceptación**
- Se visualizan campos mínimos:
  - nombre del espacio
  - dirección/localidad (si existe)
  - provincia/municipio (si existe)
  - estado (activo/suspendido/sin_datos)
  - contactos disponibles (si existen)
- Si no hay datos, se muestra “sin datos” sin romper la pantalla.
- Si el espacio no existe (404), mostrar mensaje amigable y opción “Volver”.

---

## US-0202 — Ver lista de documentos/convenios
**Como** usuario del espacio  
**Quiero** ver documentos disponibles  
**Para** acceder a convenios y archivos asociados.

**Criterios de aceptación**
- Lista con título + fecha actualización + acción para abrir/descargar.
- Estado vacío: “No hay documentos disponibles”.
- La lista es paginable si excede cierto volumen (page/page_size).

---

## US-0203 — Abrir / descargar documento
**Como** usuario del espacio  
**Quiero** abrir o descargar un documento  
**Para** consultarlo cuando lo necesite.

**Criterios de aceptación**
- Al seleccionar un documento se accede a detalle (o descarga).
- Si el documento no está disponible (404) se muestra error amigable.
- Si falla la descarga por red, permite reintentar.

---

# EPIC 3 — Mensajes operativos

## US-0301 — Ver lista de mensajes
**Como** usuario del espacio  
**Quiero** ver mensajes operativos del programa  
**Para** estar al tanto de novedades y requerimientos.

**Criterios de aceptación**
- Lista muestra: título + fecha + resumen.
- Estado vacío: “No hay mensajes por ahora”.
- Paginación en lista (page/page_size).

---

## US-0302 — Ver detalle de mensaje
**Como** usuario del espacio  
**Quiero** ver el contenido completo de un mensaje  
**Para** entender qué acción se espera.

**Criterios de aceptación**
- Detalle muestra: título + fecha + cuerpo completo.
- Navegación: “Volver” retorna a lista.
- Si el mensaje no existe (404) mostrar mensaje amigable.

---

# EPIC 4 — Nómina (personas)

## US-0401 — Ver lista de nómina con búsqueda y filtros
**Como** usuario del espacio  
**Quiero** listar personas de la nómina con búsqueda y filtros  
**Para** encontrar y gestionar participantes rápidamente.

**Criterios de aceptación**
- Lista muestra: nombre y apellido + estado (activa/inactiva) + flags si aplican.
- Búsqueda por texto libre (nombre/apellido/documento).
- Filtros mínimos:
  - activas/inactivas
  - participa alimentación / formación (si aplican en modelo)
- Estado vacío: “Todavía no cargaste personas”.
- Paginación en lista (page/page_size).

---

## US-0402 — Ver detalle de persona
**Como** usuario del espacio  
**Quiero** ver el detalle de una persona  
**Para** revisar su información y estado.

**Criterios de aceptación**
- Detalle muestra:
  - nombre y apellido
  - documento (si existe)
  - teléfono (si existe)
  - flags (si existen)
  - estado activa/inactiva
- Si la persona no existe (404), mostrar mensaje amigable.

---

## US-0403 — Crear persona (alta rápida)
**Como** referente/usuario interno (según permiso)  
**Quiero** dar de alta una persona con datos mínimos  
**Para** cargar nómina sin fricción.

**Criterios de aceptación**
- Campos obligatorios: nombre y apellido.
- Campos opcionales: documento, teléfono, flags.
- Al guardar, vuelve a lista y la persona aparece.
- Si falta nombre/apellido: error 400 con mensaje claro.
- Si el backend detecta duplicado probable (409 o warning), la app muestra advertencia amigable sin perder datos cargados.

---

## US-0404 — Editar persona
**Como** referente/usuario interno (según permiso)  
**Quiero** editar datos de una persona  
**Para** mantener la nómina actualizada.

**Criterios de aceptación**
- Permite editar campos definidos por el MVP (ej. teléfono, flags, estado).
- Al guardar, confirma “Cambios guardados” (o vuelve al detalle).
- Si no tiene permiso (403), mostrar “No tenés permiso para realizar esta acción”.

---

## US-0405 — Activar / desactivar persona
**Como** referente (según permiso)  
**Quiero** activar o desactivar una persona  
**Para** reflejar la situación real de asistencia/participación.

**Criterios de aceptación**
- Desde detalle, se ofrece acción activar/desactivar.
- Requiere confirmación (“¿Querés dar de baja a esta persona?”).
- Si la acción está prohibida por rol (403), mostrar estado “Sin permiso”.

---

## US-0406 — Importar nómina por CSV (si aplica en MVP)
**Como** referente (si se habilita)  
**Quiero** importar un CSV de personas  
**Para** cargar muchas personas de una vez.

**Criterios de aceptación**
- La pantalla permite subir un archivo.
- Muestra resultado: creados/actualizados + errores por fila + warnings.
- Si MVP define que no aplica en móvil: se muestra mensaje “Esta acción se realiza desde la web (SISOC).”

---

# EPIC 5 — Prestación alimentaria (solo lectura)

## US-0501 — Ver estado de prestación del período actual
**Como** usuario del espacio  
**Quiero** ver el estado de la prestación del período  
**Para** entender si está vigente/observada/suspendida y qué hacer.

**Criterios de aceptación**
- Se muestra:
  - período (YYYY-MM)
  - estado (vigente/en_revision/observada/suspendida/sin_datos)
  - resumen operativo
  - observaciones (si aplica)
- Si no hay datos: “No hay información disponible para este período”.
- No hay edición (solo lectura).

---

## US-0502 — Ver historial por período
**Como** usuario del espacio  
**Quiero** ver períodos anteriores  
**Para** tener trazabilidad simple de estados.

**Criterios de aceptación**
- Lista de períodos + estado.
- Al seleccionar, se abre detalle por período (si existe).
- Si no hay historial, mostrar estado vacío.

---

# EPIC 6 — Rendiciones y comprobantes

## US-0601 — Ver lista de rendiciones
**Como** usuario del espacio  
**Quiero** ver la lista de rendiciones por período  
**Para** conocer su estado y trabajar sobre la que corresponda.

**Criterios de aceptación**
- Lista muestra: período + estado + última actualización + observaciones si estado observada.
- Paginación si aplica.
- Estado vacío: “No hay rendiciones cargadas”.

---

## US-0602 — Ver detalle de rendición
**Como** usuario del espacio  
**Quiero** ver detalle de una rendición y sus adjuntos  
**Para** saber qué falta y qué se observó.

**Criterios de aceptación**
- Detalle muestra:
  - período
  - estado
  - observaciones (si aplica)
  - lista de adjuntos con estado (cargado/validado/invalidado) y motivo si invalidado
- Si no existe (404), mostrar mensaje amigable.

---

## US-0603 — Adjuntar comprobante
**Como** referente/usuario interno (según permiso)  
**Quiero** subir un comprobante a una rendición  
**Para** cumplir con la rendición del período.

**Criterios de aceptación**
- Permite seleccionar archivo (pdf/jpg/png) hasta límite definido (ej 10MB).
- Al subir, el adjunto aparece en la lista con estado “cargado”.
- Si supera tamaño o tipo no permitido: mensaje claro.
- Si no tiene permiso: “No tenés permiso para realizar esta acción”.

---

## US-0604 — Presentar rendición
**Como** referente (según permiso)  
**Quiero** presentar la rendición  
**Para** formalizar el envío al programa.

**Criterios de aceptación**
- Solo visible/habilitado para rol que puede presentar.
- Requiere confirmación: “Al presentar se bloquean cambios.”
- Si no hay adjuntos: mostrar “Para presentar la rendición debés adjuntar al menos 1 comprobante.”
- Al presentar, estado pasa a “presentada” y se refleja en lista y detalle.

---

# EPIC 7 — Formación (si entra en MVP)

## US-0701 — Ver lista de actividades
**Como** usuario del espacio  
**Quiero** ver actividades de formación  
**Para** gestionar y reportar acciones formativas.

**Criterios de aceptación**
- Lista con: título + fecha + estado + cantidad de participantes.
- Estado vacío: “No hay actividades cargadas”.

---

## US-0702 — Crear/editar actividad (si se habilita en MVP)
**Como** referente/usuario interno (según permiso)  
**Quiero** crear o editar una actividad  
**Para** registrar actividades del espacio.

**Criterios de aceptación**
- Campos mínimos: título (obligatorio), fecha (obligatorio), descripción (opcional), estado.
- Regla MVP: solo se edita si estado = planificada.
- Si no tiene permiso: mostrar “Sin permiso”.

---

## US-0703 — Gestionar participantes desde nómina (si se habilita en MVP)
**Como** usuario con permiso  
**Quiero** agregar/quitar participantes de una actividad  
**Para** registrar asistencia.

**Criterios de aceptación**
- Permite agregar participantes seleccionando personas de la nómina.
- Muestra cantidad de participantes.
- Permite quitar participante.
- Si falla por red, permite reintentar sin perder selección (ideal).

---

# Cierre MVP — Definición de Done (DoD) mínimo

## DoD MVP (aplicable a todas las stories)
- La pantalla funciona con RBAC server-side (403 controlado).
- Maneja estados UI: vacío / sin datos / sin permiso / error de red.
- Paginación para listados si aplica.
- Mensajes al usuario claros y sin tecnicismos.
- QA smoke pasa (ver `06_calidad/plan-qa-smoke.md`).

---

# Pendientes a confirmar en reunión con SISOC
- Mecanismo de autenticación (JWT vs sesión).
- Identificadores reales (space_id / person_id / claim_id).
- Existencia real de módulos (nómina/rendiciones/mensajes/documentos) y qué se reutiliza vs qué se crea.
- Storage de archivos (rutas, URLs firmadas, expiración).
- Catálogo real de estados y mapeo (benefit / rendiciones).
