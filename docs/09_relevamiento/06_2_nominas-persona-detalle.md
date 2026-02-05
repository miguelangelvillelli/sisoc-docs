# 06_2) Persona — Detalle

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Analistas + Dev  
    **Nivel:** Interno

## Objetivo
Ver información clave de una persona y permitir acciones: editar y activar/desactivar.

## UI (según mock)
Secciones:
- Header: “Detalle de Persona” + back.
- Card principal:
  - Nombre y apellido
  - Chip de estado: Activa / Inactiva
  - Documento (si existe)
  - Fecha de nacimiento (si existe)
- Sección “Participación en Programas”
  - Prestación Alimentaria: “Participa”
  - Formación: “Participa”
- Botones:
  - “Editar” (primario)
  - “Desactivar” (si está activa) / “Activar” (si está inactiva)

## Acciones
- Editar → abre 06_3 con datos precargados.
- Desactivar/Activar → confirma y ejecuta acción.

## Confirmaciones
- Desactivar: “¿Querés desactivar a esta persona?”
- Activar: “¿Querés reactivar a esta persona?”

## Estados / Errores
- 403: “No tenés permiso para realizar esta acción.”
- 404: “La persona no existe o no está asociada a tu espacio.”
- Error genérico: “No pudimos guardar el cambio. Reintentá.”

## Reglas
- Si la persona está inactiva, no debe aparecer en listados “Activas”.
- El estado de participación en programas se muestra como lectura (en esta pantalla).

## Endpoints (placeholder)
- GET `/api/mobile/nomina/{persona_id}`
- PATCH `/api/mobile/nomina/{persona_id}` (para toggle activo)

## Eventos (auditoría)
- `nomina_person_view` (persona_id)
- `nomina_person_toggle_active` (persona_id, nuevo_estado)
