# Rendiciones y comprobantes (MVP)

!!! info "Estado"
    **Versión:** v0.1  
    **Última actualización:** 2026-02-03  
    **Responsable:** Equipo SISOC  
    **Nivel:** Interno

## Objetivo del módulo
Permitir que el espacio comunitario gestione la **rendición** de fondos/documentación asociada de forma simple desde el teléfono:
- crear rendiciones,
- adjuntar comprobantes,
- presentar rendición,
- recibir observaciones y corregir,
manteniendo trazabilidad y reglas mínimas de validación.

## Alcance MVP
Entra en MVP:
- Crear rendición (borrador)
- Adjuntar comprobantes (uno o muchos)
- Presentar rendición
- Ver estado y observaciones
- Responder observaciones (corregir adjuntos / agregar documentación)
- Historial de rendiciones por período

Fuera de alcance (Release 2):
- Automatizaciones contables avanzadas (conciliación, categorización inteligente)
- Integraciones con sistemas externos
- Flujos multi-etapa complejos (aprobaciones múltiples por niveles)

## Roles y permisos (RBAC)
- **Referente del espacio**: Crear / Adjuntar / Presentar / Ver
- **Usuario interno del espacio**: Crear / Adjuntar (delegado) / Ver
- **Operador territorial / Técnico**: Ver / Observar
- **Administrador central**: Ver / Aprobar / Rechazar / Administrar
- **Usuario de organización (propuesto)**: Ver

!!! warning "Regla"
    En MVP, la acción **Presentar** se reserva al **Referente**.
    El usuario interno puede colaborar cargando adjuntos si se le delega.

## Estados (vinculado a “Estados y reglas”)
- `borrador`
- `presentada`
- `observada`
- `aprobada`
- `rechazada`

## Modelo mínimo (conceptual)
- **Rendición**
  - período (mes/año o rango)
  - estado
  - fecha_creación / fecha_presentación
  - observaciones (mensaje institucional)
- **Comprobante**
  - archivo (url/identificador)
  - tipo (opcional en MVP)
  - estado (`cargado` / `invalidado` / `validado`)
  - motivo_invalidación (si aplica)

## Reglas de negocio (MVP)

### Reglas generales
- Una rendición comienza en `borrador`.
- Solo puede pasar a `presentada` si cumple **mínimos de adjuntos** (definir regla institucional).
- Si el Programa marca `observada`, debe existir **observación/motivo** claro.
- El espacio puede volver a editar/adjuntar cuando está `observada` (y re-presentar).

### Adjuntos y validaciones
- Tipos de archivo permitidos (MVP): **PDF, JPG, PNG**
- Tamaño máximo por archivo: **10MB**
- Cantidad máxima de archivos por rendición: **20**
- Se recomienda comprimir/optimizar imágenes desde la app (si se implementa).

!!! info "Validación MVP"
    En MVP se valida **formato/tamaño** y se permite adjuntar.
    La validación de “contenido correcto” (factura/recibo) es institucional (operador/admin).


### Presentación
- Acción **Presentar**:
  - solo referente
  - requiere **al menos 1 comprobante adjunto**
  - cambia estado a `presentada`
  - bloquea edición de datos base (pero no impide visualización)
- Cuando está `presentada`, el espacio puede **ver** pero no modificar hasta que vuelva `observada`.

### Observaciones (correcciones)
- Si estado = `observada`:
  - el espacio ve observación clara (“falta X”, “archivo ilegible”, “reemplazar comprobante Y”)
  - el espacio puede agregar/reemplazar archivos
  - el referente puede **re-presentar** (vuelve a `presentada`)

### Rechazo
- Si estado = `rechazada`:
  - se muestra motivo
  - no se permite re-presentar salvo decisión institucional (Release 2 o circuito específico)

## Flujos y pantallas (wireflow)

### 1) Listado de rendiciones
- tarjetas por período: estado + mensaje breve
- CTA: “Nueva rendición” (referente y/o usuario interno)
- filtros: por estado

### 2) Crear rendición (borrador)
- seleccionar período (mes/año)
- campo “nota del espacio” (opcional)
- guardar → estado `borrador`

### 3) Detalle de rendición
- estado actual + observación (si existe)
- lista de comprobantes adjuntos
- acciones:
  - “Adjuntar comprobante” (si `borrador` u `observada`)
  - “Presentar rendición” (solo referente, si `borrador` u `observada` y cumple mínimos)
  - “Volver” (siempre)

### 4) Adjuntar comprobante
- seleccionar archivo / sacar foto
- validación de tamaño/tipo
- carga → estado del comprobante `cargado`
- si falla, error claro (“archivo demasiado grande”, “formato no permitido”)

### 5) Vista de observación
- bloque destacado con “Qué falta / Qué corregir”
- lista de comprobantes con marca de inválido (si aplica) + motivo

## Auditoría y trazabilidad (eventos mínimos)
- `rendicion_create` (usuario, espacio, período)
- `rendicion_update` (si se editan datos base)
- `comprobante_upload` (usuario, espacio, rendición, archivo_id)
- `comprobante_invalidated` (actor institucional, motivo) *(interno)*
- `rendicion_submit` (referente, espacio, rendición)
- `rendicion_observed` (actor institucional, motivo) *(interno)*
- `rendicion_approved` (actor institucional) *(interno)*
- `rendicion_rejected` (actor institucional, motivo) *(interno)*

## Criterios de aceptación (BDD)

**Escenario: crear borrador**
- Dado un referente o usuario interno con permisos
- Cuando crea una rendición para un período y guarda
- Entonces la rendición queda en estado `borrador` y se registra `rendicion_create`

**Escenario: adjuntar comprobante válido**
- Dado una rendición en `borrador`
- Cuando subo un PDF/JPG/PNG dentro del tamaño permitido
- Entonces el comprobante se registra como `cargado` y se registra `comprobante_upload`

**Escenario: adjuntar comprobante inválido por tamaño**
- Dado una rendición en `borrador`
- Cuando subo un archivo que supera el tamaño permitido
- Entonces el sistema rechaza la carga y muestra un mensaje claro

**Escenario: presentar rendición**
- Dado un referente y una rendición en `borrador` con adjuntos mínimos
- Cuando presiona “Presentar”
- Entonces el estado pasa a `presentada` y se registra `rendicion_submit`

**Escenario: rendición observada y corrección**
- Dado una rendición en `observada` con observaciones
- Cuando el espacio reemplaza/adjunta comprobantes y el referente re-presenta
- Entonces el estado vuelve a `presentada` y queda auditado

## Notificaciones (opcional MVP)
- “Tenés una rendición observada”
- “Tu rendición fue aprobada”
- “Falta presentar rendición del período X” (recordatorio configurable)

## Pendientes (para cerrar en v0.2)
- Definir si hay categorías/tipos de comprobantes (opcional).
- Definir si el usuario interno puede crear rendición o solo adjuntar (decisión operativa).
