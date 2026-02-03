# UI Data Contracts — Campos por pantalla (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** UI_UX / DEV_Impl / ARQ_Nav  
    **Nivel:** Interno

## Objetivo
Definir por pantalla:
- **qué datos se muestran**
- **qué endpoint los provee**
- **reglas RBAC**
- **estados UI** (loading/vacío/error/sin permiso)

> Nota: los endpoints son “contrato propuesto v0” hasta validar con SISOC.

---

## 1) Home (Hub)
**Datos**
- `space_name`
- Badges: `unread_messages_count` (opcional), `claims_observed_count` (opcional)

**Fuente**
- `GET /me` + endpoints de cada módulo (o un agregado si se decide optimizar)

**RBAC**
- Muestra módulos según permisos.

**Estados**
- Loading inicial
- Error de red

---

## 2) Perfil del espacio
**Datos**
- `name`, `address`, `locality`, `jurisdiction.province`, `jurisdiction.municipality`
- `status` (SpaceStatus)
- `contacts[]` (tipo + valor + horarios)

**Fuente**
- `GET /spaces/{space_id}/profile`

**RBAC**
- Lectura para roles habilitados al espacio.

**Estados**
- Vacío: `sin_datos`
- Error: 404/500

---

## 3) Documentos (lista)
**Datos**
- `items[]: document_id, title, updated_at, download_url`

**Fuente**
- `GET /spaces/{space_id}/documents`

**RBAC**
- Lectura.

**Estados**
- Vacío: “No hay documentos disponibles”
- Error de red

---

## 4) Mensajes (lista/detalle)
**Datos lista**
- `items[]: message_id, title, date, body (preview)`

**Fuente**
- `GET /spaces/{space_id}/messages?page&page_size`

**RBAC**
- Lectura.

**Estados**
- Vacío: “No hay mensajes por ahora”
- Error + reintentar

---

## 5) Nómina (lista)
**Datos**
- `items[]: person_id, first_name, last_name, doc_type?, doc_number?, active`
- flags opcionales: `participa_alimentacion`, `participa_formacion`

**Fuente**
- `GET /spaces/{space_id}/people?q&active&page&page_size`

**RBAC**
- Referente e interno: lectura + operación (según delegación)
- Técnico: lectura/validación (si aplica)

**Estados**
- Vacío: “Todavía no cargaste personas”
- Error + reintentar

---

## 6) Persona (detalle/alta/editar)
**Datos**
- detalle: campos de persona
- alta/editar: mismos campos con validaciones mínimas

**Fuente**
- `POST /spaces/{space_id}/people`
- `PATCH /spaces/{space_id}/people/{person_id}`

**RBAC**
- Solo roles del espacio con permiso de edición.

**Estados**
- Error 400 con mensajes claros por campo
- 409 duplicado probable (warning)

---

## 7) Prestación alimentaria (estado/historial)
**Datos**
- `status` (BenefitStatus), `period`, `summary`, `observations`
- `history[]: period, status`

**Fuente**
- `GET /spaces/{space_id}/benefit`
- `GET /spaces/{space_id}/benefit/{period}`

**RBAC**
- Lectura.

**Estados**
- `sin_datos`: mostrar mensaje amigable
- Error + reintentar

---

## 8) Formación (lista/crear/editar/participantes)
**Datos lista**
- `items[]: activity_id, title, date, status, participants_count`

**Datos detalle**
- `description` (opcional)
- `participants[]` (mínimo: person_id, nombre)

**Fuente**
- `GET /spaces/{space_id}/training`
- `POST /spaces/{space_id}/training`
- `PATCH /spaces/{space_id}/training/{activity_id}`
- `POST /spaces/{space_id}/training/{activity_id}/participants`
- `DELETE /spaces/{space_id}/training/{activity_id}/participants/{person_id}`

**RBAC**
- Referente e interno: crear/editar
- Técnico: lectura/validación (si aplica)

**Estados**
- Vacío: “No hay actividades cargadas”
- Error + reintentar

---

## 9) Rendiciones (lista/detalle/adjuntar/presentar)
**Datos lista**
- `items[]: claim_id, period, status (ClaimStatus), updated_at, observations?`

**Datos detalle**
- `attachments[]: attachment_id, filename, status (AttachmentStatus), reason?`

**Fuente**
- `GET /spaces/{space_id}/accounting/claims`
- `GET /spaces/{space_id}/accounting/claims/{claim_id}`
- `POST /spaces/{space_id}/accounting/claims/{claim_id}/attachments`
- `POST /spaces/{space_id}/accounting/claims/{claim_id}/submit`

**RBAC**
- Referente: adjuntar + presentar
- Interno: adjuntar (si delegado)
- Técnico/Admin: lectura y aprobación (fuera de app si aplica)

**Estados**
- Vacío: “No hay rendiciones cargadas”
- Error 400 tamaño/tipo archivo
- Error 403 sin permiso

