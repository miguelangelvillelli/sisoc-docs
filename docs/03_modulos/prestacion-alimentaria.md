# Prestación alimentaria (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** Equipo SISOC  
    **Nivel:** Interno

## Objetivo del módulo
Permitir que el espacio comunitario **visualice** información relevante de su relación con la prestación alimentaria asociada al Programa, de forma clara, mobile-first y con trazabilidad.

## Alcance MVP (Opción A — Solo visualización)
En el MVP el espacio:
- **No carga** ni “declara” prestaciones.
- **Visualiza** información validada/provista por los equipos del Programa (operadores/administración).
- **Recibe alertas** y recordatorios (si se implementa canal notificaciones en MVP).

> Regla: cualquier necesidad de carga o declaración por parte del espacio queda para evolución posterior (Release 2).

## Qué información se visualiza (v0)
- **Estado**: vigente / en revisión / suspendida / sin datos (definir catálogo final en “Estados y reglas”).
- **Período**: mes/período de referencia.
- **Resumen**: datos básicos de acreditación/ejecución *si corresponde* (sin detalles sensibles).
- **Observaciones**: mensajes operativos (por ejemplo: “pendiente documentación”, “contactar técnico territorial”).
- **Historial**: últimos N períodos (configurable).
- **Alertas**:
  - alertas operativas del Programa (ej.: vencimientos, rendición pendiente, documentación incompleta)
  - alertas de vulnerabilidad *solo si corresponde mostrar al espacio* (si no, se ocultan y quedan internas).

!!! warning "Cuidado de comunicación"
    Evitar exponer información sensible o que pueda interpretarse como “aprobación automática”.  
    El módulo muestra **estado y mensajes operativos**, no reemplaza la validación institucional.

## Pantallas (wireflow sugerido)
- **Listado / Resumen**
  - tarjeta con estado + período + mensaje breve
  - botón “Ver detalle”
- **Detalle de período**
  - estado, período, resumen, observaciones
  - historial (últimos períodos)
  - “Contactar soporte” (acción simple; por ejemplo, canal definido)
- **Sin datos**
  - mensaje claro: “Aún no hay información disponible para este período”
  - CTA: “Contactar técnico” / “Ver requisitos” (según decisión)

## Roles y permisos (RBAC)
- **Referente del espacio**: ver
- **Usuario interno del espacio**: ver (si el referente lo habilita)
- **Operador territorial / Técnico**: ver + cargar/editar datos internos del Programa (fuera del alcance del módulo móvil del espacio)
- **Administrador central**: ver/administrar (fuera del alcance del módulo móvil del espacio)
- **Usuario de organización (propuesto)**: ver (agregando selector de espacio)

> Nota: en MVP la app del espacio solo contempla “ver”. Las acciones internas del Programa pueden existir en backoffice.

## Auditoría y trazabilidad (eventos mínimos)
Registrar como mínimo:
- `prestacion_view_list` (usuario, espacio, timestamp)
- `prestacion_view_detail` (usuario, espacio, período, timestamp)
- `prestacion_support_contact` (si existe botón de contacto)

## Reglas de negocio (v0)
- Si el estado es “en revisión” o “observada”, el detalle debe incluir un **mensaje operativo claro**.
- Si no hay datos del período, se muestra estado “sin datos” con texto explicativo.
- El historial solo muestra períodos dentro de una ventana definida (ej.: últimos 6 o 12).
- Las alertas se muestran según regla de visibilidad (internas vs visibles al espacio).

## Criterios de aceptación (BDD)
**Escenario: ver resumen**
- Dado un usuario del espacio con permisos
- Cuando ingresa al módulo “Prestación alimentaria”
- Entonces ve el estado y el período actual (o “sin datos” si no hay)

**Escenario: ver detalle**
- Dado que existe información del período
- Cuando el usuario abre el detalle
- Entonces visualiza estado, período, resumen y observaciones

**Escenario: sin datos**
- Dado que no existe información del período
- Cuando el usuario abre el módulo
- Entonces visualiza un mensaje “sin datos” y una acción de orientación (contacto o requisitos)

## Evolución (Release 2) — ALERTA
!!! danger "Evolución posible: carga mínima por el espacio"
    Si se decide que el espacio registre información (ej. confirmaciones, cantidades o evidencias),
    se debe abrir un ADR específico y revisar:
    - RBAC (quién puede cargar y aprobar)
    - Auditoría (eventos de creación/edición)
    - Validaciones y estados
    - UX (evitar carga pesada y errores)
    - Riesgos de integridad / fraude / duplicación
