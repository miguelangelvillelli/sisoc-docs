# Estados y reglas (MVP) — Catálogos y transiciones

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** DB_Model / ARQ_Nav  
    **Nivel:** Interno

## Objetivo
Definir los **estados mínimos** del MVP y las **reglas operativas** asociadas para:
- mantener consistencia entre módulos,
- simplificar validaciones del backoffice (API),
- facilitar el mapeo con estados existentes en SISOC (MySQL/Django).

!!! warning "Integración SISOC"
    Estos catálogos son el **lenguaje común del MVP**. En reunión se define el **mapeo** desde estados reales de SISOC a estos estados.

---

## Convenciones
- Los estados son **finito y controlado** (enum).
- Las transiciones se validan **en servidor** (Django/API).
- Cualquier operación relevante genera **evento de auditoría**.

---

# 1) Estados de Espacio (referencia)

## Catálogo propuesto: `space_status`
- `activo`
- `suspendido`
- `en_revision`
- `sin_datos` (cuando no hay datos operativos suficientes)
- `inactivo` (baja administrativa / no operativo)

## Reglas mínimas
- Un espacio `suspendido` puede **visualizar** información institucional, pero puede restringirse:
  - altas/ediciones de nómina,
  - presentación de rendiciones,
  - registro de formación (a definir).
- `sin_datos` debe mostrar mensajes claros en app (no error técnico).

## Pendiente SISOC
- Confirmar si SISOC ya maneja estados y cómo se llaman.

---

# 2) Nóminas (Personas)

## Catálogo: `person_status`
- `activa`
- `inactiva`

## Reglas mínimas
- MVP permite alta con mínimos: `nombre`, `apellido`.
- Documento (`tipo_doc`, `nro_doc`) es **opcional** en MVP (si se decide, pasa a obligatorio).
- Duplicación:
  - si existe `doc_type+doc_number` en el mismo espacio → warning o bloqueo (a definir).
  - si existe en otro espacio → warning (no bloqueo en MVP).
- `inactiva` no se borra: se conserva historial (técnica de “soft delete”).

## Transiciones permitidas
- `activa -> inactiva`
- `inactiva -> activa`

---

# 3) Prestación alimentaria (solo lectura en MVP)

## Catálogo: `benefit_status`
- `vigente`
- `en_revision`
- `observada`
- `suspendida`
- `sin_datos`

## Reglas mínimas
- MVP solo **visualiza**.
- No mostrar información sensible no destinada al espacio (pendiente definición).
- Debe existir un “mensaje claro” para el espacio:
  - `summary` breve y operativo,
  - `observations` si corresponde.

## Pendiente SISOC
- Definir estructura real: si existe “liquidación”, “período”, “corte”, etc.
- Definir si hay historial y cómo se obtiene.

---

# 4) Formación

## Catálogo: `training_activity_status`
- `planificada`
- `finalizada`
- `cancelada`

## Reglas mínimas
- Se puede editar una actividad solo si está en `planificada`.
- Participantes:
  - se agregan desde nómina del espacio,
  - no se duplican dentro de una actividad.
- Cierre:
  - `planificada -> finalizada` registra fecha de cierre (si aplica).

## Transiciones permitidas
- `planificada -> finalizada`
- `planificada -> cancelada`

---

# 5) Rendiciones

## Catálogo: `claim_status`
- `borrador`
- `presentada`
- `observada`
- `aprobada`
- `rechazada`

## Reglas mínimas (MVP)
- Una rendición comienza siempre en `borrador`.
- Para presentar:
  - debe tener al menos 1 comprobante adjunto,
  - solo rol “referente” (según RBAC).
- En `presentada`:
  - el espacio no puede editar datos ni borrar adjuntos (salvo regla explícita).
- En `observada`:
  - el espacio puede responder subiendo nuevos adjuntos o corrigiendo (a definir alcance MVP).
- Estados finales:
  - `aprobada` y `rechazada` son terminales (no vuelven atrás).

## Transiciones permitidas
- `borrador -> presentada`
- `presentada -> observada`
- `presentada -> aprobada`
- `presentada -> rechazada`
- `observada -> presentada` (re-presentación tras corrección)

---

# 6) Comprobantes (adjuntos)

## Catálogo: `attachment_status`
- `cargado`
- `validado`
- `invalidado`

## Reglas mínimas
- Tipos aceptados (MVP): `pdf`, `jpg`, `png`
- Tamaño máximo (MVP): 10MB (ajustable)
- Límite por rendición: 20 (ajustable)
- Si un comprobante es `invalidado` debe tener `motivo_invalidacion`.

## Transiciones permitidas
- `cargado -> validado`
- `cargado -> invalidado`
- `invalidado -> cargado` (si se decide “reemplazo”, sino se sube uno nuevo)

## Pendiente SISOC
- Confirmar storage real de archivos (filesystem / S3 / otro).
- Confirmar si ya existe repositorio de adjuntos y cómo se versiona.

---

# 7) Documentos institucionales

## Catálogo: `document_status`
- `vigente`
- `reemplazado`
- `retirado`

## Reglas mínimas
- El espacio siempre ve la versión `vigente`.
- `reemplazado` se conserva para auditoría interna (opcional mostrar historial).
- `retirado` no se muestra al espacio.

---

# 8) Mensajes operativos

## Catálogo: `message_status`
- `publicado`
- `archivado`

## Reglas mínimas
- Solo `publicado` se muestra en app.
- Segmentación (a confirmar):
  - general
  - por jurisdicción
  - por espacio

---

# 9) Reglas transversales (server-side)

## RBAC obligatorio
- Si el rol no tiene permiso, responder `403`.
- La app nunca decide permisos.

## Auditoría mínima
Eventos recomendados:
- persona_create / persona_update / persona_toggle_status
- claim_create / claim_submit
- attachment_upload
- training_create / training_update / training_status_change
- document_download
- benefit_view

## Paginación y performance
- Listados grandes (nómina, rendiciones, mensajes) siempre paginados.

---

# 10) Pendientes para reunión (checklist)
- Confirmar estado real de “Espacio” en SISOC y mapeo a `space_status`
- Confirmar si existe “nómina/personas” en SISOC (y estados)
- Confirmar estados reales de “prestación” y “rendición”
- Confirmar storage de archivos y política de URLs (firmadas/expiran)
- Confirmar reglas sobre edición en `observada`
