# Plan de Sprints — MVP App móvil (Legajo de Espacio)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** PLAN_Vibe / ARQ_Nav / QA_Test  
    **Nivel:** Interno

## Objetivo
Ejecutar el MVP por iteraciones cortas, priorizando:
- flujo end-to-end funcional,
- integración segura con SISOC (Django + MySQL) vía API,
- RBAC server-side,
- QA smoke desde el Sprint 1.

## Supuestos de trabajo
- SISOC existente: backoffice Django + base MySQL (fuente de verdad).
- La app móvil consume **solo API**, nunca MySQL directo.
- La autenticación queda “placeholder” hasta reunión, pero se implementa el esqueleto.
- Cada sprint deja algo usable (aunque sea con datos mínimos o mock).

## Definición de Done (DoD) para todos los sprints
- RBAC aplicado server-side y probado con al menos 2 roles.
- Estados UI cubiertos: vacío / sin datos / sin permiso / error red.
- Errores con mensajes claros (no técnicos).
- Logs/auditoría mínima en backend para acciones relevantes (cuando aplique).
- QA Smoke actualizado y pasado (ver `06_calidad/plan-qa-smoke.md`).
- Documentación actualizada (pantallas + contratos API si cambian).

---

# Sprint 0 — Setup + acuerdos de integración (rápido pero crítico)

## Objetivo
Dejar el proyecto listo para desarrollar sin fricción y llegar a reunión SISOC con preguntas cerradas.

## Entregables
- Repo/estructura docs + MkDocs funcionando (listo).
- Contratos API v0 en borrador y lista de endpoints del MVP.
- Preguntas de reunión SISOC completas y priorizadas.
- Decisión preliminar: **Auth Opción A (JWT)** como default (confirmable).

## Tareas
- Confirmar con SISOC:
  - Auth (JWT/session), login/refresh
  - IDs reales (space_id/person_id/claim_id)
  - existencia de módulos (nómina/rendiciones/documentos/mensajes)
  - storage de archivos (descarga/URL firmada)
- Alinear catálogos de estados reales (prestación/rendiciones).
- Definir entorno dev: URL base API + CORS + versionado `/api/mobile/v1/`.

## Criterio de salida
- Quedan “cerradas” las incógnitas principales o documentadas como pendientes con owner y fecha.

---

# Sprint 1 — “App usable” (Acceso + Home + Info institucional + Mensajes)

## Objetivo
Que el espacio pueda entrar, elegir espacio si aplica, navegar, ver perfil institucional y leer mensajes.

## Historias (referencia)
- US-0001 / US-0002 (contexto y selector)
- US-0101 (Home)
- US-0201 / US-0202 / US-0203 (perfil + docs)
- US-0301 / US-0302 (mensajes)

## Backend/API
- `GET /me` (contexto)
- `GET /spaces/{space_id}/profile`
- `GET /spaces/{space_id}/documents`
- `GET /spaces/{space_id}/messages`

## Front móvil (pantallas)
- Login/Acceso (si aplica) + manejo de sesión
- Selector de espacio (si aplica)
- Home (hub)
- Perfil del espacio
- Documentos (lista + abrir/descargar)
- Mensajes (lista + detalle)

## QA Smoke (Sprint 1)
- Acceso OK / sin espacios / multi-espacio
- Perfil carga OK / sin datos
- Documentos: lista / vacío / descarga error
- Mensajes: lista / vacío / detalle

## Criterio de salida
- Usuario real (o de prueba) entra y navega end-to-end.
- Documentos y mensajes visibles con estados UI correctos.
- RBAC aplicado al menos en lectura (403 controlado).

---

# Sprint 2 — Nómina (listado + alta rápida + edición básica)

## Objetivo
Que el espacio gestione su nómina mínima desde el celular.

## Historias
- US-0401 (lista + búsqueda + filtros)
- US-0402 (detalle)
- US-0403 (alta rápida)
- US-0404 (editar)
- US-0405 (activar/desactivar)
- US-0406 (CSV) **solo si aplica** (si no, mensaje “solo web”).

## Backend/API
- `GET /spaces/{space_id}/people`
- `POST /spaces/{space_id}/people`
- `PATCH /spaces/{space_id}/people/{person_id}`
- `POST /spaces/{space_id}/people/import` (si aplica)

## QA Smoke (Sprint 2)
- Lista con paginación + búsqueda
- Alta rápida valida campos obligatorios
- Duplicado probable (warning/409) manejado
- Editar y activar/desactivar con permisos

## Criterio de salida
- Se puede crear y editar personas sin fricción.
- Los roles restringen acciones (403).
- Estados UI y errores están cubiertos.

---

# Sprint 3 — Rendiciones (listar + adjuntar + presentar)

## Objetivo
Que el espacio pueda ver rendiciones, adjuntar comprobantes y presentar.

## Historias
- US-0601 (lista)
- US-0602 (detalle)
- US-0603 (adjuntar comprobante)
- US-0604 (presentar)

## Backend/API
- `GET /spaces/{space_id}/accounting/claims`
- `GET /spaces/{space_id}/accounting/claims/{claim_id}`
- `POST /spaces/{space_id}/accounting/claims/{claim_id}/attachments`
- `POST /spaces/{space_id}/accounting/claims/{claim_id}/submit`

## Reglas clave
- Tamaño y tipo de archivo (pdf/jpg/png, límite definido).
- Presentar solo si:
  - rol habilitado (referente)
  - al menos 1 comprobante
- Estado de rendición se refleja en lista y detalle.

## QA Smoke (Sprint 3)
- Adjuntar archivo válido / inválido / demasiado grande
- Presentar con adjuntos OK
- Presentar sin adjuntos → error claro
- Sin permiso → 403 controlado

## Criterio de salida
- Un referente puede completar el circuito de rendición desde la app.
- El sistema es estable y auditable (mínimo).

---

# Sprint 4 — Prestación alimentaria (solo lectura) + hardening

## Objetivo
Cerrar el MVP con prestación (solo lectura) y mejoras de calidad/performance.

## Historias
- US-0501 (estado actual)
- US-0502 (historial)

## Backend/API
- `GET /spaces/{space_id}/benefit`
- `GET /spaces/{space_id}/benefit/{period}`

## Hardening
- Paginación y performance (índices/queries)
- Caching simple si aplica (server-side)
- Telemetría mínima (logs + métricas básicas)
- Ajustes UX (mensajes, vacíos, reintentos)

## QA Smoke (Sprint 4)
- Beneficio con datos / sin datos / error backend
- Historial OK / vacío
- Reintentos por red

## Criterio de salida
- MVP completo con módulos principales funcionando y documentados.

---

# Sprint 5 (Opcional) — Formación (si entra en alcance)
Si se decide incluir Formación en MVP:
- US-0701 (lista)
- US-0702 (crear/editar)
- US-0703 (participantes)

Caso contrario: queda en roadmap post-MVP.

---

## Pendientes para reunión SISOC (bloqueantes de planificación fina)
- Auth definitivo (JWT/session) y endpoint de login/refresh.
- Modelos reales de:
  - documentos (storage)
  - mensajes
  - nómina
  - rendiciones
  - prestación alimentaria
- Catálogo real de estados y mapeos.
- Volúmenes esperados (performance + paginación).
