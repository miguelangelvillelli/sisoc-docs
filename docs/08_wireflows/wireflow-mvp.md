# Wireflow MVP (end-to-end)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** UI_UX  
    **Nivel:** Interno

## Flujo general (navegación)

```mermaid
flowchart TD
  A["Inicio app"] --> B{"Autenticado?"}
  B -- "No" --> L["Login / Acceso"]
  B -- "Si" --> C{"Espacios?"}

  C -- "Uno" --> H["Home (Hub)"]
  C -- "Varios" --> S["Selector de espacio"]
  S --> H

  H --> I["Informacion institucional"]
  H --> N["Nomina"]
  H --> P["Prestacion alimentaria"]
  H --> F["Formacion"]
  H --> R["Rendiciones"]
  H --> M["Mensajes"]

  I --> I1["Perfil del espacio"]
  I --> I2["Documentos"]
  I2 --> I2a["Detalle / Descargar"]
  M --> M1["Detalle mensaje"]

  N --> N1["Lista + busqueda + filtros"]
  N1 --> N2["Detalle persona"]
  N2 --> N3["Editar"]
  N1 --> N4["Alta rapida"]
  N1 --> N5{"Import CSV habilitado?"}
  N5 -- "Si" --> N6["Importar CSV"]
  N5 -- "No" --> N7["Mensaje: solo web"]

  P --> P1["Estado periodo actual"]
  P1 --> P2["Historial por periodo"]
  P2 --> P3["Detalle periodo"]

  F --> F1["Lista actividades"]
  F1 --> F2["Crear / Editar"]
  F2 --> F3["Gestionar participantes"]
  F3 --> F3a["Agregar desde nomina"]
  F2 --> F4["Cerrar / Cancelar"]

  R --> R1["Lista rendiciones"]
  R1 --> R2["Detalle rendicion"]
  R2 --> R3["Adjuntar comprobante"]
  R2 --> R4{"Puede presentar?"}
  R4 -- "Si" --> R5["Presentar rendicion"]
  R4 -- "No" --> R6["Mensaje: falta permiso o faltan adjuntos"]
  R5 --> R7["Estado: presentada / observada / aprobada / rechazada"]
```