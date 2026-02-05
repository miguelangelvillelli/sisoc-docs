# 08.1 · Formación — Lista de actividades (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Territorio + Técnica  
    **Nivel:** Interno

## Objetivo de la pantalla
Permitir que el espacio vea, en formato simple y mobile, el listado de actividades de formación asociadas al espacio, con su **estado** y datos básicos.

## Navegación
**Entrada**
- Desde **Home (Hub)** → “Formación”

**Salida**
- Volver → Home (Hub)

## Componentes UI (según mockup)
- AppBar:
  - Flecha “volver”
  - Título: “Formación”
- Texto de contexto:
  - “X actividades”
- Lista de tarjetas (cards) de actividad:
  - Icono (libro)
  - Título (obligatorio)
  - Descripción breve (opcional)
  - Metadatos (según disponibilidad):
    - Fecha (dd/mm/aaaa)
    - “N participantes”
  - Badge de estado:
    - Planificada
    - En curso
    - Finalizada
- FAB “+” (abajo a la derecha)
  - **MVP v0:** oculto o deshabilitado (definir)
  - Si se mantiene visible y deshabilitado: mostrar mensaje “Disponible en una próxima versión”.

## Reglas y comportamiento
- Orden por defecto (a confirmar con Territorio):
  - Opción A: por fecha (más próxima/reciente primero)
  - Opción B: por estado (Planificadas → En curso → Finalizadas)
- Si `description` no existe: ocultar línea de descripción.
- Si `participants_count` no existe: ocultar “N participantes”.
- Estados visuales:
  - `loading`: skeleton cards
  - `empty`: “No hay actividades cargadas”
  - `error`: “No pudimos cargar las actividades. Reintentá.”

## Datos requeridos (contract mínimo)
Campos por actividad:
- `activity_id` (string/int)
- `title` (string)
- `description` (string, opcional)
- `date` (date, opcional según definición)
- `participants_count` (int, opcional)
- `status` (enum)

### Catálogo de estados (MVP)
- `planned` → Planificada
- `in_progress` → En curso
- `finished` → Finalizada

> Nota: mapear con estados reales de SISOC.

## API (a confirmar)
- `GET /spaces/{space_id}/training/activities`

Respuesta (ejemplo):
```json
[
  {
    "activity_id": 101,
    "title": "Taller de Cocina Saludable",
    "description": "Aprendemos a preparar comidas nutritivas con bajo presupuesto",
    "date": "2026-02-14",
    "participants_count": 12,
    "status": "planned"
  }
]
