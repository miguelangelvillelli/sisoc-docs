# Glosario

!!! info "Estado"
    **Versión:** v0.3  
    **Última actualización:** 2026-02-04  
    **Responsable:** Equipo SISOC  
    **Nivel:** Interno

## Términos principales

- **SISOC:** sistema existente (web) utilizado por equipos técnicos/administrativos del programa. En este proyecto, SISOC actúa como **fuente de datos** y base operativa (MySQL + backoffice Django).
- **Legajo de Espacio:** conjunto de información institucional y operativa asociada a un **Espacio/Centro**, accesible desde la app móvil/PWA y/o desde SISOC web.
- **Espacio / Centro:** unidad operativa (comunitaria) que brinda servicios y se relaciona con el Programa. Es la entidad clave del MVP.
- **Organización:** entidad que puede agrupar varios espacios (si aplica). En el MVP se considera como evolución (ver ADR).
- **Jurisdicción:** encuadre territorial del espacio (por ejemplo **provincia** y **municipio**) utilizado para segmentar accesos, reportes y supervisión.
- **Multi-espacio:** situación donde un mismo usuario tiene acceso a **más de un Espacio**; requiere “Selector de espacio”.

## Usuarios, roles y acceso

- **Usuario del espacio:** usuario que ingresa a operar para un espacio (rol “referente” o “usuario interno”).
- **Referente (Administrador del espacio):** usuario principal del espacio. Administra usuarios internos del espacio y realiza acciones sensibles (por ejemplo presentar rendiciones).
- **Usuario interno del espacio:** usuario creado por el referente para operar tareas delegadas dentro del mismo espacio (según permisos).
- **Operador territorial / Técnico:** rol del programa que acompaña, valida, observa y supervisa información según asignación territorial.
- **Administrador central:** rol de administración/supervisión con alcance nacional/provincial/municipal según permisos.
- **Usuario de organización:** rol propuesto para operar/ver múltiples espacios asociados a una organización (no necesariamente MVP).
- **RBAC (Role-Based Access Control):** control de acceso basado en roles. Define qué puede ver/hacer cada usuario según su rol y alcance.
- **Permisos server-side:** regla por la cual los permisos se validan en el backend (API), no en el cliente. La UI solo refleja lo permitido.

## Gobierno del dato

- **Auditoría:** registro de eventos relevantes del sistema (quién hizo qué, cuándo, sobre qué entidad).
- **Trazabilidad:** capacidad de reconstruir el historial de acciones y estados a lo largo del tiempo (por ejemplo, una rendición desde borrador a aprobada).

## Producto, UX y documentación

- **MVP (Minimum Viable Product):** primera versión “mínima” funcional, enfocada en valor operativo inmediato, con alcance acotado y evoluciones planificadas.
- **Roadmap:** planificación de evolución posterior al MVP.
- **Fuera de alcance:** funcionalidades explícitamente excluidas del MVP para proteger tiempos, costo y riesgo.
- **Wireframe:** boceto de una pantalla (baja fidelidad).
- **Wireflow / Wireflow:** wireframes conectados por flujo de navegación (pantallas + transiciones).
- **Home (Hub):** pantalla de inicio que funciona como “centro de operaciones” con accesos a los módulos y alertas (badges) del usuario/espacio.
- **CTA (Call To Action):** acción principal de una pantalla (normalmente el botón principal, ej. “Ingresar”, “Guardar”, “Presentar rendición”).

## Tecnología

- **PWA (Progressive Web App):** aplicación web mobile-first “instalable” en el celular (con manifest y service worker). En el MVP se usa como alternativa rápida a una app nativa.
- **API móvil:** conjunto de endpoints del backoffice Django que consumirá la PWA/app (`/api/mobile/v1/`), aplicando RBAC, auditoría, validaciones y paginación.
- **Endpoint:** ruta de la API que expone una función (ej. `GET /me`).
- **Scope (contexto):** alcance del usuario autenticado (por ejemplo `space_id`, rol, jurisdicción).
- **JWT (Bearer Token):** mecanismo de autenticación basado en tokens enviados en el header `Authorization: Bearer ...`.
- **Session (cookie):** mecanismo de autenticación típico web basado en cookies/sesión (menos ideal en móvil).

## Módulos del MVP

- **Información institucional:** datos de ficha del espacio (nombre, dirección, jurisdicción, estado, contactos) y documentación asociada.
- **Documento / Convenio:** archivo o enlace institucional visible al espacio (solo lectura en MVP). Puede incluir convenios, instructivos y normativa operativa.
- **Mensajes operativos:** bandeja oficial de comunicaciones del programa hacia el espacio (avisos, recordatorios, observaciones, cambios de proceso), con trazabilidad.
- **Nómina:** listado de personas asociadas al espacio (asistidas/participantes) con alta/edición mínima según reglas del MVP.
- **Persona (nómina):** registro individual dentro de la nómina del espacio (puede incluir datos básicos, DNI opcional/obligatorio según definición).
- **Importación CSV:** carga masiva de nómina desde un archivo. Puede estar habilitada o restringida al canal web (según definición final).
- **Dedupe / Duplicado probable:** detección de coincidencias (por DNI u otros campos) para evitar registros repetidos.
- **Prestación alimentaria (MVP lectura):** módulo de consulta del estado del beneficio/financiamiento del espacio (estado, período, observaciones, historial). No implica necesariamente carga en el MVP.
- **Período:** unidad temporal de operación (por ejemplo mes/año) para prestación y rendiciones.
- **Formación:** módulo para registrar/consultar actividades y participantes (según alcance MVP).
- **Rendición:** proceso de presentación de comprobantes y documentación asociada a fondos, por período, con estados y observaciones.
- **Claim:** término técnico usado para “rendición” (por ejemplo en contratos API y conteos del hub).
- **Comprobante / Adjunto:** archivo subido para respaldar una rendición (pdf/jpg/png), sujeto a reglas de tamaño/tipo y validaciones.
- **Observada:** estado de rendición que indica que fue revisada y tiene observaciones; requiere acción/corrección del espacio.
- **claims_observed_count:** contador de rendiciones en estado “observada” para mostrar alertas en el Home (Hub).

## Códigos de respuesta (HTTP)

- **200 OK:** lectura exitosa.
- **201 Created:** alta exitosa.
- **400 Bad Request:** error de validación (faltan campos, formato inválido).
- **401 Unauthorized:** no autenticado (sesión/token inválido o ausente).
- **403 Forbidden:** autenticado pero sin permisos (RBAC).
- **404 Not Found:** recurso inexistente o no accesible por scope.
- **409 Conflict:** posible duplicado o conflicto de estado.

---

## Sinónimos y equivalencias (para alinear lenguaje)

- **Espacio = Centro = Comedor** (usar “Espacio” como estándar en documentación; el término visible en UI se define con UX).
- **Referente = Administrador del espacio**.
- **Operador territorial = Técnico** (según contexto).
- **Rendición = Claim** (en contratos API y métricas internas puede aparecer como “claim”).
- **Home = Hub** (Home es el nombre; Hub describe la función).
- **Documento = Convenio** (cuando el archivo es un acuerdo formal).
- **Adjunto = Comprobante** (cuando respalda una rendición).
- **Observada = Con observaciones** (sinónimo para UI, más claro para el usuario final).
