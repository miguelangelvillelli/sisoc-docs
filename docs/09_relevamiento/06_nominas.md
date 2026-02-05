# 06) Nóminas (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Analistas + Dev  
    **Nivel:** Interno

## Objetivo
Permitir que el espacio gestione su **nómina de personas** (altas, edición, activación/desactivación) y marque participación en programas (Prestación Alimentaria / Formación).

## Pantallas incluidas
- [06_1 Nómina — Lista](06_1_nominas-lista.md)
- [06_2 Persona — Detalle](06_2_nominas-persona-detalle.md)
- [06_3 Persona — Editar](06_3_nominas-persona-editar.md)
- [06_4 Persona — Nueva](06_4_nominas-persona-nueva.md)

## Alcance MVP
Incluye:
- Buscar por nombre o documento.
- Filtrar por estado: Todas / Activas / Inactivas.
- Ver detalle de persona.
- Crear persona (alta rápida).
- Editar persona.
- Activar / Desactivar persona.
- Marcar participación en programas (checkboxes).

Fuera de alcance (Release 2):
- Importación CSV desde móvil.
- Dedupe avanzado / matching inteligente (DNI, similares, etc.).
- Historial de cambios por persona detallado (auditoría fina en UI).
- Adjuntos por persona.

## Roles y permisos (RBAC)
- Referente del espacio: Ver / Crear / Editar / Activar-Desactivar
- Usuario interno del espacio: Ver / Crear / Editar (Activar-Desactivar según definición)
- Operador territorial: Ver (según jurisdicción/asignación)
- Administrador central: Ver / Administrar

## Reglas funcionales
- Los campos obligatorios se validan en servidor.
- Activar/Desactivar requiere confirmación.
- Participación en programas se guarda como flags (o relación) según modelo SISOC.

## Eventos mínimos (auditoría)
- `nomina_list_view`
- `nomina_person_view` (persona_id)
- `nomina_person_create`
- `nomina_person_update` (persona_id)
- `nomina_person_toggle_active` (persona_id, nuevo_estado)

## Pendientes para cerrar con SISOC
- ¿Existe ya la entidad “persona asistida” vinculada al espacio?
- ¿DNI es obligatorio o opcional?
- ¿Fecha de nacimiento existe hoy o es nuevo campo?
- ¿Participación en programas es un flag o una relación con “programa/actividad”?
