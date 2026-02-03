# Plan de Sprints — MVP App móvil (SISOC · Legajo de Espacio)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** PLAN_Vibe / DEV_Impl / QA_Test  
    **Nivel:** Interno

## Objetivo
Planificar la entrega del MVP en sprints cortos, priorizando:
- integración no destructiva con SISOC existente (MySQL + Django),
- contratos claros (API v0),
- prototipos UX como guía,
- QA smoke por incremento.

> Nota: la duración sugerida es **1 semana por sprint**. Si el equipo decide 2 semanas, los contenidos se mantienen y se ajusta la granularidad.

---

## Supuestos (a confirmar)
- La app móvil **no accede directo a MySQL**: todo via API Django.
- Se implementa RBAC server-side según `02_roles_y_accesos/rbac.md`.
- Los estados de dominio se alinean a `04_datos/catalogos.md`.
- Prototipos UX en Figma: `08_wireflows/pantallas-mvp.md` y `ui-data-contracts.md`.
- La autenticación queda definida en reunión con equipo SISOC.

---

## Definición de “Done” por sprint (regla)
Un ítem se considera Done cuando:
- está implementado (backend + mobile cuando aplica),
- tiene validación de permisos,
- está testeado con smoke (ver `06_calidad/plan-qa-smoke.md`),
- queda documentado (pantalla / endpoint / reglas si cambió algo).

---

# Sprint 0 — Alineación, base técnica y decisiones (Setup)
**Objetivo:** dejar el equipo listo para construir sin bloqueos.

### Entregables
- Repo + MkDocs publicado y actualizado.
- Prototipo low-fi navegable (mínimo) para el MVP.
- Decisiones cerradas: `space_id`, auth, existencia de módulos (nómina/rendiciones/documentos/mensajes).
- Contratos API v0 ajustados con nombres reales SISOC.

### User stories / tareas
- Como equipo, queremos confirmar **la entidad Espacio** (tabla/modelo + `space_id`) para asegurar integración estable.
- Como equipo, queremos definir **auth** (JWT vs Session) para habilitar login y sesión móvil.
- Como backend, quiero definir estructura `api/mobile/v1/` para estandarizar endpoints.
- Como QA, quiero acordar dataset y usuarios de prueba para repetir smoke.

### Criterios de aceptación
- Existe documento de decisiones (ADR-0003 actualizado si aplica).
- El contrato `05_api/contratos-v0.md` refleja nombres reales confirmados.
- Existe ambiente o estrategia de testing (staging o datos controlados).

---

# Sprint 1 — Acceso + Contexto + Home (Hub)
**Objetivo:** habilitar uso real de la app: entrar, resolver alcance y navegar.

### Alcance funcional (pantallas)
- Login / Acceso (placeholder si auth aún en definición final)
- Selector de espacio (si multi-espacio)
- Home (Hub)

### User stories
- Como usuario, quiero **iniciar sesión** para acceder a la app.
- Como usuario con más de un espacio, quiero **seleccionar el espacio** a operar.
- Como usuario, quiero ver un **Home** con accesos a los módulos habilitados por mi rol.

### Contratos API (referencia)
- `GET /me`
- (si aplica) `POST /auth/login`, `POST /auth/refresh` (placeholder a confirmar)

### Criterios de aceptación
- RBAC aplicado: un usuario sin espacio ve mensaje “no asignado”.
- Si multi-espacio, selector aparece y guarda última elección.
- Home muestra módulos según permisos (ocultar o deshabilitar definido por UX).

### QA smoke (mínimo)
- Login OK / login inválido
- Usuario sin espacios
- Usuario con 1 espacio / con varios

---

# Sprint 2 — Información institucional + Documentos + Mensajes
**Objetivo:** entregar “valor inmediato” (consulta) con datos de SISOC.

### Alcance funcional (pantallas)
- Perfil del espacio
- Documentos (lista) + Documento (detalle/descarga)
- Mensajes (lista) + Mensaje (detalle)

### User stories
- Como usuario, quiero ver el **perfil del espacio** para conocer mi información institucional.
- Como usuario, quiero consultar **documentos y convenios** asociados al espacio.
- Como usuario, quiero leer **mensajes operativos** del programa para estar al día.

### Contratos API (referencia)
- `GET /spaces/{space_id}/profile`
- `GET /spaces/{space_id}/documents`
- `GET /spaces/{space_id}/messages?page&page_size`

### Criterios de aceptación
- Soporta “sin datos” y “vacío” con mensajes claros.
- Descarga/visualización de documentos funciona (definición según storage).
- Paginación en mensajes.

### QA smoke (mínimo)
- Perfil OK / sin datos / 404
- Documentos vacío
- Mensajes paginados

---

# Sprint 3 — Nómina (CRUD mínimo + validaciones + opcional CSV)
**Objetivo:** habilitar gestión mínima de personas.

