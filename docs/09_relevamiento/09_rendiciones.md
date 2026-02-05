# 09 · Rendiciones (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** Equipo SISOC (UX + Funcional + Tech)  
    **Nivel:** Interno

## Objetivo del módulo
Permitir al espacio comunitario **ver el estado de sus rendiciones por período**, consultar **observaciones** y **gestionar comprobantes** (adjuntar y presentar) según permisos.

## Alcance MVP
Incluye:
- Listado de rendiciones por período con estado y alertas.
- Detalle de rendición (estado, observaciones, comprobantes).
- Adjuntar comprobantes (subida de archivo).
- Presentar rendición (confirmación y bloqueo).

No incluye (Release 2):
- Validación automática de montos/duplicados avanzada.
- OCR / extracción de datos de comprobantes.
- Flujos complejos de corrección con múltiples idas y vueltas.
- Integración con proveedores/pagos en línea.

## Roles y permisos (RBAC)
- **Referente del espacio**: Ver + Adjuntar + Presentar (según reglas).
- **Usuario interno del espacio**: Ver + Adjuntar (presentar opcional según política).
- **Operador territorial / Técnico**: Ver (según asignación/jurisdicción).
- **Administrador central**: Ver/Administrar (carga/edición de estados, observaciones).

## Estados (catálogo inicial)
- Rendición: `borrador` | `presentada` | `observada` | `aprobada` | `rechazada`
- Comprobante: `cargado` | `validado` | `invalidado`

## Reglas funcionales mínimas
- No se puede **presentar** si no hay comprobantes (mínimo 1) o si faltan obligatorios (si aplica).
- Al **presentar**, la rendición queda **bloqueada** para edición (salvo reapertura por admin).
- Si estado = `observada`, se muestra **observación/resumen** en lista y detalle.
- La app móvil **no** accede a BD: solo consume API.

## Notificaciones (opcional MVP)
- “Rendición observada”
- “Rendición aprobada / rechazada”
- “Faltan comprobantes” (si se define regla)

## Eventos de auditoría (mínimos)
- `claims_view_list`
- `claim_view_detail` (claim_id)
- `claim_upload_receipt` (claim_id, receipt_id)
- `claim_submit` (claim_id)

## Pantallas (referencia)
- **09_1** Lista rendiciones
- **09_2** Detalle rendición
- **09_3** Adjuntar comprobante
- **09_4** Presentar rendición (confirmación)
