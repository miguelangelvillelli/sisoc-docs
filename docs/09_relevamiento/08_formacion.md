# 08 · Formación (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Territorio + Técnica  
    **Nivel:** Interno

## Objetivo del módulo
Brindar al espacio comunitario una vista simple de las **actividades de formación** asociadas al espacio (talleres, cursos, apoyos, etc.), con su **estado** y datos básicos para operación.

## Alcance MVP
Entra en MVP (v0):
- Visualizar **listado de actividades** con:
  - título
  - breve descripción (si existe)
  - fecha
  - cantidad de participantes (si existe)
  - estado (Planificada / En curso / Finalizada)

Fuera de alcance (Release 2):
- Crear actividad desde la app.
- Editar actividad.
- Gestión de participantes (agregar/quitar).
- Estados avanzados (cancelada, reprogramada, cupos, asistencia).
- Notificaciones automáticas por actividad.

## Usuarios y permisos (RBAC)
- **Referente del espacio**: Ver
- **Usuario interno del espacio**: Ver
- **Operador territorial / Técnico**: Ver (según jurisdicción/asignación)
- **Administrador central**: Ver/Administrar (si existe backoffice SISOC)

## Datos a definir con Territorio (checklist)
- ¿Qué “actividades” entran acá? (solo formación / también actividades comunitarias)
- ¿De dónde sale la “cantidad de participantes”? (nómina + vínculo / conteo manual / SISOC)
- ¿El estado de actividad se gestiona en SISOC o se calcula por fecha?

---

## Pantalla única (MVP v0): Lista de actividades

### Objetivo de la pantalla
Mostrar las actividades ordenadas y permitir identificar rápidamente su estado.

### Componentes (según mockup)
- AppBar con botón “volver” + título “Formación”.
- Contador arriba: “X actividades”.
- Lista de cards de actividad:
  - Icono de actividad (libro)
  - Título (ej. “Taller de Cocina Saludable”)
  - Descripción corta (opcional)
  - Metadatos:
    - fecha (dd/mm/aaaa)
    - participantes (N participantes) (opcional)
  - Badge de estado:
    - Planificada
    - En curso
    - Finalizada
- FAB “+” (presente en el diseño)
  - **Nota:** en MVP v0 se recomienda:
    - ocultarlo si no se habilita creación, o
    - mantenerlo pero deshabilitado con tooltip/mensaje “Disponible en una próxima versión”.

### Ordenamiento
- Por defecto: más próxima/reciente primero (a confirmar).
  - alternativa: Planificadas arriba, En curso al medio, Finalizadas al final.

### Estados UI
- **Loading**: skeleton list.
- **Vacío**: “No hay actividades cargadas”.
- **Error**: “No pudimos cargar las actividades. Reintentá.”

### Reglas UI mínimas
- Si no hay descripción: ocultar línea de descripción.
- Si no hay participantes: ocultar metadato “N participantes”.
- Badge de estado se mapea desde catálogo SISOC (a confirmar).

### API / Datos (a confirmar)
- `GET /spaces/{space_id}/training/activities?order=...` → lista:
  - `{ activity_id, title, description?, date?, participants_count?, status }`

### Auditoría y trazabilidad (eventos mínimos)
- `training_view_list`
- `training_click_add` (si existe acción)

### Criterios de aceptación (BDD)

**Escenario: ver listado**
- Dado un usuario con permiso de ver formación  
- Cuando ingresa al módulo “Formación”  
- Entonces visualiza el listado de actividades con su estado

**Escenario: sin actividades**
- Dado que no existen actividades asociadas al espacio  
- Cuando ingresa al módulo  
- Entonces visualiza el mensaje “No hay actividades cargadas”
