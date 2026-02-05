# 04.1 · Documentos (lista)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Analista Funcional  
    **Nivel:** Interno (relevamiento)

## Objetivo
Permitir al espacio **ver el listado de documentos** vigentes asociados (convenios, reglamentos, manuales) y acceder a su detalle/descarga.

## Ubicación en el flujo
Desde `04 · Información institucional (Perfil del espacio)` → botón **Documentos**.

## Pantalla / UI (según mock)
### Encabezado
- Flecha “volver” (vuelve a Perfil del espacio)
- Título: **Documentos**

### Lista de documentos
Cada ítem muestra:
- Ícono de documento
- **Título**
- **Fecha** (publicación/actualización)
- Badge **“PDF”** (o tipo)
- Acción rápida: ícono **descargar** (si se habilita descarga directa)

## Acciones del usuario
- Tocar un documento → navega a `04.1.1 · Documento (detalle)`
- (Opcional) tocar ícono descargar desde la lista

## Reglas de negocio
- Solo lectura.
- Mostrar solo documentos **habilitados para ese espacio**.
- Orden sugerido: más reciente primero (a confirmar).
- Descarga directa desde lista: **opcional** (definir política).

## Estados de pantalla
- **Cargando:** skeleton/list loader
- **Vacío:** “No hay documentos disponibles”
- **Sin permiso (403):** mensaje + volver
- **Error red/servidor:** mensaje + reintentar

## Datos requeridos (conceptual)
**Document**
- id
- titulo
- fecha_publicacion/actualizacion
- tipo (pdf/link)
- url (si corresponde)
- permite_descarga (bool, opcional)

## Endpoints (placeholder)
- `GET /api/app/spaces/{space_id}/documents`
  - Lista de documentos visibles.

## Auditoría / trazabilidad
- `institucional_view_documents`
- `document_download` (si descarga desde lista) (document_id)

## Criterios de aceptación
- Cuando el usuario entra a Documentos, ve una lista con título + fecha.
- Cuando toca un ítem, navega al detalle del documento.
- Si no hay documentos, ve un estado vacío claro.

## Referencias
- `docs/09_relevamiento/04_info-institucional.md`
- `docs/09_relevamiento/04_1_1_documento-detalle.md`
