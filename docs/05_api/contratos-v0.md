# Contratos API v0 (MVP) — App móvil sobre SISOC (Django)

!!! info "Estado"
    **Versión:** v0.2  
    **Última actualización:** 2026-02-03  
    **Responsable:** DEV_Impl / ARQ_Nav  
    **Nivel:** Interno

!!! warning "Pendiente de confirmación con SISOC"
    - Autenticación (JWT vs Session) y endpoints reales de login/refresh.  
    - IDs reales y nombres de modelos/tablas.  
    - Existencia real de módulos (nóminas/rendiciones/documentos/mensajes).  
    Este documento define un **contrato propuesto** para no frenar el MVP.

## Objetivo
Definir contratos mínimos de API para el MVP móvil, consumiendo SISOC existente a través del backoffice Django.
La API es el punto único para:
- RBAC (server-side)
- auditoría
- validaciones
- performance (paginación/caché)

!!! warning "Regla"
    La app móvil **no accede directamente a MySQL**.

---

# 1) Convenciones (v0)

## 1.1 Base path y versionado
- Base path sugerido: `/api/mobile/v1/` *(placeholder)*
- Formato: `application/json`
- Fechas: ISO 8601 (`YYYY-MM-DD` o `YYYY-MM-DDTHH:MM:SSZ`)

## 1.2 Paginación
- Query params estándar: `page`, `page_size`
- Respuesta incluye: `items`, `page`, `page_size`, `total`

## 1.3 Respuestas estándar
- `200 OK`: lectura / operación idempotente
- `201 Created`: alta
- `400 Bad Request`: validación
- `401 Unauthorized`: sin sesión/token
- `403 Forbidden`: sin permiso
- `404 Not Found`: recurso inexistente
- `409 Conflict`: posible duplicado (o warning en 200)
- `422 Unprocessable Entity`: opcional (si se estandariza)

