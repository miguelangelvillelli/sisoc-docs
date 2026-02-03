# Actividades de formación (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** Equipo SISOC  
    **Nivel:** Interno

## Objetivo del módulo
Permitir que el espacio comunitario gestione **actividades de formación** de manera simple desde el teléfono:
- crear y administrar actividades,
- registrar participantes desde la Nómina,
- visualizar historial y estado,
manteniendo trazabilidad y consistencia con el resto del MVP.

## Alcance MVP
Entra en MVP:
- Crear actividad (planificada)
- Editar datos básicos antes de finalizar
- Marcar estado: planificada / finalizada / cancelada
- Asociar participantes desde Nómina
- Ver listado y detalle
- Ver historial por período

Fuera de alcance (Release 2):
- Gestión avanzada de cupos, asistencia por sesión y evaluaciones
- Certificados automáticos
- Calendario avanzado con sincronización externa
- Reportes analíticos complejos

## Roles y permisos (RBAC)
- **Referente del espacio**: Ver / Crear / Editar
- **Usuario interno del espacio**: Ver / Crear / Editar (delegado)
- **Operador territorial / Técnico**: Ver / Validar (según proceso institucional)
- **Administrador central**: Ver / Administrar
- **Usuario de organización (propuesto)**: Ver

## Estados (según “Estados y reglas”)
- `planificada`
- `en_curso` *(opcional en MVP si se decide por fecha/hora; puede omitirse y usar planificada/finalizada)*
- `finalizada`
- `cancelada`

!!! info "Decisión MVP sugerida"
    Para simplificar, en MVP se puede operar con **planificada / finalizada / cancelada**.
    `en_curso` queda disponible si se necesita en una iteración posterior.

## Datos mínimos de una actividad (MVP)
- **Título** (obligatorio)
- **Descripción** (opcional)
- **Tipo / Categoría** (opcional en MVP)
- **Fecha** (obligatoria)
- **Horario** (opcional)
- **Lugar** (por defecto el espacio; opcional si es externo)
- **Responsable** (texto libre u operador interno; opcional)
- **Estado** (planificada/finalizada/cancelada)
- **Participantes** (lista de personas desde Nómina)

## Reglas de negocio (MVP)
- No se permite crear actividad sin **título** y **fecha**.
- Una actividad `finalizada`:
  - se puede visualizar siempre,
  - no se edita salvo campos administrativos (si se decide; por defecto no editar).
- Una actividad `cancelada`:
  - se conserva por trazabilidad (no se elimina).
- Participantes:
  - solo pueden ser personas existentes en **Nómina del espacio**
  - una persona `inactiva` no debería poder agregarse como participante (o se advierte).

## Flujos y pantallas (wireflow)

### 1) Listado de actividades
- Tarjetas por actividad: título + fecha + estado
- Filtros: planificadas / finalizadas / canceladas
- CTA: “Nueva actividad”

### 2) Crear / Editar actividad
- Formulario mobile-first:
  - título, fecha, descripción (opcional)
  - estado (por defecto `planificada`)
- Guardar

### 3) Gestión de participantes
- Desde el detalle: “Agregar participantes”
- Selector/buscador sobre Nómina
- Lista de participantes confirmados
- Opción de quitar participante

### 4) Detalle de actividad
- Datos básicos + estado
- Participantes (lista)
- Acciones:
  - editar (si `planificada`)
  - finalizar
  - cancelar

## Auditoría y trazabilidad (eventos mínimos)
- `formacion_view_list`
- `actividad_create`
- `actividad_update`
- `actividad_status_change` (planificada→finalizada / planificada→cancelada)
- `actividad_add_participant`
- `actividad_remove_participant`

## Criterios de aceptación (BDD)

**Escenario: crear actividad mínima**
- Dado un usuario con permiso de crear
- Cuando ingresa título y fecha y guarda
- Entonces se crea una actividad en estado `planificada` y se registra `actividad_create`

**Escenario: editar actividad planificada**
- Dado una actividad en estado `planificada`
- Cuando el usuario edita descripción y guarda
- Entonces se actualiza y se registra `actividad_update`

**Escenario: finalizar actividad**
- Dado una actividad `planificada`
- Cuando el usuario marca “Finalizar”
- Entonces el estado pasa a `finalizada` y se registra `actividad_status_change`

**Escenario: cancelar actividad**
- Dado una actividad `planificada`
- Cuando el usuario marca “Cancelar”
- Entonces el estado pasa a `cancelada` y se registra `actividad_status_change`

**Escenario: agregar participante desde nómina**
- Dado una actividad existente
- Cuando el usuario agrega una persona activa desde Nómina
- Entonces queda asociada a la actividad y se registra `actividad_add_participant`

**Escenario: no permitir participante inexistente**
- Dado el módulo de participantes
- Cuando intento agregar una persona que no pertenece al espacio
- Entonces el sistema bloquea la acción (control servidor) y muestra mensaje claro

## Notificaciones (opcional MVP)
- Recordatorio de actividad planificada (día anterior o misma mañana)
- Notificación a operador si se requiere validación (si aplica)

## Pendientes (para cerrar en v0.2)
- Definir si se mantiene estado `en_curso` o no.
- Definir si “actividad finalizada” es editable (por defecto, no).
- Definir si hay categorías/tipos obligatorios según lineamientos del Programa.