### Alcance funcional (pantallas)
- Nómina: lista + búsqueda + filtros
- Persona: detalle
- Persona: alta rápida
- Persona: edición
- Importación CSV (solo si se habilita en MVP móvil)

### User stories
- Como usuario, quiero ver la **lista de personas** de mi espacio con búsqueda/filtros.
- Como usuario, quiero dar de alta una persona con **nombre y apellido** como mínimo.
- Como usuario, quiero editar datos y activar/desactivar una persona según permisos.
- Como referente (opcional), quiero importar un CSV para carga masiva.

### Contratos API (referencia)
- `GET /spaces/{space_id}/people?q&active&page&page_size`
- `POST /spaces/{space_id}/people`
- `PATCH /spaces/{space_id}/people/{person_id}`
- `POST /spaces/{space_id}/people/import` (opcional)

### Criterios de aceptación
- Validaciones 400 con mensajes por campo.
- Manejo de duplicado probable (409 o warning).
- Auditoría mínima para create/update/status-change.

### QA smoke (mínimo)
- Alta rápida OK / validación
- Búsqueda + filtros
- Editar OK

---

# Sprint 4 — Rendiciones (lista/detalle/adjuntar/presentar) + archivos
**Objetivo:** permitir ciclo mínimo de rendición desde el espacio.

### Alcance funcional (pantallas)
- Rendiciones: lista
- Rendición: detalle
- Adjuntar comprobante
- Presentar rendición (confirmación)

### User stories
- Como usuario, quiero ver mis rendiciones por período y su estado.
- Como usuario, quiero adjuntar comprobantes (pdf/jpg/png) con reglas de tamaño.
- Como referente, quiero presentar una rendición cuando tenga al menos 1 comprobante.

### Contratos API (referencia)
- `GET /spaces/{space_id}/accounting/claims`
- `GET /spaces/{space_id}/accounting/claims/{claim_id}`
- `POST /spaces/{space_id}/accounting/claims/{claim_id}/attachments`
- `POST /spaces/{space_id}/accounting/claims/{claim_id}/submit`

### Criterios de aceptación
- RBAC: solo referente puede “presentar”.
- Validaciones: tamaño/tipo archivo, mínimo 1 adjunto.
- Estado y observaciones se muestran correctamente.
- URLs de descarga/preview (si aplica) definidas.

### QA smoke (mínimo)
- Adjuntar archivo válido / inválido
- Presentar sin adjuntos (400)
- Presentar con rol no referente (403)

---

# Sprint 5 — Formación (actividades + participantes) + Prestación (lectura)
**Objetivo:** cerrar módulos restantes del MVP.

### Alcance funcional (pantallas)
- Formación: lista + crear/editar + participantes
- Prestación alimentaria: estado actual + historial + detalle período

### User stories
- Como usuario, quiero registrar actividades de formación del espacio.
- Como usuario, quiero gestionar participantes de una actividad a partir de la nómina.
- Como usuario, quiero ver el estado de la prestación alimentaria y observaciones (solo lectura).

### Contratos API (referencia)
- `GET /spaces/{space_id}/training`
- `POST /spaces/{space_id}/training`
- `PATCH /spaces/{space_id}/training/{activity_id}`
- `POST /spaces/{space_id}/training/{activity_id}/participants`
- `DELETE /spaces/{space_id}/training/{activity_id}/participants/{person_id}`
- `GET /spaces/{space_id}/benefit`
- `GET /spaces/{space_id}/benefit/{period}`

### Criterios de aceptación
- Solo se edita actividad si `status=planificada`.
- Participantes se agregan desde nómina con manejo de duplicados.
- Prestación: mostrar `sin_datos` sin romper UX.

### QA smoke (mínimo)
- Crear actividad / editar / cambiar estado
- Agregar/quitar participante
- Prestación sin datos / con datos

---

# Sprint 6 — Hardening (performance, auditoría, seguridad, UX polish)
**Objetivo:** estabilizar para piloto.

### Alcances
- Paginación consistente + límites
- Caché donde aplique (si existe Redis)
- Auditoría completa mínima (eventos clave)
- Manejo de errores unificado
- Ajustes UX (estados, textos, accesibilidad)
- Revisión seguridad (RBAC, validación server-side, archivos)

### Criterios de aceptación
- Smoke completo pasa end-to-end en ambiente de prueba.
- Checklist de seguridad y performance mínimo aprobado.
- Documentación final actualizada (contratos + catálogos + decisiones).

---

## Dependencias externas (para gestionar)
- Confirmación SISOC: auth, modelos existentes, storage, estados reales.
- UX: prototipos navegables y componentes base.
- Datos de prueba y usuarios por rol.

## Próximos pasos inmediatos
- Mañana: reunión UX → entregar prototipo navegable + estados UI.
- Viernes: reunión técnica → cerrar decisiones + ajustar contratos API v0 → arrancar Sprint 1.
