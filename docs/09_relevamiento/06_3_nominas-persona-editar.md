# 06_3) Persona — Editar

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Analistas + Dev  
    **Nivel:** Interno

## Objetivo
Editar datos personales y flags de participación en programas.

## UI (según mock)
Secciones:
- Header: “Editar Persona” + back.
- Card “Datos Personales”
  - Nombre * (input)
  - Apellido * (input)
  - Tipo de documento (select)
  - Número (input)
  - Fecha de nacimiento (date)
- Card “Participación en Programas”
  - Checkbox: Participa en Prestación Alimentaria
  - Checkbox: Participa en Formación
- CTA: “Guardar Cambios”

## Validaciones
- Nombre y Apellido obligatorios.
- Documento:
  - Si se informa número, tipo debe estar seleccionado (y viceversa).
  - Formato numérico si es DNI (definir reglas exactas).
- Fecha de nacimiento:
  - opcional (definir)
  - validar rango razonable si aplica.

## Errores
- 400: mostrar validación campo a campo.
- 409 (si dedupe): “Ya existe una persona con ese documento.”
- Problemas de red: “No pudimos conectarnos. Reintentá.”

## Reglas
- Guardado solo si hubo cambios (opcional).
- Al guardar, vuelve a Detalle (06_2) refrescado.

## Endpoints (placeholder)
- PUT/PATCH `/api/mobile/nomina/{persona_id}`

## Eventos (auditoría)
- `nomina_person_update` (persona_id)
