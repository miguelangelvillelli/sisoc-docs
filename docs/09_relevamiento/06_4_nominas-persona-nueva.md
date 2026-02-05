# 06_4) Persona — Nueva (alta rápida)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-05  
    **Responsable:** UX + Analistas + Dev  
    **Nivel:** Interno

## Objetivo
Crear una persona con datos mínimos desde el teléfono.

## UI (según mock)
Secciones:
- Header: “Nueva Persona” + back.
- Card “Datos Personales”
  - Nombre * (input)
  - Apellido * (input)
  - Tipo de documento (select, opcional)
  - Número (input, opcional)
  - Fecha de nacimiento (date, opcional)
- Card “Participación en Programas”
  - Checkbox: Participa en Prestación Alimentaria
  - Checkbox: Participa en Formación
- CTA: “Crear Persona”
- Nota: “Los campos marcados con * son obligatorios”

## Validaciones
- Nombre y Apellido obligatorios.
- Documento opcional (a confirmar con SISOC).
- Si se informa documento, validar duplicados (si aplica).

## Estados
- Éxito: redirige a Detalle (06_2) de la persona creada.
- Error 400: mostrar mensajes por campo.
- Error 409: “Ya existe una persona con ese documento.”

## Endpoints (placeholder)
- POST `/api/mobile/nomina`

## Eventos (auditoría)
- `nomina_person_create`
