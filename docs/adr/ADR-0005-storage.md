# ADR-0005 · Storage y entrega de archivos (documentos y comprobantes)

!!! info "Estado"
    **ID:** ADR-0005  
    **Título:** Storage y entrega de archivos (documentos y comprobantes)  
    **Estado:** Propuesto  
    **Fecha:** 2026-02-03  
    **Responsable:** ARQ_Nav / DEV_Impl / SEC_Shield  
    **Nivel:** Interno

## Contexto
El MVP incluye:
- Documentos/convenios del espacio (solo lectura).
- Rendiciones con adjuntos (comprobantes) subidos desde móvil.

Debemos definir dónde se almacenan los archivos y cómo se entregan a la app:
- filesystem del servidor, storage tipo S3, o mecanismo ya existente en SISOC.
Además, hay requisitos de seguridad: acceso por rol, expiración de links, no exponer rutas internas.

**Drivers**
- Seguridad (links protegidos)
- Simplicidad (MVP)
- Reutilización SISOC
- Escalabilidad (volumen de adjuntos)

---

## Decisión
**Se decide (propuesto):** en MVP, mantener el storage **en el mecanismo existente de SISOC** si existe; de lo contrario:
- usar filesystem controlado por Django (MEDIA) con **URLs firmadas/temporales** o endpoint de descarga autenticado.

**Entrega de archivos a la app**
- La API devuelve `download_url` o un endpoint tipo:
  - `GET /spaces/{space_id}/documents/{document_id}/download`
  - `GET /spaces/{space_id}/accounting/attachments/{attachment_id}/download`
- La autorización se valida server-side (RBAC + pertenencia al space_id).
- Links (si se usan) expiran en X minutos.

---

## Alternativas consideradas

### Opción A — Endpoint de descarga autenticado (recomendada para MVP)
- **Pros:** control RBAC central; sin links públicos; simple.
- **Contras:** carga al servidor en descargas; requiere streaming.

### Opción B — URL firmada (S3 o CDN)
- **Pros:** performance; descarga directa.
- **Contras:** requiere storage compatible y firma; más setup.

### Opción C — URL pública (descartada)
- **Motivo:** riesgo de exposición de datos.

---

## Consecuencias

### Positivas
- Control fino de permisos por archivo.
- Evita filtrar estructura de storage.

### Negativas / costos
- Definir límites (tamaño/tipos/cantidad).
- Definir retención y limpieza de adjuntos.

### Impactos
- **UX:** “ver/descargar” + manejo de error 403/404.
- **Backend:** upload con validaciones; descarga con streaming; metadata.
- **Seguridad:** antivirus/escaneo (si aplica), content-type, rate limit.

---

## Criterios de éxito / validación
- Un usuario de un espacio no puede descargar archivos de otro espacio.
- Upload rechaza archivos fuera de tipo/tamaño.
- Descarga funciona en móvil sin exponer rutas internas.

---

## Pendientes (reunión viernes)
- ¿SISOC ya guarda archivos? ¿Dónde?
- ¿Hay S3/MinIO/Blob storage disponible?
- Límite real de tamaño y tipos aceptados.
- ¿Se requiere preview en app o solo descarga?

---

## Referencias
- Rendiciones: `docs/03_modulos/rendiciones.md`
- Contratos API: `docs/05_api/contratos-v0.md`
- Seguridad baseline: `docs/07_seguridad/baseline.md`
