# 04.1.1 · Documento (detalle)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Analista Funcional  
    **Nivel:** Interno (relevamiento)

## Objetivo
Permitir **ver metadatos del documento** y realizar acciones como **descargar** y (si aplica) **compartir**.

## Ubicación en el flujo
Desde `04.1 · Documentos (lista)` → tocar un documento.

## Pantalla / UI (según mock)
### Encabezado
- Flecha “volver” (vuelve a Documentos lista)
- Título: **Documento**

### Card del documento
Muestra:
- Ícono + **Título**
- **Fecha**
- Badge “PDF” (o tipo)

### Área de vista previa
- Mensaje: “Vista previa no disponible. Descargá el archivo para verlo.”

### Acciones
- Botón primario: **Descargar**
- Botón secundario: **Compartir** (opcional; depende de plataforma/política)

## Acciones del usuario
- Descargar documento
- Compartir (si está habilitado)
- Volver

## Reglas de negocio
- En MVP puede no existir vista previa embebida: se descarga y se abre con visor del dispositivo.
- Definir política: ¿siempre descarga? ¿solo visualizar? (si el doc es link, podría abrir navegador).
- Compartir: opcional y sujeto a política de confidencialidad.

## Estados de pantalla
- **Cargando:** skeleton de card
- **No encontrado (404):** “Documento no disponible”
- **Sin permiso (403):** “No tenés permisos…”
- **Error red/servidor:** reintentar

## Datos requeridos (conceptual)
**Document**
- id
- titulo
- fecha
- tipo (pdf/link)
- url/archivo
- permite_descarga
- permite_compartir (opcional)

## Endpoints (placeholder)
- `GET /api/app/documents/{document_id}`
- Descarga: URL firmada o endpoint tipo `GET /api/app/documents/{id}/download`

## Auditoría / trazabilidad
- `institucional_view_document` (document_id)
- `document_download` (document_id)
- `document_share` (document_id) (si aplica)

## Criterios de aceptación
- El usuario ve título y fecha del documento.
- Puede descargar (si está permitido).
- Si la vista previa no está disponible, el sistema lo comunica claramente.

## Referencias
- `docs/09_relevamiento/04_1_documentos-lista.md`
