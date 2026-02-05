# 06_1) Nómina — Lista (búsqueda + filtros)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Analistas + Dev  
    **Nivel:** Interno

## Objetivo
Permitir ver rápidamente la nómina del espacio, buscar personas y filtrar por estado.

## UI (según mock)
Elementos:
- Header con “Nómina” + back.
- Buscador: “Buscar por nombre o documento…”.
- Tabs filtro:
  - Todas
  - Activas
  - Inactivas
- Contador: “X personas”.
- Cards de persona con:
  - Nombre y apellido
  - Documento (si existe)
  - Chip estado: Activa / Inactiva
  - Chips de participación: Alimentación / Formación (si aplica)
- Botón flotante “+” (crear persona).

## Acciones
- Tap en card → abre **Detalle de Persona** (06_2).
- Tap en “+” → abre **Nueva Persona** (06_4).
- Cambiar filtro → refresca listado.
- Escribir en buscador → filtra (con debounce).

## Estados
- Cargando: skeleton/list placeholder.
- Vacío (según filtro):
  - Todas: “Todavía no cargaste personas.”
  - Activas: “No hay personas activas.”
  - Inactivas: “No hay personas inactivas.”
- Error: “No pudimos cargar la nómina. Reintentá.”

## Reglas
- Orden por defecto: alfabético (apellido/nombre) o más reciente (definir).
- El buscador debe soportar:
  - nombre parcial
  - documento parcial (si existe)
- Paginación si el volumen lo requiere.

## Datos mínimos por ítem
- persona_id
- nombre
- apellido
- tipo_doc (opcional)
- nro_doc (opcional)
- estado_activa (bool)
- participa_alimentacion (bool)
- participa_formacion (bool)

## Endpoints (placeholder)
- GET `/api/mobile/nomina?estado=all|active|inactive&q=...&page=...`

## Criterios de aceptación (rápidos)
- Dado un usuario con permisos, cuando abre Nómina, ve la lista y puede buscar.
- Cuando cambia el filtro, la lista se actualiza sin salir de la pantalla.
- Cuando toca una persona, navega al detalle correcto.