## 1.4 Modelo estándar de error
```json
{
  "error": {
    "code": "validation_error",
    "message": "Mensaje claro",
    "details": { "field": "motivo" }
  }
}

```
##1.5 Headers sugeridos
```json

Authorization: Bearer <token> (si JWT)

Content-Type: application/json

Accept: application/json
```
#2) Autenticación (placeholder a confirmar)
```json
Opción A (recomendada): JWT Bearer

Header: Authorization: Bearer <token>

Refresh token si aplica.

Opción B: Session Django

Cookies + CSRF (menos ideal para app móvil).

!!! info "Decisión pendiente"
Se define con equipo SISOC en reunión.
Hasta entonces, la app asume JWT como default conceptual.

1) Entidades (resumen conceptual)

Space (Espacio): unidad operativa (existente en SISOC).

Document (Documento): archivos/convenios visibles para el espacio.

Message (Mensaje operativo): comunicaciones segmentadas al espacio/jurisdicción.

Person (Persona/Nómina): personas asistidas vinculadas a un espacio (existente o a crear).

Benefit (Prestación alimentaria): estado por período (MVP lectura).

Claim (Rendición): rendición por período y sus adjuntos.

Attachment (Comprobante): archivo asociado a una rendición.

4) Perfil / contexto del usuario
4.1 Obtener contexto del usuario autenticado

GET /me

Devuelve el contexto del usuario autenticado y su alcance.

200 OK
{
  "user": {
    "id": "u_123",
    "name": "Nombre Apellido",
    "role": "referente|interno|operador|admin|org_user"
  },
  "scope": {
    "spaces": [
      { "space_id": "esp_001", "space_name": "Centro X" }
    ],
    "organization_id": null,
    "jurisdiction": {
      "province": "Buenos Aires",
      "municipality": "Almirante Brown"
    }
  }
}

401 Unauthorized

Ver modelo estándar de error.

5) Información institucional y convenios
5.1 Ficha del espacio (solo lectura)

GET /spaces/{space_id}/profile

200 OK
{
  "space_id": "esp_001",
  "name": "Centro X",
  "address": "Calle 123",
  "locality": "Localidad",
  "jurisdiction": {
    "province": "XX",
    "municipality": "YY"
  },
  "status": "activo|suspendido|sin_datos",
  "contacts": [
    { "type": "whatsapp", "value": "+54....", "hours": "9-18" },
    { "type": "email", "value": "correo@dominio", "hours": null }
  ]
}

404 Not Found
{
  "error": {
    "code": "space_not_found",
    "message": "No encontramos el espacio solicitado."
  }
}

5.2 Documentos del espacio (lista)

GET /spaces/{space_id}/documents

Query params: page, page_size

200 OK
{
  "items": [
    {
      "document_id": "doc_001",
      "title": "Convenio vigente",
      "updated_at": "2026-02-01T10:00:00Z",
      "download_url": "https://... (url firmada o endpoint)"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}

200 OK (vacío)
{
  "items": [],
  "page": 1,
  "page_size": 20,
  "total": 0
}

5.3 Descargar documento (opciones)

Dependiendo de SISOC, se define uno de estos mecanismos:

Opción 1 — URL firmada (recomendada)

download_url ya viene listo en la lista/detalle y expira.

Opción 2 — Endpoint de descarga

GET /documents/{document_id}/download

Devuelve un redirect o stream del archivo.

6) Mensajes operativos
6.1 Mensajes del espacio (lista)

GET /spaces/{space_id}/messages

Query params: page, page_size

200 OK
{
  "items": [
    {
      "message_id": "msg_001",
      "title": "Recordatorio rendición",
      "date": "2026-02-02",
      "excerpt": "Texto breve...",
      "read": false
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}

6.2 Mensaje (detalle)

GET /messages/{message_id}

200 OK
{
  "message_id": "msg_001",
  "title": "Recordatorio rendición",
  "date": "2026-02-02",
  "body": "Texto completo del mensaje...",
  "read": false
}

6.3 Marcar mensaje como leído (opcional MVP)

POST /messages/{message_id}/read

200 OK
{ "ok": true }

7) Nóminas (personas)
7.1 Listar/buscar personas

GET /spaces/{space_id}/people

Query params:

q (texto libre)

active (true/false)

participa_alimentacion (true/false) (si aplica)

participa_formacion (true/false) (si aplica)

page, page_size

200 OK
{
  "items": [
    {
      "person_id": "per_001",
      "first_name": "Ana",
      "last_name": "Pérez",
      "doc_type": "DNI",
      "doc_number": "12345678",
      "birth_date": "1990-01-01",
      "phone": "+54...",
      "active": true,
      "participa_alimentacion": true,
      "participa_formacion": false
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 120
}

7.2 Alta individual (mínimo)

POST /spaces/{space_id}/people

Body
{
  "first_name": "Ana",
  "last_name": "Pérez",
  "doc_type": "DNI",
  "doc_number": "12345678",
  "birth_date": "1990-01-01",
  "phone": "+54...",
  "participa_alimentacion": true,
  "participa_formacion": false,
  "active": true,
  "notes": "..."
}

201 Created
{ "person_id": "per_999" }

409 Conflict (duplicado probable) (o warning 200)
{
  "warning": {
    "code": "possible_duplicate",
    "message": "Existe una persona con el mismo documento en el espacio."
  },
  "person_id": "per_999"
}

7.3 Edición parcial

PATCH /spaces/{space_id}/people/{person_id}

Body (ejemplo)
{
  "phone": "+54...",
  "participa_formacion": true
}

200 OK
{ "ok": true }

7.4 Importación CSV (si aplica)

POST /spaces/{space_id}/people/import

Request: multipart/form-data con file

200 OK
{
  "result": "ok|partial|error",
  "created": 10,
  "updated": 0,
  "errors": [
    { "row": 2, "message": "apellido requerido" }
  ],
  "warnings": [
    { "row": 5, "message": "duplicado probable" }
  ]
}


!!! info "Alternativa si no aplica en móvil"
Si el MVP define que la importación CSV es solo web, este endpoint puede omitirse y la UI muestra “solo web”.

8) Prestación alimentaria (MVP solo lectura)
8.1 Resumen del período actual (o último disponible)

GET /spaces/{space_id}/benefit

200 OK
{
  "status": "vigente|en_revision|observada|suspendida|sin_datos",
  "period": "2026-02",
  "summary": "Texto breve para el espacio",
  "observations": "Si aplica, mensaje claro",
  "history": [
    { "period": "2026-01", "status": "vigente" }
  ]
}

8.2 Detalle por período

GET /spaces/{space_id}/benefit/{period}

200 OK
{
  "period": "2026-02",
  "status": "vigente",
  "summary": "....",
  "observations": null
}

9) Formación (si entra en MVP)
9.1 Listar actividades

GET /spaces/{space_id}/training

Query params: status, page, page_size

200 OK
{
  "items": [
    {
      "activity_id": "act_001",
      "title": "Taller de cocina",
      "date": "2026-02-10",
      "status": "planificada|finalizada|cancelada",
      "participants_count": 12
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 3
}

9.2 Crear actividad

POST /spaces/{space_id}/training

Body
{
  "title": "Taller de cocina",
  "description": "Opcional",
  "date": "2026-02-10",
  "status": "planificada"
}

201 Created
{ "activity_id": "act_999" }

9.3 Editar actividad

PATCH /spaces/{space_id}/training/{activity_id}

Body
{ "description": "Nuevo texto" }

200 OK
{ "ok": true }

9.4 Gestionar participantes

POST /spaces/{space_id}/training/{activity_id}/participants

Body
{ "person_ids": ["per_001", "per_002"] }

200 OK
{ "added": 2 }


DELETE /spaces/{space_id}/training/{activity_id}/participants/{person_id}

200 OK
{ "ok": true }

10) Rendiciones y comprobantes
10.1 Listar rendiciones

GET /spaces/{space_id}/accounting/claims

Query params: status, page, page_size

200 OK
{
  "items": [
    {
      "claim_id": "ren_001",
      "period": "2026-01",
      "status": "borrador|presentada|observada|aprobada|rechazada",
      "updated_at": "2026-02-01T10:00:00Z",
      "observations": "Si aplica"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 5
}

10.2 Detalle de rendición + adjuntos

GET /spaces/{space_id}/accounting/claims/{claim_id}

200 OK
{
  "claim_id": "ren_999",
  "period": "2026-01",
  "status": "borrador",
  "observations": null,
  "attachments": [
    {
      "attachment_id": "att_001",
      "filename": "comprobante.pdf",
      "status": "cargado|invalidado|validado",
      "reason": null
    }
  ]
}

10.3 Subir comprobante

POST /spaces/{space_id}/accounting/claims/{claim_id}/attachments

Request: multipart/form-data con file

Reglas (placeholder):

Máximo: 10MB

Tipos: pdf/jpg/png

Máximo 20 por rendición

201 Created
{ "attachment_id": "att_999", "status": "cargado" }

400 Bad Request (ejemplo tamaño)
{
  "error": {
    "code": "file_too_large",
    "message": "El archivo supera el tamaño máximo permitido (10MB)."
  }
}

10.4 Presentar rendición

POST /spaces/{space_id}/accounting/claims/{claim_id}/submit

Regla MVP: solo referente + requiere ≥ 1 comprobante.

200 OK
{ "claim_id": "ren_999", "status": "presentada" }

400 Bad Request (sin comprobantes)
{
  "error": {
    "code": "missing_attachments",
    "message": "Para presentar la rendición debés adjuntar al menos 1 comprobante."
  }
}

403 Forbidden (sin permiso)
{
  "error": {
    "code": "forbidden",
    "message": "No tenés permiso para presentar rendiciones."
  }
}

11) Auditoría (mínimo interno)

!!! info "Nota"
La app no necesita leer auditoría.
La API debe registrar eventos mínimos definidos en 02_roles_y_accesos/auditoria-trazabilidad.md.

Eventos sugeridos (placeholder):

login_success, login_failed

view_profile, view_documents, download_document

view_messages, read_message

person_create, person_update, person_deactivate

claim_attachment_upload, claim_submit

12) Pendientes para cerrar tras reunión SISOC

Mecanismo de auth (JWT/session) y endpoint de login/refresh si aplica.

Nombres reales de entidades y claves (space_id/person_id, etc.).

Confirmación si nómina/rendiciones/mensajes/documentos ya existen o se crean.

Storage de archivos (ruta, URL firmada, expiración).

Mapeo de estados reales a catálogos definidos en 04_datos/estados-y-reglas.md.

```